export default defineAppConfig({
  ui: {
    // ── Brand palette (shared with the Teremu app) ──────────────
    // Ember is the brand; herb (green) and coral (crimson) are the
    // app's semantic colors. Neutrals use warm "stone" to sit under
    // the ember without going cold. Palettes are defined in main.css.
    colors: {
      primary: 'ember',
      secondary: 'herb',
      accent: 'ember',
      success: 'herb',
      info: 'sky',
      warning: 'amber',
      error: 'coral',
      neutral: 'stone',
    },

    button: {
      // slots: { base: 'font-semibold' },
      defaultVariants: {
        // size: 'md',   // options: xs | sm | md | lg | xl
        // color: 'primary',
      },
    },
  },
})
