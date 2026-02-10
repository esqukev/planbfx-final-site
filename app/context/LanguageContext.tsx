'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Lang = 'en' | 'es';

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.langToEs': 'Español',
    'nav.langToEn': 'English',
    'home.craftingTitle': 'Crafting Immersive Visual Experiences',
    'home.craftingDesc': 'We create immersive, tailored visuals that push the boundaries of your vision. From concept to execution, we merge creativity, interaction, and technology to build unique visual experiences that engage, evolve, and resonate beyond the screen.',
    'home.learnMore': 'Learn More',
    'home.parallaxTitle': "We don't just create visuals — we craft moments that move",
    'home.parallaxSubtitle': 'Where art becomes experiences',
    'home.artInMotion': 'Art In Motion',
    'home.bookCall': 'BOOK YOUR CALL NOW',
    'home.letsCreate': "Let's Create",
    'home.something': 'Something',
    'home.different': 'Different',
    'home.idea': "Do you have an idea? Let's talk",
    'home.contactUs': 'Contact us',
    'home.videoLine1': 'INTERACTIVE ART',
    'home.videoLine2': '[PLANBFX]',
    'home.videoLine3': 'FOR YOUR SPACES',
    'home.ctaBannerSubtitle': 'Crafting Moments',
    'home.ctaBannerTitle1': 'Innovative Art',
    'home.ctaBannerTitle2': 'Meets Technology',
    'home.ctaBannerParagraph': 'Welcome to PlanB FX, where creativity and technology converge. We breathe life into events through interactive art, smart coding, and AI-driven experiences. Let us elevate your vision into a captivating reality.',
    'home.ctaBannerExplore': 'Explore services',
    'home.ctaBannerTouch': 'Get in touch',
    'about.whoWeAre': 'Who we are',
    'about.title': 'About Plan B FX',
    'about.intro1': 'Plan B began as a collective of local musicians driven by the goal of energizing the scene and elevating the standards of their own events.',
    'about.intro2': 'During this process, we incorporated code-based visual development into our workflow, allowing us to expand our services and provide immersive, memorable experiences for diverse events.',
    'about.closing': 'We have partnered with local promoters such as 3AM, Soulful Gathering, Xtyle, and Microgarden, providing visual support for world-class artists like Adam Beyer, Anfisa Letyago and Donnie Cosmo, alongside key local talent.',
    'about.ctaSubtitle': 'CUSTOM EXPERIENCES',
    'footer.tagline': 'Art Comes First. We shape distinctive success stories with breakthrough ideas and creative mastery.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'cta.defaultTitle': 'Transforming Events with\nDigital Brilliance',
    'cta.defaultParagraph': 'Connect with us to elevate your event. Our unique blend of art, technology, and creativity brings a stunning visual experience to every occasion. Discover how we can transform your vision into reality.',
    'cta.getInTouch': 'Get in touch',
    'cta.exploreArt': 'Explore Our Art',
    'services.ctaSubtitle': 'Innovate Your Experience',
    'services.ctaTitle': 'Art and technology unite at PlanB FX',
    'services.ctaParagraph': "Discover how we blend creativity with technology to create stunning interactive art. Explore our imaginative solutions designed for events that leave a lasting impression. Experience art like never before.",
    'services.letsTalk': "Let's talk",
    'services.preview': 'Preview',
    'services.livePainting.title': 'Live Painting',
    'services.livePainting.desc': "A real-time fusion of human touch and AI. Using precision digital tools, we transform live illustrations into dynamic visual streams, crafting an organic piece of art that evolves before the audience's eyes.",
    'services.artificialMirage.title': 'Artificial Mirage',
    'services.artificialMirage.desc': "Reality as an infinite canvas. We transform live video feeds into any imaginable concept, from familiar characters to abstract scenes. Here, the limit isn't the technology, but your imagination; we turn the environment and its subjects into a surreal, real-time visual experience.",
    'services.audioReactive.title': 'Audio Reactive Art',
    'services.audioReactive.desc': 'Visuals that breathe to the beat. We develop graphic environments that respond with absolute precision to every frequency and pulse, achieving a perfect synchronicity where music becomes visible.',
    'services.interactiveBranding.title': 'Interactive Branding / Advertising',
    'services.interactiveBranding.desc': 'Dynamic text overlays and generative typography that react live to the environment, creating a smart, customized visual narrative for every brand.',
    'services.logoWaterfall.title': 'Logo Waterfall',
    'services.logoWaterfall.desc': "A dynamic flow of brand identity. We leverage GPU power to create waterfalls composed of logos that react organically to the audience's movement via optical sensors. An elegant and playful way to embed branding into the audience's memory.",
    'services.projectionMapping.title': 'Projection Mapping + Visual Control Performance',
    'services.projectionMapping.desc': 'Surface intervention and live visual direction. We alter the perception of physical space through precision mapping, guided by a real-time visual performance that ensures a cohesive, high-impact atmosphere.',
    'services.customizedExperience.title': 'Customized Experience',
    'services.customizedExperience.desc': 'Tailored Experiences. We collaborate closely with our clients to design and develop exclusive interactive installations and visual solutions, specifically adapted to the identity and needs of each project.',
    'contact.title': 'Want to work with us?',
    'contact.subtitle': "Let's turn ideas into impact.",
    'contact.intro': "Whether you have a clear vision or just a spark, we're here to help shape it. Reach out and let's create something that actually stands out.",
    'contact.getInContact': 'Get in contact.',
    'contact.readyTitle': 'Ready to move forward?',
    'contact.readyDesc1': 'This form is designed for clients who already have a clear vision, goals, and references. The more detail you provide, the faster and more accurately we can move forward.',
    'contact.readyDesc2': 'Book a meeting and walk us through your ideas and expectations.',
    'contact.name': 'Name',
    'contact.company': 'Company or event name',
    'contact.city': 'City',
    'contact.country': 'Country',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email',
    'contact.details': 'Details',
    'contact.detailsHint': 'If not enough details are provided we could not consider your inquiry',
    'contact.send': 'Send',
    'contact.faqTitle': 'Frequently Asked Questions',
    'contact.faqSubtitle': 'Your questions answered simply and clearly.',
    'contact.modalErrorsTitle': 'Please check the form',
    'contact.modalErrorsIntro': 'Please fix the following:',
    'contact.modalSuccessTitle': 'Message sent',
    'contact.modalSuccessMessage': "Thank you. We'll get back to you soon.",
    'contact.modalClose': 'Close',
    'contact.faq1q': 'Where are you based?',
    'contact.faq1a': 'Headquartered in San José, Costa Rica, we bring our visual expertise to every corner of the country with forward planning. Contact us to learn more about our availability and reach.',
    'contact.faq2q': 'What kind of events do you work with?',
    'contact.faq2a': 'We work with a wide range of events including festivals, concerts, corporate events, brand activations, art installations, and private parties. Our visual experiences are tailored to each occasion.',
    'contact.faq3q': 'How far in advance should I book?',
    'contact.faq3a': 'We recommend reaching out at least 4–8 weeks before your event to allow time for concept development and technical setup. For larger or custom projects, earlier is better.',
    'contact.faq4q': 'Do you provide equipment or do we need to supply it?',
    'contact.faq4a': 'We can work with your existing setup or provide recommendations. Depending on the project, we can handle projection, screens, and technical integration—just ask when you get in touch.',
    'contact.faq5q': 'What information do you need to get started?',
    'contact.faq5a': 'Share your event date, venue, vision, and any references or mood boards. The more detail you provide in the form, the faster we can propose a tailored solution.',
    'about.weCreatePrefix': 'WE CREATE ',
    'about.rotatingWord1': 'ART',
    'about.rotatingWord2': 'EXPERIENCE',
    'about.rotatingWord3': 'INNOVATION',
    'about.rotatingWord4': 'TECHNOLOGY',
    'about.rotatingWord5': 'INTERACTION',
    'about.rotatingWord6': 'MEMORIES',
    'works.step1subtitle': 'Meeting & Vision',
    'works.step1code': 'ALIGN',
    'works.step1desc': 'We meet to capture your goals. From the first call, we align our vision to ensure every step builds toward the same outcome.',
    'works.step2subtitle': 'Product Selection',
    'works.step2code': 'CURATE',
    'works.step2desc': "We pinpoint the ideal technical and artistic solution for your needs, selecting the tools that will maximize your event's impact.",
    'works.step3subtitle': 'Pre-Production & Testing',
    'works.step3code': 'ARCHITECT',
    'works.step3desc': 'Asset management, development, and technical testing. We prepare every digital detail to guarantee a flawless execution.',
    'works.step4subtitle': 'Production & Launch',
    'works.step4code': 'EXECUTE',
    'works.step4desc': 'Deployment and live execution. We take control of the visuals live to breathe life into the event, powering the experience in real-time to ensure a high-impact atmosphere that lingers with the audience.',
    'works.subtitle': 'Discover the process behind our work — from brief to delivery.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.langToEs': 'Español',
    'nav.langToEn': 'English',
    'home.craftingTitle': 'Creando experiencias visuales inmersivas',
    'home.craftingDesc': 'Creamos visuales inmersivos y a medida que expanden los límites de tu visión. Del concepto a la ejecución, fusionamos creatividad, interacción y tecnología para construir experiencias visuales únicas que conectan, evolucionan y resuenan más allá de la pantalla.',
    'home.learnMore': 'Saber más',
    'home.parallaxTitle': 'No solo creamos visuales: creamos momentos que conmueven',
    'home.parallaxSubtitle': 'Donde el arte se convierte en experiencias',
    'home.artInMotion': 'Arte en movimiento',
    'home.bookCall': 'RESERVA TU LLAMADA',
    'home.letsCreate': 'Creemos',
    'home.something': 'algo',
    'home.different': 'diferente',
    'home.idea': '¿Tienes una idea? Hablemos',
    'home.contactUs': 'Contáctanos',
    'home.videoLine1': 'ARTE INTERACTIVO',
    'home.videoLine2': '[PLANBFX]',
    'home.videoLine3': 'PARA TUS ESPACIOS',
    'home.ctaBannerSubtitle': 'Creando momentos',
    'home.ctaBannerTitle1': 'Arte innovador',
    'home.ctaBannerTitle2': 'y tecnología',
    'home.ctaBannerParagraph': 'Bienvenido a PlanB FX, donde convergen creatividad y tecnología. Damos vida a los eventos con arte interactivo, código inteligente y experiencias impulsadas por IA. Elevamos tu visión a una realidad cautivadora.',
    'home.ctaBannerExplore': 'Explorar servicios',
    'home.ctaBannerTouch': 'Contáctanos',
    'about.whoWeAre': 'Quiénes somos',
    'about.title': 'Sobre Plan B FX',
    'about.intro1': 'Plan B comenzó como un colectivo de músicos locales con el objetivo de energizar la escena y elevar el nivel de sus propios eventos.',
    'about.intro2': 'En el proceso, incorporamos el desarrollo visual basado en código a nuestro flujo, lo que nos permitió ampliar nuestros servicios y ofrecer experiencias inmersivas y memorables para todo tipo de eventos.',
    'about.closing': 'Hemos trabajado con promotores locales como 3AM, Soulful Gathering, Xtyle y Microgarden, brindando soporte visual a artistas de talla mundial como Adam Beyer, Anfisa Letyago y Donnie Cosmo, junto con talento local clave.',
    'about.ctaSubtitle': 'EXPERIENCIAS A MEDIDA',
    'footer.tagline': 'El arte primero. Creamos historias de éxito distintivas con ideas rompedoras y maestría creativa.',
    'footer.quickLinks': 'Enlaces',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',
    'cta.defaultTitle': 'Transformando eventos con\nbrillo digital',
    'cta.defaultParagraph': 'Conéctate con nosotros para elevar tu evento. Nuestra mezcla de arte, tecnología y creatividad aporta una experiencia visual impactante en cada ocasión. Descubre cómo podemos transformar tu visión en realidad.',
    'cta.getInTouch': 'Contáctanos',
    'cta.exploreArt': 'Explora nuestro arte',
    'services.ctaSubtitle': 'Innovar tu experiencia',
    'services.ctaTitle': 'Arte y tecnología unidos en PlanB FX',
    'services.ctaParagraph': 'Descubre cómo combinamos creatividad y tecnología para crear arte interactivo impactante. Soluciones imaginativas para eventos que dejan huella. Vive el arte como nunca.',
    'services.letsTalk': 'Hablemos',
    'services.preview': 'Vista previa',
    'services.livePainting.title': 'Pintura en vivo',
    'services.livePainting.desc': 'Fusión en tiempo real de mano humana e IA. Con herramientas digitales de precisión, convertimos ilustraciones en vivo en flujos visuales dinámicos, creando una pieza orgánica que evoluciona ante el público.',
    'services.artificialMirage.title': 'Espejismo artificial',
    'services.artificialMirage.desc': 'La realidad como lienzo infinito. Transformamos video en vivo en cualquier concepto imaginable, de personajes reconocibles a escenas abstractas. El límite no es la tecnología sino tu imaginación; convertimos el entorno y sus sujetos en una experiencia visual surreal en tiempo real.',
    'services.audioReactive.title': 'Arte audio reactivo',
    'services.audioReactive.desc': 'Visuales que respiran al ritmo. Desarrollamos entornos gráficos que responden con precisión a cada frecuencia y pulso, logrando una sincronía perfecta donde la música se hace visible.',
    'services.interactiveBranding.title': 'Branding / publicidad interactiva',
    'services.interactiveBranding.desc': 'Overlays de texto dinámicos y tipografía generativa que reaccionan en vivo al entorno, creando una narrativa visual inteligente y a medida para cada marca.',
    'services.logoWaterfall.title': 'Cascada de logos',
    'services.logoWaterfall.desc': 'Un flujo dinámico de identidad de marca. Aprovechamos la GPU para crear cascadas de logos que reaccionan al movimiento del público con sensores ópticos. Una forma elegante y lúdica de fijar la marca en la memoria del público.',
    'services.projectionMapping.title': 'Projection mapping + dirección visual en vivo',
    'services.projectionMapping.desc': 'Intervención de superficies y dirección visual en vivo. Alteramos la percepción del espacio físico con mapeo de precisión y una performance visual en tiempo real para una atmósfera cohesionada y de alto impacto.',
    'services.customizedExperience.title': 'Experiencia a medida',
    'services.customizedExperience.desc': 'Experiencias a medida. Colaboramos con nuestros clientes para diseñar e implementar instalaciones interactivas y soluciones visuales exclusivas, adaptadas a la identidad y necesidades de cada proyecto.',
    'contact.title': '¿Quieres trabajar con nosotros?',
    'contact.subtitle': 'Convirtamos ideas en impacto.',
    'contact.intro': 'Tengas una visión clara o solo una chispa, estamos aquí para darle forma. Escríbenos y creemos algo que realmente destaque.',
    'contact.getInContact': 'Ponte en contacto.',
    'contact.readyTitle': '¿Listo para avanzar?',
    'contact.readyDesc1': 'Este formulario está pensado para clientes que ya tienen una visión, objetivos y referencias claras. Cuantos más detalles nos des, más rápido y mejor podremos avanzar.',
    'contact.readyDesc2': 'Reserva una reunión y cuéntanos tus ideas y expectativas.',
    'contact.name': 'Nombre',
    'contact.company': 'Empresa o nombre del evento',
    'contact.city': 'Ciudad',
    'contact.country': 'País',
    'contact.phone': 'Teléfono',
    'contact.email': 'Correo electrónico',
    'contact.details': 'Detalles',
    'contact.detailsHint': 'Si no se proporcionan suficientes detalles no podremos considerar tu consulta',
    'contact.send': 'Enviar',
    'contact.faqTitle': 'Preguntas frecuentes',
    'contact.faqSubtitle': 'Tus dudas resueltas de forma clara.',
    'contact.modalErrorsTitle': 'Revisa el formulario',
    'contact.modalErrorsIntro': 'Por favor corrige lo siguiente:',
    'contact.modalSuccessTitle': 'Mensaje enviado',
    'contact.modalSuccessMessage': 'Gracias. Te responderemos pronto.',
    'contact.modalClose': 'Cerrar',
    'contact.faq1q': '¿Dónde están ubicados?',
    'contact.faq1a': 'Con sede en San José, Costa Rica, llevamos nuestra experiencia visual a todo el país con planificación previa. Contáctanos para conocer disponibilidad y alcance.',
    'contact.faq2q': '¿Con qué tipo de eventos trabajan?',
    'contact.faq2a': 'Trabajamos con una amplia gama de eventos: festivales, conciertos, eventos corporativos, activaciones de marca, instalaciones artísticas y fiestas privadas. Nuestras experiencias visuales se adaptan a cada ocasión.',
    'contact.faq3q': '¿Con cuánta anticipación debo reservar?',
    'contact.faq3a': 'Recomendamos contactarnos al menos 4–8 semanas antes del evento para dar tiempo al desarrollo del concepto y la configuración técnica. Para proyectos más grandes o a medida, cuanto antes mejor.',
    'contact.faq4q': '¿Proveen equipo o debemos suministrarlo?',
    'contact.faq4a': 'Podemos trabajar con tu equipo existente o dar recomendaciones. Según el proyecto, manejamos proyección, pantallas e integración técnica; solo pregunta al contactarnos.',
    'contact.faq5q': '¿Qué información necesitan para empezar?',
    'contact.faq5a': 'Comparte la fecha del evento, el lugar, tu visión y referencias o mood boards. Cuantos más detalles des en el formulario, más rápido podremos proponer una solución a medida.',
    'about.weCreatePrefix': 'CREAMOS ',
    'about.rotatingWord1': 'ARTE',
    'about.rotatingWord2': 'EXPERIENCIA',
    'about.rotatingWord3': 'INNOVACIÓN',
    'about.rotatingWord4': 'TECNOLOGÍA',
    'about.rotatingWord5': 'INTERACCIÓN',
    'about.rotatingWord6': 'RECUERDOS',
    'works.step1subtitle': 'Reunión y visión',
    'works.step1code': 'ALIGN',
    'works.step1desc': 'Nos reunimos para capturar tus objetivos. Desde la primera llamada alineamos nuestra visión para que cada paso construya hacia el mismo resultado.',
    'works.step2subtitle': 'Selección de producto',
    'works.step2code': 'CURATE',
    'works.step2desc': 'Definimos la solución técnica y artística ideal para tus necesidades y seleccionamos las herramientas que maximizarán el impacto de tu evento.',
    'works.step3subtitle': 'Preproducción y pruebas',
    'works.step3code': 'ARCHITECT',
    'works.step3desc': 'Gestión de assets, desarrollo y pruebas técnicas. Preparamos cada detalle digital para garantizar una ejecución impecable.',
    'works.step4subtitle': 'Producción y lanzamiento',
    'works.step4code': 'EXECUTE',
    'works.step4desc': 'Despliegue y ejecución en vivo. Tomamos el control de los visuales en vivo para dar vida al evento y potenciar la experiencia en tiempo real y una atmósfera de alto impacto que perdure en el público.',
    'works.subtitle': 'Descubre el proceso detrás de nuestro trabajo — del brief a la entrega.',
  },
};

const defaultLang: Lang = 'en';

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'planbfx-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === 'en' || stored === 'es') setLangState(stored);
    } catch (_) {}
    setMounted(true);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      if (typeof document !== 'undefined') document.documentElement.lang = next === 'es' ? 'es' : 'en';
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }, [mounted, lang]);

  const t = useCallback(
    (key: string) => {
      const map = translations[lang];
      return map[key] ?? translations.en[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: 'en',
      setLang: () => {},
      t: (k: string) => translations.en[k] ?? k,
    };
  }
  return ctx;
}
