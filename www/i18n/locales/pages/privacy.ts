// Privacy policy copy. Spanish is authored first; English mirrors it.
//
// Scope rule: this is the ONE public copy of the privacy policy. It covers
// teremu.com (the marketing site) AND the Teremu application; the app's own
// /privacy route only redirects here. Whenever the app gains a feature that
// touches personal data (a new integration, a new processor), this file
// changes in the same release.
//
// "@" is a linked-message operator in vue-i18n — always escape it as {'@'}.
export default {
  es: {
    heroTitle: 'Política de privacidad',
    heroSubtitle:
      'Qué datos recogemos en teremu.com y en la aplicación Teremu, por qué los tratamos, con quién los compartimos y cómo puedes ejercer tus derechos.',
    updatedLabel: 'Última actualización',
    updatedDate: '25 de octubre de 2026',

    summaryTitle: 'En resumen',
    summaryNote:
      'Este resumen es orientativo y no sustituye al texto completo que aparece debajo.',
    summary1: 'No vendemos ni alquilamos datos personales, y no hacemos publicidad dirigida.',
    summary2: 'El sitio no instala cookies propias. La analítica solo se activa si la aceptas.',
    summary3:
      'Recogemos lo que nos envías por un formulario, lo que introduces en la aplicación para gestionar tu restaurante y métricas de uso agregadas.',
    summary4:
      'Si conectas Gmail, tu TPV o un asistente de IA externo, el acceso es de solo lectura y puedes revocarlo cuando quieras.',
    summary5: 'Puedes pedirnos acceso, corrección o eliminación de tus datos cuando quieras.',

    operatorTitle: 'Quién es responsable de tus datos',
    controllerLabel: 'Responsable del tratamiento',
    controllerBody:
      "MTM CYA Corp · Estados Unidos · info{'@'}teremu.com",
    operatorBody:
      'Teremu es un producto creado y operado por MTM CYA Corp, que opera comercialmente como MTM Cofounders & Associates («MTM»), una sociedad constituida en los Estados Unidos. MTM es la entidad responsable del tratamiento de los datos personales descritos en esta política. «Teremu», «nosotros» y «nuestro» se refieren a esa misma entidad.',
    groupTitle: 'Relación con MTM y con otros productos del grupo',
    groupBody:
      'MTM construye y opera varios productos de software propios; Teremu es uno de ellos. Puedes conocer la empresa en mtmcya.com. Como todos los productos comparten equipo, infraestructura y funciones internas de soporte, administración y facturación, el personal autorizado de MTM puede acceder a los datos tratados a través de Teremu para esas finalidades. Ese acceso interno no es una cesión a terceros: sigue estando bajo el control y la responsabilidad de MTM, con las mismas garantías descritas aquí.',
    groupSeparate:
      'Cada producto de MTM mantiene su propio sitio, su propio aviso de privacidad y sus propios sistemas. No unificamos ni cruzamos tu perfil entre productos distintos con fines comerciales o publicitarios.',

    scopeTitle: 'Qué cubre esta política',
    scopeBody:
      'Esta política se aplica al sitio de marketing teremu.com —las páginas públicas, el blog y los formularios de contacto y de demo— y a la aplicación Teremu (app.teremu.com y las apps móviles), incluidas las integraciones que decidas conectar desde ella. Es la única versión publicada: los enlaces a la política de privacidad dentro de la aplicación conducen a esta misma página. Las condiciones de uso del servicio están en los términos del servicio, que complementan este documento.',

    collectTitle: 'Qué datos recogemos',
    collectIntro: 'Recogemos datos en cuatro situaciones, y en ninguna otra:',
    collect1Title: 'Cuando rellenas un formulario',
    collect1Body:
      'Los formularios de contacto y de solicitud de demo recogen tu nombre, tu correo electrónico y tu mensaje. Opcionalmente puedes añadir el nombre de tu restaurante, un teléfono y el número de locales. Enviamos esa información a nuestro correo interno y te remitimos una confirmación. No nos envíes por estos formularios datos sensibles ni información confidencial de terceros: no son el canal adecuado.',
    collect2Title: 'Cuando navegas por el sitio',
    collect2Body:
      'Si aceptas la analítica, Google Analytics registra datos de uso agregados —páginas vistas, procedencia aproximada, tipo de dispositivo, duración de la visita— para entender qué contenidos resultan útiles. reCAPTCHA Enterprise analiza señales de tu navegador en el momento de enviar un formulario para distinguir a personas de bots.',
    collect3Title: 'Cuando usas la aplicación',
    collect3Body:
      'Al crear una cuenta guardamos tu nombre, tu correo electrónico y las credenciales de acceso (gestionadas por Firebase Authentication). Para prestar el servicio tratamos los datos que introduces sobre tu restaurante: nombre y dirección del local, las facturas que escaneas o importas y lo que contienen (proveedor, artículos, precios, fechas), tus escandallos, carta e inventario, los pedidos importados de tu TPV y los nombres, correos y roles de las personas de tu equipo a las que invitas. Las facturas pueden incluir datos de contacto de tus proveedores; tú decides qué subes y nosotros lo tratamos por cuenta tuya para ofrecerte el servicio.',
    collect4Title: 'Registros técnicos del servidor',
    collect4Body:
      'Nuestro proveedor de alojamiento genera registros automáticos de las peticiones al sitio y a la aplicación (dirección IP, fecha y hora, recurso solicitado, agente de usuario). Son necesarios para servir las páginas, detectar incidencias y prevenir abusos, y se conservan durante un periodo breve.',
    collectNoneTitle: 'Lo que no recogemos',
    collectNoneBody:
      'No creamos perfiles publicitarios, no usamos píxeles de redes sociales, no compramos listas de contactos y no recogemos categorías especiales de datos (salud, ideología, biometría) a través del sitio ni de la aplicación.',

    integrationsTitle: 'Integraciones y procesamiento con IA',
    integrationsIntro:
      'Dentro de la aplicación puedes activar funciones que implican a terceros. Ninguna está activa hasta que la conectas, todas son de solo lectura y todas se pueden desconectar desde Ajustes. Esto es exactamente lo que hace cada una:',

    gmailTitle: 'Importar facturas desde Gmail',
    gmailBody:
      'Si conectas tu cuenta de Gmail, Teremu solicita únicamente el permiso de lectura de Google (gmail.readonly). Con él lee una sola vez el correo de los últimos 31 días y, a partir de ahí, solo el correo nuevo, para localizar facturas de proveedores. Los documentos que identifica como facturas entran en el mismo flujo de revisión que una factura escaneada; el resto del correo se descarta sin guardarlo. Teremu nunca envía, modifica, etiqueta ni elimina mensajes de tu cuenta.',
    gmailLimitedUse:
      'El uso que Teremu hace de la información recibida a través de las API de Google se ajusta a la Política de datos de usuario de los servicios API de Google, incluidos los requisitos de uso limitado. Esos datos se emplean únicamente para extraer facturas y mostrártelas; no se usan para publicidad, no se venden y ninguna persona los lee salvo con tu permiso explícito, por motivos de seguridad o cuando la ley lo exija.',
    gmailRevoke:
      'Puedes desconectar Gmail en cualquier momento desde Ajustes o revocar el acceso desde la configuración de seguridad de tu cuenta de Google. En ambos casos eliminamos el token de acceso. Las facturas ya importadas se conservan como parte de los registros de tu restaurante, igual que una factura escaneada, hasta que las borres.',

    aiTitle: 'Procesamiento con inteligencia artificial',
    aiBody:
      'Tres funciones usan modelos de lenguaje: la extracción de datos de facturas (la imagen o el texto del documento), las sugerencias de carta y escandallos, y el asistente de cocina integrado (tu pregunta junto con los datos del restaurante necesarios para responderla). Para ello enviamos esa información a proveedores de modelos que actúan como encargados del tratamiento por cuenta nuestra, cuyas condiciones prohíben usar tus datos para entrenar sus modelos. Los datos procedentes de Gmail —cualquier factura importada de tu bandeja conectada, ya se lea como texto o como imagen de página— los trata únicamente Google (Gemini en Google Cloud Vertex AI, dentro de nuestro propio proyecto de Google Cloud) y nunca se envían a ningún otro proveedor de IA.',
    aiEstimate:
      'Todo lo que devuelve la IA es una estimación: los importes, unidades y proveedores extraídos, y las sugerencias de precios o recetas, se te presentan para que los revises antes de aprobarlos. Nada se incorpora a tus registros sin tu confirmación.',

    mcpTitle: 'Asistentes de IA externos',
    mcpBody:
      'La persona propietaria del restaurante puede conectar Teremu a un asistente de IA externo —por ejemplo Claude o ChatGPT— mediante el protocolo MCP. Ese asistente puede entonces consultar los datos del restaurante que la persona que hizo la conexión tiene permiso para ver, y los envía al proveedor del asistente conforme a la política de privacidad de ese proveedor, no a la nuestra. La conexión es de solo lectura: el asistente no puede crear ni modificar nada en Teremu.',
    mcpRevoke:
      'Puedes revocar la conexión en cualquier momento desde Ajustes. Registramos qué herramientas consulta cada asistente para que puedas comprobar qué datos ha leído.',

    posTitle: 'Punto de venta (TPV)',
    posBody:
      'Si conectas tu TPV —hoy Square—, Teremu importa las ventas registradas en él para calcular tus ingresos y contrastarlos con tus costos. No modificamos nada en el TPV. Puedes desconectarlo desde Ajustes; las ventas ya importadas se conservan como parte de tus registros.',

    billingTitle: 'Facturación y pagos',
    billingBody:
      'Los pagos se procesan a través de Stripe. Teremu nunca ve ni almacena el número de tu tarjeta: lo introduces directamente en Stripe. Stripe recoge la dirección de facturación y, para empresas de la Unión Europea, el número de IVA intracomunitario, y con ellos calcula el impuesto sobre ventas o el IVA que corresponda. Los precios se muestran sin impuestos. Conservamos el historial de facturas y pagos durante el tiempo que exige la normativa fiscal y contable.',

    basisTitle: 'Base legal y finalidad',
    basisIntro:
      'Si te encuentras en la UE, el EEE o el Reino Unido, tratamos tus datos sobre las siguientes bases del RGPD:',
    basis1:
      'Formularios: medidas precontractuales a petición del interesado (art. 6.1.b) — respondemos a lo que nos preguntas.',
    basis2:
      'Cuenta, datos del restaurante, facturación y procesamiento con IA: ejecución del contrato (art. 6.1.b) — es el servicio que has contratado.',
    basis3:
      'Integraciones opcionales (Gmail, TPV, asistentes externos): tu consentimiento al conectarlas (art. 6.1.a) — puedes retirarlo desconectándolas.',
    basis4:
      'reCAPTCHA y registros técnicos: interés legítimo (art. 6.1.f) — mantener el servicio disponible y proteger los formularios del abuso automatizado.',
    basis5:
      'Google Analytics: consentimiento (art. 6.1.a) — puedes rechazarlo o retirarlo sin perder funcionalidad.',
    basis6:
      'Conservación de facturas y comunicaciones y cumplimiento de requerimientos legales: obligación legal e interés legítimo (art. 6.1.c y 6.1.f).',
    basisNote:
      'Nunca vendemos datos personales, no los alquilamos ni los utilizamos para publicidad de terceros.',
    basisWithdraw:
      'Cuando el tratamiento se basa en tu consentimiento, puedes retirarlo en cualquier momento: la analítica desde el enlace «Preferencias de cookies» del pie de página y las integraciones desde Ajustes. Retirarlo no afecta a la licitud del tratamiento anterior.',

    sharingTitle: 'Con quién compartimos datos',
    sharingIntro:
      'No vendemos ni cedemos tus datos. Recurrimos a los siguientes proveedores, que los tratan por cuenta nuestra y siguiendo nuestras instrucciones:',
    sharing1:
      'Google Cloud y Firebase (Hosting, Cloud Functions, base de datos, almacenamiento de archivos, autenticación, Analytics, reCAPTCHA Enterprise) — alojamiento del sitio y de la aplicación, procesamiento de formularios, medición y protección antifraude.',
    sharing2:
      'Amazon Web Services (Simple Email Service), a través del servicio de correo compartido de MTM — entrega de los correos de notificación, confirmación y resúmenes.',
    sharing3:
      'Stripe — cobro de suscripciones, dirección de facturación y cálculo de impuestos.',
    sharing4:
      'Google Maps Platform — búsqueda de tu restaurante al configurar la cuenta.',
    sharing5:
      'Google (Gemini en Vertex AI) — extracción de datos de facturas, sugerencias de carta y escandallos y el asistente de cocina. Las facturas importadas de una bandeja de Gmail conectada las trata únicamente Google.',
    sharing6:
      'MTM CYA Corp y su personal autorizado — soporte, administración y gestión comercial, según se describe más arriba.',
    sharingYourChoice:
      'Los servicios que conectas tú —tu cuenta de Gmail, tu TPV o un asistente de IA externo— no son encargados nuestros: son proveedores que has elegido y que tratan tus datos conforme a sus propias políticas. Decide con cuidado qué conectas.',
    sharingOther:
      'Además, podemos comunicar datos cuando sea estrictamente necesario para cumplir una obligación legal o un requerimiento válido de una autoridad competente, para ejercer o defender reclamaciones, o en el marco de una fusión, adquisición o reestructuración societaria —en cuyo caso te informaríamos antes de que tus datos queden sujetos a una política distinta.',
    sharingTransfer:
      'Estos proveedores pueden tratar datos fuera del EEE, principalmente en los Estados Unidos. Google, Amazon Web Services y Stripe se acogen a las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea y al EU-U.S. Data Privacy Framework para dichas transferencias; con el resto de proveedores firmamos cláusulas equivalentes. MTM, como entidad estadounidense, trata los datos en Estados Unidos con las mismas garantías contractuales.',

    cookiesTitle: 'Cookies y tecnologías similares',
    cookiesBody:
      'El sitio no utiliza cookies propias. Google Analytics solo se carga si aceptas el aviso de cookies: hasta entonces no se ejecuta ningún script de medición ni se instala ninguna cookie suya. Tu elección se guarda en el almacenamiento local de tu navegador —no es una cookie— para no volver a preguntártelo; puedes borrarla vaciando los datos del sitio. reCAPTCHA Enterprise se carga únicamente en el momento de enviar un formulario y puede instalar cookies de terceros para la detección de bots; es una medida de seguridad estrictamente necesaria para que los formularios funcionen. La aplicación usa solo el almacenamiento estrictamente necesario para mantener tu sesión iniciada.',
    cookiesControl:
      'Puedes cambiar o retirar tu decisión cuando quieras desde el enlace «Preferencias de cookies» del pie de página, y bloquear o eliminar cookies desde la configuración de tu navegador. El sitio seguirá funcionando, aunque los formularios pueden dejar de enviarse si bloqueas reCAPTCHA. Respetamos las señales de preferencia de privacidad que tu navegador envíe cuando la ley aplicable lo exija.',

    retentionTitle: 'Cuánto tiempo conservamos los datos',
    retentionIntro:
      'Conservamos cada dato solo el tiempo necesario para la finalidad que lo justificó:',
    retention1:
      'Mensajes de formulario: mientras sean necesarios para atender tu consulta y la relación comercial posterior, con un máximo de 24 meses desde el último contacto.',
    retention2:
      'Datos de tu cuenta y de tu restaurante: mientras la cuenta esté activa. Tras cancelarla puedes exportarlos durante 30 días; después los eliminamos.',
    retention3:
      'Tokens de acceso de las integraciones (Gmail, TPV, asistentes externos): se eliminan en cuanto desconectas la integración o revocas el permiso desde el proveedor.',
    retention4:
      'Registro de consultas de los asistentes externos y correos descartados por la importación de Gmail: el registro se conserva un periodo limitado para que puedas auditarlo; los correos descartados no se guardan.',
    retention5:
      'Datos de Google Analytics: 14 meses, de forma agregada.',
    retention6:
      'Registros técnicos del servidor: periodo breve, conforme a la configuración estándar de nuestro proveedor de alojamiento.',
    retentionNote:
      'Cumplidos esos plazos eliminamos o anonimizamos la información, salvo que una obligación legal —por ejemplo, la conservación de facturas a efectos fiscales— o la defensa de una reclamación exija conservarla más tiempo.',

    rightsTitle: 'Tus derechos',
    rightsIntro:
      "Puedes ejercer en cualquier momento los derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición, así como retirar tu consentimiento. Escríbenos a info{'@'}teremu.com y te responderemos en un plazo máximo de 30 días. Podemos pedirte información adicional para verificar tu identidad antes de atender la solicitud; la usaremos solo para eso.",
    rightsFree:
      'Ejercer estos derechos es gratuito. No te trataremos de forma distinta ni te negaremos ningún servicio por haberlos ejercido.',
    rightsComplaint:
      'Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la autoridad de control de tu país. En España es la Agencia Española de Protección de Datos (aepd.es).',

    usRightsTitle: 'Residentes en Estados Unidos',
    usRightsBody:
      'Si resides en California u otro estado con legislación de privacidad del consumidor, dispones además de los derechos a conocer, acceder, corregir y eliminar la información personal que tengamos sobre ti, y a no sufrir discriminación por ejercerlos. Puedes ejercerlos por el mismo canal indicado arriba y, si lo prefieres, a través de un agente autorizado.',
    usRightsSale:
      'No vendemos información personal ni la compartimos para publicidad conductual entre contextos, en el sentido que la CCPA/CPRA y leyes estatales equivalentes dan a esos términos. Tampoco tratamos información personal sensible con fines de inferencia de características.',

    automatedTitle: 'Decisiones automatizadas',
    automatedBody:
      'No tomamos decisiones que produzcan efectos jurídicos sobre ti basadas únicamente en el tratamiento automatizado, ni elaboramos perfiles con ese fin. Los resultados de la IA son estimaciones que tú revisas y apruebas, y la puntuación de reCAPTCHA solo determina si una petición se acepta como legítima; si un envío se bloquea por error, puedes escribirnos y lo resolvemos manualmente.',

    securityTitle: 'Seguridad',
    securityBody:
      'El sitio y la aplicación se sirven íntegramente por HTTPS. Las credenciales de nuestros servicios se guardan en Google Secret Manager y nunca se incluyen en el código. Los tokens de las integraciones que conectas se almacenan cifrados y solo los usa el servidor. El acceso a los datos de los restaurantes y al buzón que recibe los formularios está restringido al personal autorizado. Ningún sistema es infalible: si se produjera una violación de seguridad que suponga un riesgo alto para tus derechos, te lo notificaremos y lo comunicaremos a la autoridad competente en los plazos que marca la ley.',

    minorsTitle: 'Menores',
    minorsBody:
      'Teremu se dirige a profesionales de la restauración y no está destinado a menores de 16 años. No recogemos datos de menores de forma consciente. Si detectamos que hemos recibido datos de un menor sin la autorización correspondiente, los eliminaremos; si eres madre, padre o tutor y crees que ha ocurrido, escríbenos.',

    linksTitle: 'Enlaces a sitios de terceros',
    linksBody:
      'Este sitio puede enlazar a páginas que no controlamos, incluida mtmcya.com y los sitios de otros productos de MTM. Cada uno tiene su propio aviso de privacidad y nosotros no respondemos de su contenido ni de sus prácticas de tratamiento.',

    changesTitle: 'Cambios en esta política',
    changesBody:
      'Si modificamos esta política actualizaremos la fecha que figura arriba. Los cambios sustanciales se comunicarán de forma destacada en el sitio o dentro de la aplicación y, cuando la ley lo exija, te pediremos un nuevo consentimiento. Te recomendamos revisar esta página periódicamente.',

    contactTitle: '¿Dudas?',
    contactBody:
      "Escríbenos a info{'@'}teremu.com y te contestamos. Sin formularios interminables.",
    contactCta: 'Ir a contacto',
    termsCta: 'Ver términos del servicio',
  },

  en: {
    heroTitle: 'Privacy policy',
    heroSubtitle:
      'What we collect on teremu.com and in the Teremu app, why we process it, who we share it with, and how to exercise your rights.',
    updatedLabel: 'Last updated',
    updatedDate: 'October 25, 2026',

    summaryTitle: 'At a glance',
    summaryNote:
      'This summary is for orientation only and does not replace the full text below.',
    summary1: 'We do not sell or rent personal data, and we run no targeted advertising.',
    summary2: 'The site sets no first-party cookies. Analytics runs only if you accept it.',
    summary3:
      'We collect what you send us through a form, what you enter in the app to run your restaurant, and aggregate usage metrics.',
    summary4:
      'If you connect Gmail, your POS, or an external AI assistant, access is read-only and you can revoke it at any time.',
    summary5: 'You can ask us to access, correct, or delete your data at any time.',

    operatorTitle: 'Who is responsible for your data',
    controllerLabel: 'Data controller',
    controllerBody: "MTM CYA Corp · United States · info{'@'}teremu.com",
    operatorBody:
      'Teremu is a product built and operated by MTM CYA Corp, trading as MTM Cofounders & Associates (“MTM”), a company incorporated in the United States. MTM is the controller of the personal data described in this policy. “Teremu”, “we”, and “our” refer to that same entity.',
    groupTitle: 'Relationship with MTM and other group products',
    groupBody:
      'MTM builds and operates several of its own software products; Teremu is one of them. You can find the company at mtmcya.com. Because all of those products share a team, infrastructure, and internal support, administration, and billing functions, authorised MTM personnel may access data processed through Teremu for those purposes. That internal access is not a disclosure to a third party: it remains under MTM’s control and responsibility, with the same safeguards described here.',
    groupSeparate:
      'Each MTM product keeps its own site, its own privacy notice, and its own systems. We do not merge or cross-reference your profile between different products for commercial or advertising purposes.',

    scopeTitle: 'What this policy covers',
    scopeBody:
      'This policy applies to the teremu.com marketing site — the public pages, the blog, and the contact and demo forms — and to the Teremu application (app.teremu.com and the mobile apps), including the integrations you choose to connect from it. It is the only published version: the privacy-policy links inside the app lead to this same page. The rules for using the service are in the terms of service, which complement this document.',

    collectTitle: 'What we collect',
    collectIntro: 'We collect data in four situations, and no others:',
    collect1Title: 'When you submit a form',
    collect1Body:
      'The contact and demo-request forms collect your name, email address, and message. You may optionally add your restaurant name, a phone number, and your number of locations. We send that to our internal inbox and email you a confirmation. Please do not send sensitive data or third-party confidential information through these forms — they are not the right channel for it.',
    collect2Title: 'When you browse the site',
    collect2Body:
      'If you accept analytics, Google Analytics records aggregate usage data — page views, approximate origin, device type, time on page — so we can tell which content is useful. reCAPTCHA Enterprise analyses browser signals at the moment you submit a form to tell people from bots.',
    collect3Title: 'When you use the app',
    collect3Body:
      'When you create an account we store your name, email address, and sign-in credentials (managed by Firebase Authentication). To provide the service we process the data you enter about your restaurant: the location’s name and address, the invoices you scan or import and what they contain (supplier, line items, prices, dates), your recipe costings, menu, and inventory, the orders imported from your POS, and the names, emails, and roles of the team members you invite. Invoices may include your suppliers’ contact details; you decide what you upload and we process it on your behalf to provide the service.',
    collect4Title: 'Server logs',
    collect4Body:
      'Our hosting provider automatically logs requests to the site and the app (IP address, timestamp, resource requested, user agent). These are necessary to serve pages, diagnose incidents, and prevent abuse, and are kept for a short period.',
    collectNoneTitle: 'What we do not collect',
    collectNoneBody:
      'We build no advertising profiles, use no social-media pixels, buy no contact lists, and collect no special categories of data (health, beliefs, biometrics) through the site or the app.',

    integrationsTitle: 'Integrations and AI processing',
    integrationsIntro:
      'Inside the app you can turn on features that involve third parties. None is active until you connect it, all are read-only, and all can be disconnected from Settings. This is exactly what each one does:',

    gmailTitle: 'Importing invoices from Gmail',
    gmailBody:
      'If you connect your Gmail account, Teremu requests only Google’s read-only permission (gmail.readonly). With it, Teremu reads the last 31 days of mail once and, from then on, only new mail, to find supplier invoices. Documents it identifies as invoices enter the same review flow as a scanned invoice; everything else is discarded without being stored. Teremu never sends, modifies, labels, or deletes messages in your account.',
    gmailLimitedUse:
      'Teremu’s use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. That data is used only to extract invoices and show them to you; it is not used for advertising, it is not sold, and no human reads it except with your explicit permission, for security purposes, or where required by law.',
    gmailRevoke:
      'You can disconnect Gmail at any time from Settings or revoke access from the security settings of your Google account. Either way, we delete the access token. Invoices already imported are kept as part of your restaurant’s records, just like a scanned invoice, until you delete them.',

    aiTitle: 'AI processing',
    aiBody:
      'Three features use language models: invoice data extraction (the document’s image or text), menu and recipe suggestions, and the built-in kitchen assistant (your question together with the restaurant data needed to answer it). For that we send the information to model providers acting as processors on our behalf, whose terms prohibit using your data to train their models. Data derived from Gmail — any invoice imported from your connected inbox, whether read as text or as a page image — is processed only by Google (Gemini on Google Cloud Vertex AI, within our own Google Cloud project) and is never sent to any other AI provider.',
    aiEstimate:
      'Everything the AI returns is an estimate: the extracted amounts, units, and suppliers, and the pricing or recipe suggestions, are presented for you to review before you approve them. Nothing enters your records without your confirmation.',

    mcpTitle: 'External AI assistants',
    mcpBody:
      'The restaurant owner can connect Teremu to an external AI assistant — for example Claude or ChatGPT — through the MCP protocol. That assistant can then query the restaurant data the connecting user is allowed to see, and sends it to the assistant’s provider under that provider’s privacy policy, not ours. The connection is read-only: the assistant cannot create or change anything in Teremu.',
    mcpRevoke:
      'You can revoke the connection at any time from Settings. We log which tools each assistant queries so you can check what data it has read.',

    posTitle: 'Point of sale (POS)',
    posBody:
      'If you connect your POS — Square today — Teremu imports the sales recorded there to compute your revenue and set it against your costs. We change nothing in the POS. You can disconnect it from Settings; sales already imported are kept as part of your records.',

    billingTitle: 'Billing and payments',
    billingBody:
      'Payments are processed by Stripe. Teremu never sees or stores your card number: you enter it directly with Stripe. Stripe collects your billing address and, for European Union businesses, your VAT identification number, and uses them to compute the applicable sales tax or VAT. Prices are shown exclusive of tax. We keep invoice and payment history for as long as tax and accounting rules require.',

    basisTitle: 'Legal basis and purpose',
    basisIntro:
      'If you are in the EU, EEA, or UK, we process your data on the following GDPR bases:',
    basis1:
      'Forms: pre-contractual steps at your request (Art. 6(1)(b)) — we answer what you asked.',
    basis2:
      'Account, restaurant data, billing, and AI processing: performance of the contract (Art. 6(1)(b)) — it is the service you signed up for.',
    basis3:
      'Optional integrations (Gmail, POS, external assistants): your consent when you connect them (Art. 6(1)(a)) — withdraw it by disconnecting them.',
    basis4:
      'reCAPTCHA and server logs: legitimate interest (Art. 6(1)(f)) — keeping the service available and protecting our forms from automated abuse.',
    basis5:
      'Google Analytics: consent (Art. 6(1)(a)) — you can decline or withdraw without losing functionality.',
    basis6:
      'Keeping invoices and correspondence and responding to lawful requests: legal obligation and legitimate interest (Art. 6(1)(c) and 6(1)(f)).',
    basisNote:
      'We never sell personal data, do not rent it, and do not use it for third-party advertising.',
    basisWithdraw:
      'Where processing rests on your consent, you may withdraw it at any time: analytics from the “Cookie preferences” link in the footer, and integrations from Settings. Withdrawal does not affect the lawfulness of processing carried out beforehand.',

    sharingTitle: 'Who we share data with',
    sharingIntro:
      'We do not sell or rent your data. We rely on the following providers, who process it on our behalf and on our instructions:',
    sharing1:
      'Google Cloud and Firebase (Hosting, Cloud Functions, database, file storage, authentication, Analytics, reCAPTCHA Enterprise) — hosting of the site and the app, form processing, measurement, and abuse prevention.',
    sharing2:
      'Amazon Web Services (Simple Email Service), through MTM’s shared mail service — delivery of notification, confirmation, and digest emails.',
    sharing3:
      'Stripe — subscription payments, billing address, and tax calculation.',
    sharing4: 'Google Maps Platform — looking up your restaurant during account setup.',
    sharing5:
      'Google (Gemini on Vertex AI) — invoice data extraction, menu and recipe suggestions, and the kitchen assistant. Invoices imported from a connected Gmail inbox are processed only by Google.',
    sharing6:
      'MTM CYA Corp and its authorised personnel — support, administration, and commercial management, as described above.',
    sharingYourChoice:
      'The services you connect yourself — your Gmail account, your POS, or an external AI assistant — are not our processors: they are providers you chose, and they handle your data under their own policies. Choose carefully what you connect.',
    sharingOther:
      'We may also disclose data where strictly necessary to comply with a legal obligation or a valid request from a competent authority, to establish or defend legal claims, or in connection with a merger, acquisition, or corporate reorganisation — in which case we would tell you before your data became subject to a different policy.',
    sharingTransfer:
      'These providers may process data outside the EEA, principally in the United States. Google, Amazon Web Services, and Stripe rely on the European Commission’s Standard Contractual Clauses and on the EU-U.S. Data Privacy Framework for those transfers; with our other providers we sign equivalent clauses. MTM, as a U.S. entity, processes data in the United States under the same contractual safeguards.',

    cookiesTitle: 'Cookies and similar technologies',
    cookiesBody:
      'The site sets no first-party cookies. Google Analytics loads only if you accept the cookie notice — until then no measurement script runs and none of its cookies are set. Your choice is saved in your browser’s local storage, not a cookie, so we do not ask again; clearing the site’s data removes it. reCAPTCHA Enterprise loads only at the moment you submit a form and may set third-party cookies for bot detection; it is a strictly necessary security measure without which the forms cannot work. The app uses only the storage strictly necessary to keep you signed in.',
    cookiesControl:
      'You can change or withdraw your decision at any time from the “Cookie preferences” link in the footer, and block or delete cookies in your browser settings. The site keeps working, though forms may stop submitting if you block reCAPTCHA. We honour browser privacy-preference signals where applicable law requires it.',

    retentionTitle: 'How long we keep data',
    retentionIntro:
      'We keep each item only for as long as the purpose that justified it requires:',
    retention1:
      'Form messages: for as long as needed to handle your enquiry and any resulting business relationship, up to 24 months from last contact.',
    retention2:
      'Your account and restaurant data: while the account is active. After cancellation you can export it for 30 days; then we delete it.',
    retention3:
      'Access tokens for integrations (Gmail, POS, external assistants): deleted as soon as you disconnect the integration or revoke the permission with the provider.',
    retention4:
      'External-assistant query logs and mail discarded by the Gmail import: the log is kept for a limited period so you can audit it; discarded mail is never stored.',
    retention5: 'Google Analytics data: 14 months, in aggregate.',
    retention6:
      'Server logs: a short period, per our hosting provider’s standard configuration.',
    retentionNote:
      'Once those periods pass we delete or anonymise the information, unless a legal obligation — for instance keeping invoices for tax purposes — or the defence of a claim requires us to keep it longer.',

    rightsTitle: 'Your rights',
    rightsIntro:
      "You may at any time request access, rectification, erasure, restriction, portability, or object to processing, and withdraw consent. Email info{'@'}teremu.com and we will respond within 30 days. We may ask for additional information to verify your identity before acting on a request; we use it for that purpose only.",
    rightsFree:
      'Exercising these rights is free. We will not treat you differently or deny you any service for having done so.',
    rightsComplaint:
      'If you believe we have not handled your request properly, you may lodge a complaint with your national supervisory authority. In Spain that is the Agencia Española de Protección de Datos (aepd.es).',

    usRightsTitle: 'United States residents',
    usRightsBody:
      'If you live in California or another state with consumer privacy legislation, you also have the right to know, access, correct, and delete the personal information we hold about you, and not to be discriminated against for exercising those rights. You can exercise them through the same channel above and, if you prefer, through an authorised agent.',
    usRightsSale:
      'We do not sell personal information and do not share it for cross-context behavioural advertising, as the CCPA/CPRA and equivalent state laws define those terms. Nor do we process sensitive personal information to infer characteristics.',

    automatedTitle: 'Automated decision-making',
    automatedBody:
      'We make no decisions producing legal effects about you based solely on automated processing, and we do not profile you for that purpose. AI results are estimates that you review and approve, and a reCAPTCHA score only determines whether a request is accepted as legitimate; if a submission is blocked in error, write to us and we will handle it manually.',

    securityTitle: 'Security',
    securityBody:
      'The site and the app are served entirely over HTTPS. Service credentials live in Google Secret Manager and never appear in code. Tokens for the integrations you connect are stored encrypted and used only by the server. Access to restaurant data and to the inbox receiving form submissions is limited to authorised personnel. No system is infallible: if a breach occurred that posed a high risk to your rights, we would notify you and the competent authority within the deadlines the law sets.',

    minorsTitle: 'Minors',
    minorsBody:
      'Teremu is aimed at restaurant professionals and is not directed at anyone under 16. We do not knowingly collect data from minors. If we find we have received a minor’s data without the necessary authorisation, we will delete it; if you are a parent or guardian and believe this has happened, please write to us.',

    linksTitle: 'Links to third-party sites',
    linksBody:
      'This site may link to pages we do not control, including mtmcya.com and the sites of other MTM products. Each has its own privacy notice, and we are not responsible for their content or processing practices.',

    changesTitle: 'Changes to this policy',
    changesBody:
      'If we change this policy we will update the date shown above. Material changes will be announced prominently on the site or in the app and, where the law requires it, we will ask for fresh consent. We encourage you to review this page periodically.',

    contactTitle: 'Questions?',
    contactBody:
      "Email info{'@'}teremu.com and a human will reply. No endless forms.",
    contactCta: 'Go to contact',
    termsCta: 'Read the terms of service',
  },
}
