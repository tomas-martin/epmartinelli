export const COMPANY = {
  name: 'E.P. Martinelli',
  tagline: 'Básculas y Balanzas',
  email: 'epmartinelli@gmail.com',
  phone: '2613463459',
  location: 'Mendoza, Argentina',
  copyright: 'E.P. Martinelli',
} as const;

export const NAV_LINKS = [
  { label: 'Nosotros',        href: '/#nosotros' },
  { label: 'Nuestros Servicios', href: '/#servicios' },
  { label: 'Productos',       href: '/productos' },
  { label: 'Contacto',        href: '/#contacto' },
] as const;

export interface Service {
  title: string;
  description: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    title: 'ASESORAMIENTO Y VENTA',
    description:
      'Ofrecemos una amplia variedad de productos para satisfacer las necesidades de cada cliente. Contamos con balanzas de precisión para laboratorio, básculas y balanzas comerciales e industriales en todas sus capacidades. Garantía y servicio post venta.',
    image: '/assets/images/propias/asesoramiento.jpg',
  },
  {
    title: 'SERVICIO TÉCNICO Y MANTENIMIENTO',
    description:
      'Contamos con personal capacitado para brindar soluciones rápidas, presenciales y de calidad. Ofrecemos historial y trazabilidad de los servicios brindados en cada equipo.',
    image: '/assets/images/propias/soporte_tecnico.png',
  },
  {
    title: 'CALIBRACIONES Y CERTIFICACIONES',
    description:
      'Realizamos la calibración de todo tipo de balanzas y sistemas de pesaje con pesos patrón certificados por organismos legales INTI y acreditados en OAA para normas de calidad. Contamos con Verificaciones INTI.',
    image: '/assets/images/propias/calibrar.jpg',
  },
  {
    title: 'PROGRAMAS DE MANTENIMIENTO',
    description:
      'Ofrecemos planes de mantenimiento preventivo y correctivo acorde a las necesidades de cada empresa.',
    image: '/assets/images/propias/mantenimiento.jpg',
  },
  {
    title: 'INSUMOS INDUSTRIALES',
    description: 'Somos proveedores de insumos industriales.',
    image: '/assets/images/propias/insumos.jpg',
  },
];

export interface Product {
  id: string;
  number: string;
  title: string;
  description: string;
  items: string[];
  highlight?: boolean;
  cta: string;
  href: string;
  icon: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'industriales',
    number: '01',
    title: 'Balanzas industriales',
    description:
      'Soluciones para procesos productivos y aplicaciones industriales de distintas capacidades.',
    items: ['Distintas capacidades', 'Aplicaciones industriales', 'Asesoramiento y servicio técnico'],
    cta: 'Consultar por este equipo',
    href: 'https://wa.me/2613463459?text=Hola,%20quisiera%20consultar%20sobre%20Balanzas%20Industriales',
    icon: 'bi-truck',
  },
  {
    id: 'precision',
    number: '02',
    title: 'Balanzas de precisión',
    description:
      'Equipos orientados a aplicaciones que requieren mayor precisión y control de resultados.',
    items: ['Aplicaciones de precisión', 'Control de resultados', 'Calibración y certificación'],
    cta: 'Consultar por este equipo',
    href: 'https://wa.me/2613463459?text=Hola,%20quisiera%20consultar%20sobre%20Balanzas%20de%20Precisión',
    icon: 'bi-sliders',
  },
  {
    id: 'sistemas',
    number: '03',
    title: 'Plataformas y sistemas de pesaje',
    description:
      'Alternativas para integrar el pesaje a diferentes puestos y procesos de trabajo.',
    items: ['Plataformas de pesaje', 'Sistemas para procesos', 'Integración y soporte técnico'],
    cta: 'Consultar por este equipo',
    href: 'https://wa.me/2613463459?text=Hola,%20quisiera%20consultar%20sobre%20Plataformas%20y%20Sistemas%20de%20Pesaje',
    icon: 'bi-layers',
  },
  {
    id: 'accesorios',
    number: '04',
    title: 'Indicadores y accesorios',
    description:
      'Componentes y accesorios para complementar, actualizar o mantener sistemas de pesaje.',
    items: ['Indicadores digital', 'Componentes de repuesto', 'Accesorios para pesaje'],
    cta: 'Consultar por este equipo',
    href: 'https://wa.me/2613463459?text=Hola,%20quisiera%20consultar%20sobre%20Indicadores%20y%20Accesorios',
    icon: 'bi-display',
  },
  {
    id: 'insumos',
    number: '05',
    title: 'Insumos para pesaje',
    description: 'Insumos y elementos de apoyo para el funcionamiento cotidiano de los equipos.',
    items: ['Insumos industriales', 'Elementos de mantenimiento', 'Asesoramiento técnico'],
    cta: 'Consultar por este equipo',
    href: 'https://wa.me/2613463459?text=Hola,%20quisiera%20consultar%20sobre%20Insumos%20para%20Pesaje',
    icon: 'bi-box-seam',
  },
  {
    id: 'consulta',
    number: '06',
    title: '¿Buscás un equipo específico?',
    description:
      'Contanos qué necesitás y te asesoramos para encontrar una solución adecuada a tu aplicación.',
    items: ['Asesoramiento personalizado', 'Venta y reparación', 'Servicio técnico especializado'],
    highlight: true,
    cta: 'Asesoramiento personalizado',
    href: 'https://wa.me/2613463459?text=Hola,%20busco%20un%20equipo%20específico%20y%20necesito%20asesoramiento',
    icon: 'bi-headset',
  },
];

export const FAQ = [
  {
    id: 'faq1',
    question: '¿Qué es calibrar un equipo?',
    answer:
      'La calibración consiste en la realización de una serie de ensayos en los que se compara el valor de una referencia patrón con el valor proporcionado por el instrumento de pesaje. Estas comparaciones permiten obtener los errores o diferencias que el instrumento registra. Si los errores son superiores a los permitidos, será necesario ajustar el instrumento de pesaje y comenzar una nueva calibración.',
  },
  {
    id: 'faq2',
    question: '¿Por qué es importante calibrar un equipo?',
    answer:
      'Es importante calibrar para establecer con exactitud que los resultados que arroja un instrumento de medida sean los mismos que la magnitud que se mide con él. La calibración permite identificar a los equipos que tienen que ser reemplazados por deterioro, por desgaste o estrés mecánico. Permite mejorar los procesos de pesaje si se interpretan adecuadamente los resultados de calibración según las tolerancias definidas, y ayuda a superar las auditorías internas y externas que tienen lugar periódicamente.',
  },
];

export const GALLERY_IMAGES = [
  '/assets/images/propias/wsp2.jpg',
  '/assets/images/propias/trabajo4.jpg',
  '/assets/images/propias/trabajo2.jpg',
  '/assets/images/propias/trabajo1.jpg',
];
