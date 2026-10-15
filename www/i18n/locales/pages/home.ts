export default {
  es: {
    // Hero
    heroBadge: 'Food-cost para restaurantes independientes',
    heroTitle: 'Deja de perder margen sin darte cuenta',
    heroSubtitle:
      'Los precios de tus proveedores no paran de moverse; el coste de tus platos, no. Escanea tus facturas y Teremu te muestra qué plato pierde margen, qué te cobraron de más y qué precio conviene subir — en minutos y sin hojas de cálculo.',
    heroCtaPrimary: 'Empieza gratis',
    heroCtaSecondary: 'Haz la cuenta',
    heroNote: 'Sin tarjeta. 25 escaneos al mes gratis, para siempre.',
    heroScreenshot: 'Captura del panel Pulse',

    // Trust / stats strip
    stat1Value: '60 seg',
    stat1Label: 'para escanear una pila de 15 facturas',
    stat2Value: '$200–$400',
    stat2Label: 'al mes que puede recuperar un local que compra $20,000 en comida (estimado)',
    stat3Value: '2+ h',
    stat3Label: 'al mes que ahorras sin teclear facturas a mano (estimado)',

    // The problem: where margin leaks
    leaksEyebrow: 'El problema',
    leaksTitle: 'El margen se pierde en silencio',
    leaksSubtitle:
      'Abriste tu restaurante por la comida, pero un buen plato no protege un margen que no ves. Con 3–5 centavos de ganancia por dólar, lo que no ves te cuesta caro.',
    leaksMoreLink: 'Ver las cifras, el ejemplo y las fuentes',
    leak1Value: '3–5%',
    leak1Title: 'Es todo lo que queda',
    leak1Body:
      'Es el margen neto típico de un restaurante de servicio completo. Un solo punto de food-cost equivale a más o menos una cuarta parte de tu beneficio.',
    leak1Fix:
      'Teremu te muestra el food-cost real, plato por plato, para que sepas dónde está ese punto.',
    leak2Value: '+34%',
    leak2Title: 'Los costes no se detienen',
    leak2Body:
      'Los costes de comida han subido un 34% desde antes de la pandemia, y no todos los ingredientes se mueven igual. La ficha de coste que hiciste hace tres meses ya está desactualizada.',
    leak2Fix:
      'Cada factura aprobada actualiza el coste de tus platos al instante: ves el margen de hoy, no el de la última vez que abriste Excel.',
    leak3Value: '1 de 3',
    leak3Title: 'Las facturas traen errores',
    leak3Body:
      'En auditorías de miles de facturas, alrededor de un tercio incluía al menos un cobro de más. Casi nunca es fraude: es un precio que cambió, un sustituto o un formato distinto, y nadie lo revisa.',
    leak3Fix:
      'Teremu compara cada línea con lo que pagaste antes y con tu albarán, y te avisa mientras todavía puedes reclamar.',
    leaksSourcesLabel: 'Fuentes',
    leaksSource1: 'Toast: márgenes del sector',
    leaksSource2: 'National Restaurant Association: costes de comida',
    leaksSource3: 'FSR Magazine: cobros de más en facturas',

    // Core loop
    loopEyebrow: 'Cómo funciona',
    loopTitle: 'El bucle central',
    loopSubtitle:
      'Todo en Teremu cuelga de un solo flujo. Tú escaneas; la IA hace el resto; tú corriges lo que importa.',
    loopStep1Title: 'Escanea',
    loopStep1Body:
      'Fotografía una pila de facturas. La cámara nunca se bloquea entre fotos: la subida y la IA corren de fondo.',
    loopStep1Outcome: 'Dejas de teclear facturas.',
    loopStep2Title: 'Revisa (Triage)',
    loopStep2Body:
      'Foto y líneas extraídas, lado a lado. Un toque para aprobar; las advertencias guían la vista.',
    loopStep2Outcome: 'Pillas errores y cobros de más antes de pagar.',
    loopStep3Title: 'Todo se actualiza',
    loopStep3Body:
      'Los precios ruedan, los márgenes de los platos se recalculan y la despensa se llena — automáticamente.',
    loopStep3Outcome: 'Ves el margen de hoy, no el de hace tres meses.',
    loopStep4Title: 'Pulse te avisa',
    loopStep4Body:
      'Alertas cuando un proveedor sube precios o un plato baja del margen objetivo.',
    loopStep4Outcome: 'Reaccionas esta semana, no al cierre de mes.',


    // Savings calculator
    calcEyebrow: 'Haz la cuenta',
    calcTitle: 'Cuánto dinero y tiempo podrías recuperar',
    calcSubtitle:
      'Mueve los controles con los números de tu cocina. Es una estimación prudente, no una promesa.',
    calcSpendLabel: 'Compras de comida al mes (por local)',
    calcInvoicesLabel: 'Facturas que recibes por semana (por local)',
    calcLocationsLabel: 'Número de locales',
    calcMoneyLabel: 'Podrías recuperar al mes',
    calcMoneyNote: 'cazando subidas de precio y cobros de más ({low}–{high}% de tus compras)',
    calcTimeLabel: 'Tiempo que te ahorras al mes',
    calcTimeNote: 'sin teclear facturas a mano',
    calcHoursUnit: 'h',
    calcPointLabel: 'Cada punto de food cost vale',
    calcPerMonth: 'al mes',
    calcPointNote:
      'o {year} al año. No es una promesa de ahorro: es lo que vale cada punto que consigas recuperar.',
    calcReturnLabel: 'Retorno',
    calcReturnNote:
      'unas {multiple} veces lo que cuesta Pro; se paga en unos {days} días de ahorro estimado.',
    calcProfitLabel: 'En beneficio',
    calcProfitNote:
      'Eso equivale a ~{pct}% más de beneficio para un restaurante típico (food-cost del {cost}% y margen neto del {margin}%).',
    calcNetLabel: 'Después de pagar Pro ({price}/mes)',
    calcDisclaimer:
      'Estimación ilustrativa. Tus resultados dependen de tus proveedores, tus precios y tu volumen de facturas, y de que actúes con lo que Teremu te muestra.',
    calcHowSummary: 'Cómo calculamos esto',
    calcHow1:
      'Dinero: {low}–{high}% de tus compras mensuales. En auditorías de facturas, los cobros de más rondan el 1.5% del importe; usamos un rango prudente alrededor de esa cifra.',
    calcHow2:
      'Tiempo: suponemos {manual} min por factura tecleándola a mano frente a {scan} min escaneando y aprobando. Son supuestos nuestros; tu caso puede variar.',
    calcHow3:
      'Beneficio: suponemos un food-cost del {cost}% sobre ventas y un margen neto del {margin}%, típico de un restaurante independiente de servicio completo.',
    calcHow5:
      'Cada punto de food cost: estimamos tus ventas como compras ÷ {cost}%, y un punto es el 1% de esas ventas. Solo muestra lo que vale, no lo que vayas a conseguir.',
    calcHow4: 'Teremu te avisa; tú decides si reclamas, renegocias o ajustas precios. El ahorro llega cuando actúas.',
    calcHowSource: 'Ver el análisis de facturas',

    // Features overview
    featuresEyebrow: 'En tu cocina',
    featuresTitle: 'Lo que hace por tu cocina',
    featuresSubtitle: 'Aproximación inteligente en vez de contabilidad. Nunca te pide registrar nada a diario.',
    feat1Title: 'Escáner',
    feat1Body: 'Una pila de facturas en un minuto y nada que teclear después. Detecta fotos borrosas antes de subirlas.',
    feat2Title: 'Pulse',
    feat2Body: 'Sabes cómo va el restaurante de un vistazo y te enteras de los problemas esta semana, no al cierre de mes.',
    feat3Title: 'Menú y escandallos',
    feat3Body: 'Conoce el margen real de cada plato hoy y sube el precio solo de los que lo necesitan.',
    feat4Title: 'Despensa teórica',
    feat4Body: 'Sabes qué te queda y qué pedir sin contar a diario: compras − ventas = stock actual.',
    feat5Title: 'Proveedores',
    feat5Body: 'Compara lo que pagas con lo que pagabas y negocia con datos. El directorio se arma solo desde tus facturas.',
    feat6Title: 'Asistente',
    feat6Body: 'Respuestas en segundos sobre tu propio negocio, como «¿cuál es el margen del risotto?», sin abrir una hoja de cálculo.',
    featuresCta: 'Explora todas las funciones',

    // Screenshot showcase
    showcaseTitle: 'Diseñado para el móvil, en la cocina',
    showcaseBody:
      'Teremu es una app que corre en el navegador hoy y se instala como app de iOS y Android. Cada número automático es corregible, y la corrección del humano siempre gana.',
    showcaseScreenshot: 'Captura de la app en el móvil',

    // Trust / privacy
    trustTitle: 'Tus recetas son tuyas',
    trust1Title: 'Solo ingredientes, nunca la preparación',
    trust1Body:
      'Costeamos el plato con la lista de ingredientes y cantidades. Cómo lo cocinas, tu técnica y tus secretos se quedan contigo.',
    trust2Title: 'Tus datos, privados',
    trust2Body:
      'Nunca vendemos ni compartimos tu información con terceros. Lo que subes es tuyo y solo tú lo ves.',
    trust3Title: 'Tú tienes el control',
    trust3Body:
      'Exporta o borra tus datos cuando quieras, y corrige cualquier número automático. La corrección del humano siempre gana.',

    // Testimonials / "real kitchens" (sample quotes — reemplazar por reseñas reales)
    humanTitle: 'Cocinas de verdad, márgenes de verdad',
    humanSubtitle: 'Hecho con chefs independientes, para chefs independientes.',
    humanPhoto: 'Foto: chef en la cocina',
    t1Quote:
      'Dejé de hacer escandallos en Excel. Escaneo las facturas del lunes y el martes ya sé qué platos subir de precio.',
    t1Name: 'Marta Ríos',
    t1Role: 'Chef-propietaria · Bistró Norte',
    t2Quote:
      'Cacé una subida del 12% en el aceite antes de que me comiera el margen del mes.',
    t2Name: 'Diego Salas',
    t2Role: 'Dueño · Taquería El Fuego',
    t3Quote:
      'Mi contable ve las finanzas, mi equipo escanea y yo solo reviso. Cinco minutos a la semana.',
    t3Name: 'Lucía Fernández',
    t3Role: 'Chef · Casa Lucía',

    missionEyebrow: 'Por qué existimos',
    missionTitle: 'Tú cocinas. Teremu lleva los números.',
    missionStripBody:
      'Existimos para ayudar a chefs y dueños apasionados a centrarse en lo que de verdad les importa y a que su restaurante tenga éxito.',
    missionStripLink: 'Lee por qué existimos',

    // Pricing teaser
    pricingTeaserTitle: 'Cuesta menos que medio cubierto al mes',
    pricingTeaserBody:
      'Empieza gratis. Cuando Teremu se vuelva tu forma de comprar, Pro cuesta $39 por local al mes — una fracción de lo que puedes recuperar. ¿Varios locales? Grupo los reúne en una sola cuenta, cada uno con su propio plan.',
    pricingTeaserNote: 'Pruébalo gratis primero: sin tarjeta, sin cuota de implementación y sin llamada de ventas.',
    pricingTeaserCta: 'Ver precios',

    // Final CTA
    finalCtaTitle: 'Escanea tu primera factura hoy',
    finalCtaBody: 'El momento «ajá» tarda menos de cinco minutos y no necesita ventas. Después, vuelve a lo que te apasiona: cocinar.',
    finalCtaButton: 'Empieza gratis',
  },
  en: {
    heroBadge: 'Food-cost for independent restaurants',
    heroTitle: "Stop losing margin you don't know about",
    heroSubtitle:
      "Your suppliers' prices keep moving. Your recipe costs don't. Scan your invoices and Teremu shows which dishes are losing margin, what you were overcharged, and what to reprice — in minutes, with no spreadsheets.",
    heroCtaPrimary: 'Start free',
    heroCtaSecondary: 'Do the math',
    heroNote: 'No card. 25 free scans a month, forever.',
    heroScreenshot: 'Pulse dashboard screenshot',

    stat1Value: '60 sec',
    stat1Label: 'to scan a stack of 15 invoices',
    stat2Value: '$200–$400',
    stat2Label: 'a month a location buying $20,000 of food can recover (estimate)',
    stat3Value: '2+ hrs',
    stat3Label: 'saved each month by not typing in invoices (estimate)',

    leaksEyebrow: 'The problem',
    leaksTitle: 'Margin leaks out quietly',
    leaksSubtitle:
      "You opened your restaurant for the food, but a great dish doesn't protect a margin you can't see. With 3–5 cents of profit on the dollar, what you can't see costs you.",
    leaksMoreLink: 'See the numbers, the example, and the sources',
    leak1Value: '3–5%',
    leak1Title: "That's all that's left",
    leak1Body:
      "That's the typical net margin for a full-service restaurant. A single point of food cost is roughly a quarter of your profit.",
    leak1Fix:
      "Teremu shows your real food cost, dish by dish, so you know where that point is.",
    leak2Value: '+34%',
    leak2Title: "Costs don't stand still",
    leak2Body:
      "Food costs are up 34% since before the pandemic, and not every ingredient moves the same way. The cost card you made three months ago is already out of date.",
    leak2Fix:
      "Every approved invoice updates your dish costs instantly: you see today's margin, not the one from the last time you opened Excel.",
    leak3Value: '1 in 3',
    leak3Title: 'Invoices carry errors',
    leak3Body:
      "In audits of thousands of invoices, about a third had at least one overcharge. It's rarely fraud: a price changed, an item was substituted, a pack size shifted, and nobody checked.",
    leak3Fix:
      'Teremu compares every line to what you paid before and to your delivery note, and flags the gap while you can still dispute it.',
    leaksSourcesLabel: 'Sources',
    leaksSource1: 'Toast: industry margins',
    leaksSource2: 'National Restaurant Association: food costs',
    leaksSource3: 'FSR Magazine: invoice overcharges',

    loopEyebrow: 'How it works',
    loopTitle: 'The core loop',
    loopSubtitle:
      'Everything in Teremu hangs off one flow. You scan; AI does the rest; you correct what matters.',
    loopStep1Title: 'Scan',
    loopStep1Body:
      'Photograph a stack of invoices. The camera never blocks between shots — uploads and AI run in the background.',
    loopStep1Outcome: 'You stop typing in invoices.',
    loopStep2Title: 'Triage',
    loopStep2Body:
      'Photo next to extracted line items, side by side. One tap to approve; warnings guide the eye.',
    loopStep2Outcome: 'You catch errors and overcharges before you pay.',
    loopStep3Title: 'Everything updates',
    loopStep3Body:
      'Prices roll, dish margins recalculate, and the pantry fills — automatically.',
    loopStep3Outcome: "You see today's margin, not the one from three months ago.",
    loopStep4Title: 'Pulse alerts you',
    loopStep4Body:
      'Alerts when a vendor raises prices or a dish slips below its target margin.',
    loopStep4Outcome: "You react this week, not at month's end.",


    calcEyebrow: 'Do the math',
    calcTitle: 'How much money and time could you get back',
    calcSubtitle:
      "Move the sliders to your kitchen's numbers. It's a prudent estimate, not a promise.",
    calcSpendLabel: 'Monthly food purchases (per location)',
    calcInvoicesLabel: 'Invoices you receive per week (per location)',
    calcLocationsLabel: 'Number of locations',
    calcMoneyLabel: 'You could recover each month',
    calcMoneyNote: 'by catching price hikes and overcharges ({low}–{high}% of your purchases)',
    calcTimeLabel: 'Time you save each month',
    calcTimeNote: 'by not typing invoices in by hand',
    calcHoursUnit: 'hrs',
    calcPointLabel: 'Every point of food cost is worth',
    calcPerMonth: 'a month',
    calcPointNote:
      "or {year} a year. It's not a savings promise: it's what each point you manage to recover is worth.",
    calcReturnLabel: 'Return',
    calcReturnNote:
      'about {multiple}× what Pro costs; it pays for itself in roughly {days} days of estimated savings.',
    calcProfitLabel: 'In profit terms',
    calcProfitNote:
      "That's about {pct}% more profit for a typical restaurant ({cost}% food cost and a {margin}% net margin).",
    calcNetLabel: 'After paying for Pro ({price}/mo)',
    calcDisclaimer:
      'Illustrative estimate. Your results depend on your suppliers, your prices, your invoice volume, and acting on what Teremu shows you.',
    calcHowSummary: 'How we calculate this',
    calcHow1:
      'Money: {low}–{high}% of your monthly purchases. In invoice audits, overcharges run around 1.5% of the invoice amount; we use a prudent range around that figure.',
    calcHow2:
      'Time: we assume {manual} min per invoice typing it in by hand versus {scan} min scanning and approving. These are our own assumptions; yours may differ.',
    calcHow3:
      'Profit: we assume a {cost}% food cost on sales and a {margin}% net margin, typical for an independent full-service restaurant.',
    calcHow5:
      "Each point of food cost: we estimate your sales as purchases ÷ {cost}%, and one point is 1% of those sales. It only shows what a point is worth, not what you'll achieve.",
    calcHow4: 'Teremu alerts you; you decide whether to dispute, renegotiate, or reprice. The savings arrive when you act.',
    calcHowSource: 'See the invoice audit analysis',

    featuresEyebrow: 'In your kitchen',
    featuresTitle: 'What it does for your kitchen',
    featuresSubtitle: 'Intelligent approximation over bookkeeping. It never asks you to log anything daily.',
    feat1Title: 'Scanner',
    feat1Body: 'A stack of invoices in a minute and nothing to type afterwards. It catches blurry shots before they upload.',
    feat2Title: 'Pulse',
    feat2Body: "See how the restaurant is doing at a glance and hear about problems this week, not at month's end.",
    feat3Title: 'Menu & recipe costing',
    feat3Body: "Know every dish's real margin today and reprice only the ones that need it.",
    feat4Title: 'Theoretical pantry',
    feat4Body: 'Know what you have and what to order without counting daily: purchases − sales = current stock.',
    feat5Title: 'Vendors',
    feat5Body: 'Compare what you pay to what you used to pay and negotiate with data. The directory builds itself from your invoices.',
    feat6Title: 'Assistant',
    feat6Body: 'Answers in seconds about your own business, like "what\'s the risotto\'s margin?", without opening a spreadsheet.',
    featuresCta: 'Explore all features',

    showcaseTitle: 'Built for mobile, in the kitchen',
    showcaseBody:
      'Teremu runs in the browser today and ships as iOS and Android apps. Every automatic number is correctable, and the human\'s correction always wins.',
    showcaseScreenshot: 'App screenshot on mobile',

    // Trust / privacy
    trustTitle: 'Your recipes are yours',
    trust1Title: 'Only ingredients, never the method',
    trust1Body:
      'We cost the dish from its ingredient list and quantities. How you cook it — your technique and your secrets — stays with you.',
    trust2Title: 'Your data, private',
    trust2Body:
      'We never sell or share your information with third parties. What you upload is yours, and only you can see it.',
    trust3Title: "You're in control",
    trust3Body:
      'Export or delete your data whenever you want, and correct any automatic number. The human\'s correction always wins.',

    // Testimonials / "real kitchens" (sample quotes — replace with real reviews)
    humanTitle: 'Real kitchens, real margins',
    humanSubtitle: 'Built with independent chefs, for independent chefs.',
    humanPhoto: 'Photo: chef in the kitchen',
    t1Quote:
      'I stopped costing recipes in Excel. I scan Monday\'s invoices and by Tuesday I know which dishes to reprice.',
    t1Name: 'Marta Ríos',
    t1Role: 'Chef-owner · Bistró Norte',
    t2Quote:
      'I caught a 12% jump in oil before it ate into the month\'s margin.',
    t2Name: 'Diego Salas',
    t2Role: 'Owner · Taquería El Fuego',
    t3Quote:
      'My accountant sees the finances, my team scans, and I just review. Five minutes a week.',
    t3Name: 'Lucía Fernández',
    t3Role: 'Chef · Casa Lucía',

    missionEyebrow: 'Why we exist',
    missionTitle: 'You cook. Teremu handles the numbers.',
    missionStripBody:
      'We exist to help passionate chefs and owners focus on what they truly care about, and to help their restaurants succeed.',
    missionStripLink: 'Read why we exist',

    pricingTeaserTitle: 'Costs less than half a cover a month',
    pricingTeaserBody:
      'Start free. When Teremu becomes how you buy, Pro is $39 per location a month — a fraction of what you can recover. Multiple locations? Group keeps them all in one account, each on its own plan.',
    pricingTeaserNote: 'Try it free first: no card, no implementation fee, and no sales call.',
    pricingTeaserCta: 'See pricing',

    finalCtaTitle: 'Scan your first invoice today',
    finalCtaBody: 'The "aha" moment takes under five minutes and needs no sales call. Then get back to what you love: cooking.',
    finalCtaButton: 'Start free',
  },
}
