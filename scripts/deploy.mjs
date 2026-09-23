/**
 * Deploy & Launch script for Teremu Website
 *
 * 1. Builds Firebase Cloud Functions (tsc)
 * 2. Runs `npm run generate` in www/ — nuxt.config sets
 *    nitro.output.publicDir → ../firebase/www, so the static build lands
 *    straight on the Hosting target. There is NO copy step.
 * 3. Deploys to Firebase from the repo root — that is where the one and only
 *    firebase.json lives, and it is the same config the CI workflow uses.
 *    Project id comes from the .firebaserc default.
 *
 * Usage:
 *   npm run deploy
 *   npm run deploy -- --only-hosting
 *   npm run deploy -- --skip-functions
 *   npm run deploy -- --dry-run
 */

import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const wwwDir = join(projectRoot, 'www');
const firebaseDir = join(projectRoot, 'firebase');
const functionsDir = join(firebaseDir, 'functions');
const hostingDir = join(firebaseDir, 'www');

const args = process.argv.slice(2);
const skipFunctions = args.includes('--skip-functions');
const hostingOnly = args.includes('--only-hosting');
const dryRun = args.includes('--dry-run');

function runCommand(command, cwd) {
  console.log(`   > (${cwd}) ${command}`);
  execSync(command, { cwd, stdio: 'inherit' });
}

async function main() {
  console.log('\n🚀 ============================================');
  console.log('   Teremu Website — Build & Firebase Deploy');
  console.log('============================================\n');

  // 1. Build Cloud Functions
  if (!skipFunctions && !hostingOnly && existsSync(functionsDir)) {
    console.log('📦 Step 1/3: Building Firebase Cloud Functions...');
    if (!dryRun) {
      runCommand('npm run build', functionsDir);
    } else {
      console.log('   → [DRY RUN] Would run `npm run build` in firebase/functions');
    }
  } else {
    console.log('⏭️  Step 1/3: Skipping Cloud Functions build.');
  }

  // 2. Generate Nuxt static site straight into firebase/www/
  console.log('\n⚡ Step 2/3: Generating Nuxt static site (npm run generate)...');
  if (!dryRun) {
    runCommand('npm run generate', wwwDir);

    if (!existsSync(hostingDir) || readdirSync(hostingDir).length === 0) {
      throw new Error(
        `Hosting output not found at: ${hostingDir}\n` +
        `Check that www/nuxt.config.ts still sets nitro.output.publicDir to '../firebase/www'.`
      );
    }
    console.log('   ✓ Static site written to firebase/www/');
  } else {
    console.log('   → [DRY RUN] Would run `npm run generate` in www (outputs to firebase/www)');
  }

  // 3. Firebase Deploy
  console.log('\n🔥 Step 3/3: Deploying to Firebase...');
  // --force skips the Artifact Registry cleanup-policy prompt on functions deploys.
  const deployCmd = hostingOnly
    ? 'firebase deploy --only hosting --non-interactive'
    : 'firebase deploy --non-interactive --force';
  if (!dryRun) {
    runCommand(deployCmd, projectRoot);
    console.log('\n🎉 Deploy completed successfully!');
  } else {
    console.log(`   → [DRY RUN] Would run \`${deployCmd}\` in the repo root`);
  }
}

main().catch(err => {
  console.error('\n❌ Deployment failed:', err.message);
  process.exit(1);
});
