export default {
  es: {
    heroBadge: 'Funciones',
    heroTitle: 'Todo cuelga de un solo bucle',
    heroSubtitle:
      'Escanea, revisa, y deja que los precios, márgenes e inventario se mantengan al día solos. Cada salida de la IA es revisable; cada número automático, corregible.',
    screenshotLabel: 'Captura',

    scannerTitle: 'El Escáner',
    scannerBody:
      'Captura continua pensada para la velocidad: guías de encuadre, un flash de confirmación y la miniatura de la última foto. La cámara nunca se bloquea entre fotos — la subida y la IA corren de fondo. Un control de calidad en el dispositivo (~5 ms) detecta fotos borrosas u oscuras antes de subirlas.',
    scannerShot: 'Captura del escáner en acción',

    pipelineTitle: 'El pipeline de IA',
    pipelineBody:
      'Cuatro etapas, cada una atrapa lo que la anterior no pudo: Clasificar (¿es un documento de compra, factura o albarán?), Extraer (proveedor, fecha, líneas, categoría por línea y contenido del paquete, con emparejado contra tu catálogo), Validar (comprobaciones matemáticas deterministas) y Revisar (un humano aprueba en Triage).',
    pipelineShot: 'Captura del pipeline de extracción',

    triageTitle: 'Triage',
    triageBody:
      'La bandeja donde esperan los documentos digitalizados. La revisión es lado a lado — la foto del recibo junto a las líneas editables, con avisos ámbar y filas marcadas donde la matemática no cuadró. Aprueba y los precios ruedan; marca como gasto los recibos no alimentarios; cambia factura ↔ albarán si la IA se equivocó. Reconciliación automática de albarán ↔ factura para cazar errores de facturación.',
    triageShot: 'Captura de la revisión lado a lado',

    pulseTitle: 'Pulse — el panel',
    pulseBody:
      'La pantalla de inicio responde «¿cómo va el restaurante?» de un vistazo: tarjetas de gasto semanal, ingresos, food-cost % (contra la banda objetivo 28–35%) y el valor de la despensa. Gráficos hechos a mano en SVG: gasto vs ingresos, matriz de ingeniería de menú, sparklines de precios y Pareto de ingredientes. Cada nombre es un enlace a su página.',
    pulseShot: 'Captura del panel Pulse con gráficos',

    menuTitle: 'Menú y escandallos',
    menuBody:
      'Cada plato costeado en vivo desde los precios rodantes de tus proveedores. La lista muestra barras de margen objetivo vs real, ordenadas de peor a mejor — los platos que necesitan atención flotan hacia arriba. Cada plato tiene su desglose de coste: la parte de cada ingrediente en el plato, la vista «por qué este plato es caro».',
    menuShot: 'Captura del escandallo de un plato',

    pantryTitle: 'Despensa teórica',
    pantryBody:
      'Una tabla de referencia, no un libro mayor: compras (de los escaneos) − ventas (vía recetas) = stock actual, con cero registro diario. Cada mes, el chef recorre la cámara y ajusta lo que ve. El generador de lista de compra deriva el ritmo de uso y sugiere cantidades para 7 días, ordenadas por urgencia y agrupadas por proveedor — con pedido por email o WhatsApp.',
    pantryShot: 'Captura de la despensa y lista de compra',

    vendorsTitle: 'Proveedores',
    vendorsBody:
      'Un directorio que se mantiene solo — derivado de las facturas aprobadas y los gastos etiquetados, así que nunca se desvía de la realidad. Cada proveedor muestra gasto, entregas, última entrega y etiquetas derivadas: las categorías que realmente suministra y los gastos que has pagado bajo su nombre. Sin etiquetado manual, nunca.',
    vendorsShot: 'Captura del directorio de proveedores',

    assistantTitle: 'El Asistente',
    assistantBody:
      'Un botón ✨ abre preguntas y respuestas sobre tus propios datos: «¿qué subió de precio esta semana?». El contexto que ve el modelo está filtrado por los permisos del miembro, así que un empleado solo-escaneo literalmente no puede preguntar sobre el dinero.',
    assistantShot: 'Captura del asistente respondiendo',

    teamTitle: 'Equipo y permisos',
    teamBody:
      'Un restaurante es un espacio compartido. El dueño invita por email; al entrar con Google, cada miembro se adjunta con permisos granulares por área — escanear (sí/no) y triage / menú / despensa / finanzas en ninguno / solo-lectura / edición. «Camarero solo-cámara», «contable con finanzas de solo lectura» o «chef con todo menos el dinero» son solo combinaciones de permisos. Se aplica en el servidor en cada ruta. Y funciona igual con uno o con varios locales: en el plan Grupo, los mismos permisos se extienden a todo tu grupo con una vista consolidada.',
    teamShot: 'Captura de la gestión de permisos',

    ctaTitle: '¿Listo para escanear tu primera factura?',
    ctaBody: 'Empieza gratis — 25 escaneos al mes, sin tarjeta.',
    ctaButton: 'Empieza gratis',
    ctaSecondary: 'Ver precios',
  },
  en: {
    heroBadge: 'Features',
    heroTitle: 'Everything hangs off one loop',
    heroSubtitle:
      'Scan, review, and let prices, margins, and inventory keep themselves current. Every AI output is reviewable; every automatic number is correctable.',
    screenshotLabel: 'Screenshot',

    scannerTitle: 'The Scanner',
    scannerBody:
      'Continuous capture built for speed: framing guides, a confirmation flash, and a live thumbnail of the last shot. The camera never blocks between photos — uploads and AI run in the background. An on-device quality gate (~5 ms) catches blurry or dark shots before they upload.',
    scannerShot: 'Scanner in action screenshot',

    pipelineTitle: 'The AI pipeline',
    pipelineBody:
      "Four stages, each catching what the last can't: Classify (is this a purchase document, invoice or delivery note?), Extract (vendor, date, line items, per-line category and pack contents, with matching against your catalog), Validate (deterministic math cross-checks), and Review (a human approves in Triage).",
    pipelineShot: 'Extraction pipeline screenshot',

    triageTitle: 'Triage',
    triageBody:
      'The inbox where digitized documents wait. Review is side-by-side — the receipt photo next to editable line items, with amber warnings and flagged rows where the math didn\'t check out. Approve and prices roll; mark non-food bills as expenses; flip invoice ↔ delivery note if the AI misjudged. Automatic delivery-note ↔ invoice reconciliation catches billing errors.',
    triageShot: 'Side-by-side review screenshot',

    pulseTitle: 'Pulse — the dashboard',
    pulseBody:
      'The home screen answers "how is the restaurant doing?" at a glance: weekly expenses, revenue, food-cost % (against the 28–35% target band), and pantry value. Hand-rolled SVG charts: expenses vs revenue, the menu engineering matrix, price sparklines, and an ingredient Pareto. Every name links to its page.',
    pulseShot: 'Pulse dashboard with charts screenshot',

    menuTitle: 'Menu & recipe costing',
    menuBody:
      'Every dish costed live from your suppliers\' rolling prices. The list shows target-vs-actual margin bars sorted worst-first — dishes needing attention float up. Each dish has a cost breakdown: each ingredient\'s share of the plate, the "why is this dish expensive" view.',
    menuShot: "A dish's recipe costing screenshot",

    pantryTitle: 'Theoretical pantry',
    pantryBody:
      'A reference table, not a ledger: purchases (from scans) − sales (via recipes) = current stock, with zero daily input. Monthly, the chef walks the walk-in and trues up what they see. The grocery-list generator derives usage rate and suggests 7-day quantities, sorted by urgency and grouped by vendor — order by email or WhatsApp.',
    pantryShot: 'Pantry and grocery list screenshot',

    vendorsTitle: 'Vendors',
    vendorsBody:
      "A directory that maintains itself — derived from approved invoices and tagged expenses, so it can never drift from reality. Each vendor shows spend, deliveries, last delivery, and derived tags: the categories they actually supply and the expenses you've paid them under. No manual tagging, ever.",
    vendorsShot: 'Vendor directory screenshot',

    assistantTitle: 'The Assistant',
    assistantBody:
      'A ✨ button opens Q&A over your own data: "what went up in price this week?". The context the model sees is filtered by the member\'s permissions, so a scan-only employee literally cannot ask about the money.',
    assistantShot: 'Assistant answering a question screenshot',

    teamTitle: 'Team & permissions',
    teamBody:
      'One restaurant is a shared workspace. The owner invites by email; on Google sign-in each member is attached with granular per-area permissions — scan (yes/no) and triage / menu / pantry / finance at none / read-only / edit. "Camera-only runner", "accountant with finance read-only", or "chef with everything but the money" are just permission combinations. Enforced server-side on every route. And it works the same with one location or many: on the Group plan the same permissions extend across your whole group with a consolidated view.',
    teamShot: 'Permission management screenshot',

    ctaTitle: 'Ready to scan your first invoice?',
    ctaBody: 'Start free — 25 scans a month, no card.',
    ctaButton: 'Start free',
    ctaSecondary: 'See pricing',
  },
}
