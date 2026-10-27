import { Recipe, TriviaQuestion, AlliedRestaurant } from '@/types';

export const SITE_CONFIG = {
  name: "Del valle a la mesa, de la mesa a las estrellas",
  shortName: "Valle a las Estrellas",
  tagline: "Experiencia Gastronómica & Astroturismo en el Valle del Elqui, Chile",
  description: "Encuentro culinario de campo al atardecer, cata de ingredientes ancestrales elquinos y cena en 4 tiempos maridada bajo el cielo nocturno más limpio del planeta.",
  url: "https://vallealastrellas.vercel.app",
  location: {
    address: "Camino a Montegrande Km 14, Valle del Elqui",
    commune: "Paihuano / Vicuña",
    region: "Región de Coquimbo, Chile",
    coordinates: {
      lat: -30.0319,
      lng: -70.7081,
    },
    googleMapsUrl: "https://maps.google.com/?q=-30.0319,-70.7081",
  },
  // DATOS CENTRALIZADOS DE DEMOSTRACIÓN (Modificar fácilmente para producción)
  demo: {
    phone: "+56 9 8765 4321",
    phoneDisplay: "+56 9 8765 4321",
    email: "experiencia@vallealasestrellas.cl",
    whatsappNumber: "56987654321",
    disclaimer: "Nota: Teléfono, correo y nombres de alianzas son datos de demostración en vivo.",
  },
  experience: {
    startTime: "17:00",
    endTime: "21:00",
    durationHours: 4,
    maxDailyCapacity: 12,
    basePriceCLP: 68000,
    discountPercentage: 15,
    discountCouponDefault: "VALLE15",
  },
};

export const TIMELINE_MILESTONES = [
  {
    time: "17:00",
    title: "Recepción & Brindis Dorado al Atardecer",
    subtitle: "Terraza de campo frente a los parronales",
    description: "Llegada al atardecer cuando el sol tiñe los cerros de color cobre. Bienvenida con pisco sour de autor aromatizado con miel de chañar y bocados tibios de queso de cabra asado con orégano silvestre.",
    details: [
      "Cóctel de autor con pisco elquino D.O.",
      "Aperitivo de bienvenida de pastoreo libre",
      "Vista panorámica al Valle de Paihuano",
    ],
    icon: "Sun",
  },
  {
    time: "18:00",
    title: "Taller Sensorial de los Frutos del Valle",
    subtitle: "Huerto botánico y saberes campesinos",
    description: "Caminata sensorial entre papayos centenarios y algarrobos. Cata guiada a ciegas de aceites de oliva de quebrada, reducción de chañar recolectado a mano y mistelas añejadas en barricas de roble.",
    details: [
      "Interpretación botánica de flora cordillerana",
      "Cata interactiva de papaya confitada y rica-rica",
      "Diálogo con crianceros y agricultores locales",
    ],
    icon: "Leaf",
  },
  {
    time: "19:30",
    title: "Banquete Campestre al Crepúsculo",
    subtitle: "Cocina a la leña y maridaje en 4 tiempos",
    description: "Cena íntima a fuego vivo bajo las primeras sombras de la noche. Menú degustación inspirado en la cosmovisión diaguita, con maridaje de vinos de altura y destilados de doble destilación.",
    details: [
      "Menú degustación en 4 tiempos de autor",
      "Opciones adaptadas para alérgicos y diabéticos",
      "Iluminación tenue con velas de cera de abeja nativa",
    ],
    icon: "UtensilsCrossed",
  },
  {
    time: "20:30",
    title: "Bautismo de Estrellas & Astroturismo",
    subtitle: "Cielo astronómico más despejado del hemisferio sur",
    description: "El valle se sumerge en la oscuridad más pura. Con la guía de astrónomos locales y telescopios de alta apertura, exploramos nebulosas, cúmulos estelares y el relato místico de las constelaciones indígenas.",
    details: [
      "Observación con telescopio computarizado de 12 pulgadas",
      "Puntero láser astronómico y lectura de cielo profundo",
      "Infusión caliente de hierbas medicinales de montaña",
    ],
    icon: "Sparkles",
  },
];

export const PRODUCTS_SHOWCASE = [
  {
    id: "papaya-chanar",
    title: "Papaya Elquina & Miel de Chañar",
    category: "Frutos Ancestrales",
    badge: "Identidad Elquina",
    description: "Fruto dorado emblemático del Valle del Elqui confitado artesanalmente a fuego lento en pailas de cobre martillado, acompañado de miel silvestre de chañar cosechada en los oasis precordilleranos.",
    sensoryNotes: "Dulzor cítrico punzante, notas de madera tostada y final aterciopelado con dejos de caramelo quemado.",
    producer: "Agricultores Tradicionales de Paihuano",
    pairing: "Mistela de uva Pedro Jiménez o helado artesanal de rica-rica.",
    imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    subtitlesText: "Resumen: Papaya confitada en pailas de cobre con miel de chañar cosechada a mano. Sabor cítrico dulce y tostado.",
  },
  {
    id: "queso-cabra",
    title: "Queso de Cabra Curado con Hierbas",
    category: "Quesería de Quebrada",
    badge: "Pastoreo Libre",
    description: "Elaborado con leche cruda fresca de cabras criollas alimentadas con pastizales de alta cordillera. Curado durante 60 días sobre esteras de carrizo y frotado con rica-rica y romero del Elqui.",
    sensoryNotes: "Textura cremosa y quebradiza, acidez láctica equilibrada, retrogusto mineral y notas de hierba silvestre.",
    producer: "Familia Criancera de Quebrada de Paihuano",
    pairing: "Pisco transparente moscatel de 40° o vino Syrah elquino de ladera.",
    imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80",
    subtitlesText: "Resumen: Queso de cabra de pastoreo cordillerano, madurado 60 días con hierbas silvestres rica-rica y romero.",
  },
  {
    id: "pisco-autor",
    title: "Pisco D.O. de Autor & Hierbas Silvestres",
    category: "Destilado de Altura",
    badge: "D.O. Valle del Elqui",
    description: "Destilado en alambiques discontinuos de cobre a partir de uvas moscatel de Alejandría y rosada cosechadas en terrazas a más de 1.800 metros de altitud, con maceración botánica de altura.",
    sensoryNotes: "Aroma exuberante a jazmín y cáscara de naranja confitada, paso redondo en boca y persistencia sedosa.",
    producer: "Destilería Boutique de Alcohuaz",
    pairing: "Cacao amargo chileno, higos secos al sol y postres de frutas andinas.",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    subtitlesText: "Resumen: Pisco artesanal destilado en alambiques de cobre con uvas moscatel de terrazas altas y botánicos cordilleranos.",
  },
];

export const ALLIED_RESTAURANTS: AlliedRestaurant[] = [
  {
    id: "rest-1",
    name: "Fogón Solar & Tierra",
    locality: "Vicuña Centro",
    specialty: "Cocina 100% solar y panes en hornos de adobe",
    description: "Pioneros en aprovechar los 300 días de sol para cocinar a fuego limpio guisados campesinos y pastelería tradicional.",
    isDemo: true,
  },
  {
    id: "rest-2",
    name: "La Casona de Paihuano",
    locality: "Paihuano",
    specialty: "Carnes al jugo al pisco añejado y charqui artesanal",
    description: "Comedor histórico rodeado de parras viejas donde la hospitalidad elquina revive recetas de principios de siglo.",
    isDemo: true,
  },
  {
    id: "rest-3",
    name: "Terraza Cósmica Alcohuaz",
    locality: "Alcohuaz / Pisco Elqui",
    specialty: "Maridajes astronómicos y tapas cordilleranas",
    description: "Un mirador privilegiado sobre el cañón del río Claro con vistas directas a la Vía Láctea y carta de vinos boutique.",
    isDemo: true,
  },
  {
    id: "rest-4",
    name: "Rincón Diaguita & Sabores",
    locality: "Montegrande",
    specialty: "Preparaciones con harinas tostadas, zapallo de guarda y miel",
    description: "Homenaje a los pueblos originarios con vajilla de greda cocida y productos recolectados en quebradas secas.",
    isDemo: true,
  },
];

export const RECIPES_DATA: Recipe[] = [
  {
    id: "tartaleta-papaya-chanar",
    title: "Tartaleta Tibia de Papayas Elquinas y Miel de Chañar",
    subtitle: "Con crema sedosa aromatizada a la rica-rica de cordillera",
    heroProduct: "Papaya Elquina & Miel de Chañar",
    prepTime: "45 minutos",
    servings: "6 porciones",
    difficulty: "Media",
    description: "Un postre que equilibra la acidez chispeante de la papaya del Elqui con la profundidad acaramelada del jarabe de chañar y el aroma resinoso de la hierba rica-rica.",
    ingredients: [
      "500g de papayas confitadas en almíbar liviano cortadas en láminas finas",
      "4 cucharadas de miel pura de chañar artesanal de Paihuano",
      "250g de masa quebrada dulce horneada a blanco",
      "200ml de crema de leche fresca para batir",
      "1 cucharadita de hojas secas de rica-rica trituradas en mortero",
      "2 yemas de huevo de campo",
      "30g de azúcar rubia para gratinar",
    ],
    steps: [
      "Infundir la crema de leche con las hojas de rica-rica a fuego bajo durante 10 minutos sin que hierva. Colar y enfriar.",
      "Mezclar la crema perfumada con las yemas y 2 cucharadas de miel de chañar hasta lograr un batido homogéneo.",
      "Disponer las láminas de papaya en espiral concéntrico sobre la base de masa quebrada precocida.",
      "Verter suavemente la crema de rica-rica entre las papayas.",
      "Hornear a 170°C durante 20 minutos hasta que el relleno cuaje suavemente.",
      "Pintar la superficie con el resto de la miel de chañar tibia antes de servir templada.",
    ],
    pairing: "Copa de Pisco Sour de Chañar o Mistela elquina bien fría.",
    chefNote: "Para potenciar el perfume, calienta apenas la miel de chañar antes de glasear la tartaleta.",
    imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "queso-cabra-plancha",
    title: "Queso de Cabra Elquino Sellado con Reducción de Mistela",
    subtitle: "Acompañado de nueces doradas y hojas de rúcula silvestre",
    heroProduct: "Queso de Cabra Artesanal de Quebrada",
    prepTime: "20 minutos",
    servings: "4 comensales",
    difficulty: "Fácil",
    description: "El queso de cabra semimaduro adquiere una costra crujiente dorada en sartén de hierro fundido mientras su interior permanece fundente y perfumado.",
    ingredients: [
      "400g de queso de cabra madurado con hierbas, cortado en medallones de 2 cm",
      "1 taza de mistela de uva Moscatel del Valle del Elqui",
      "1 cucharada de miel de abeja de azahares",
      "60g de nueces criollas tostadas en sartén seca",
      "1 ramita de romero fresco",
      "1 cucharada de aceite de oliva virgen extra de Vicuña",
      "Hojas tiernas de rúcula o berros para acompañar",
    ],
    steps: [
      "En una olla pequeña, reducir la mistela junto a la miel y el romero a fuego suave hasta obtener una textura de almíbar espeso (unos 12 minutos). Retirar el romero.",
      "Calentar una sartén de hierro o plancha con un hilo tenue de aceite de oliva.",
      "Pasar los medallones de queso de cabra por sartén muy caliente durante 1 minuto por lado, logrando un sellado dorado sin que pierdan su estructura.",
      "Montar inmediatamente sobre plato tibio con colchón de rúcula fresca.",
      "Bañar con el jarabe tibio de mistela y coronar con las nueces tostadas crujientes.",
    ],
    pairing: "Pisco transparente de 40° servido con cáscara de pomelo o vino blanco Pedro Jiménez.",
    chefNote: "El secreto es la temperatura máxima de la sartén: un golpe de calor rápido sella sin desarmar el queso.",
    imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "asado-tira-pisco",
    title: "Asado de Tira Braseado al Pisco Añejo & Hierbas",
    subtitle: "Con puré rústico de papas nativas aromatizado al chañar",
    heroProduct: "Pisco D.O. de Autor & Botánicos",
    prepTime: "2 horas y media",
    servings: "4 comensales",
    difficulty: "Avanzada",
    description: "Cocción lenta campesina donde la carne se deshace con el tenedor, impregnada de los aromas a uva pasa, madera noble y el toque mineral del pisco de guarda.",
    ingredients: [
      "1.2 kg de asado de tira cortado en porciones generosas",
      "1 taza de pisco añejado en roble de 43°",
      "500ml de caldo de carne de campo hecho en casa",
      "2 cebollas picadas en pluma gruesa",
      "2 zanahorias en rodajas",
      "3 dientes de ajo chilote machacados",
      "Hierbas cordilleranas: tomillo silvestre, rica-rica y laurel",
      "1 kg de papas nativas cocidas con piel",
      "2 cucharadas de miel de chañar para el puré",
      "Sal de mar y pimienta negra de molinillo",
    ],
    steps: [
      "Sellar las piezas de carne en olla pesada de fierro hasta dorar intensamente todos sus costados. Retirar y reservar.",
      "En el mismo fondo, sofreír la cebolla, zanahoria y ajo hasta caramelizar.",
      "Desglasar la olla con el pisco añejo, dejando evaporar el alcohol durante 2 minutos mientras se raspa el fondo sabroso.",
      "Regresar la carne a la olla, agregar el caldo y el ramillete de hierbas cordilleranas. Tapar herméticamente.",
      "Cocinar a fuego muy bajo (o en horno a 140°C) durante 2 horas hasta que el hueso se desprenda sin esfuerzo.",
      "Para la guarnición: aplastar las papas cocidas rústicamente con tenedor, agregando mantequilla de campo y un hilo de miel de chañar.",
      "Servir la carne bañada en su jugo reducido y brillante junto al puré tibio.",
    ],
    pairing: "Vino Syrah del Valle del Elqui o Pisco Sour tradicional con amargo de angostura.",
    chefNote: "El flambeado opcional del pisco al desglasar acentúa los tonos ahumados del corte.",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    category: "Astronomía & Cielo",
    question: "¿Por qué el Valle del Elqui cuenta con los cielos más privilegiados del planeta para la observación astronómica?",
    options: [
      "Por tener más de 300 noches despejadas al año y bajísima humedad ambiental",
      "Por encontrarse exactamente al nivel de la corriente marina de Humboldt",
      "Por la presencia de vegetación tropical que absorbe el polvo en suspensión",
      "Por estar ubicado en el paralelo cero ecuatorial",
    ],
    correctIndex: 0,
    explanation: "El biombo climático de la Cordillera de los Andes frena la nubosidad y otorga una atmósfera sumamente seca, estable y transparente, convirtiendo al Elqui en la capital astronómica mundial.",
  },
  {
    id: 2,
    category: "Flora & Gastronomía",
    question: "¿De qué árbol autóctono de las quebradas áridas del norte de Chile se extrae la tradicional 'Miel de Chañar'?",
    options: [
      "Geoffroea decorticans (Chañar)",
      "Araucaria araucana (Pehuén)",
      "Cryptocarya alba (Peumo)",
      "Schinus molle (Pimiento)",
    ],
    correctIndex: 0,
    explanation: "El chañar es un árbol leguminoso resiliente al desierto. Sus frutos dulces y pulposos se hierven lentamente durante horas para producir un néctar oscuro y curativo con sabor a toffee tostado.",
  },
  {
    id: 3,
    category: "Cultura & Poesía",
    question: "¿Qué ilustre escritora chilena y primer Premio Nobel de Literatura de Latinoamérica nació en el corazón del Valle del Elqui?",
    options: [
      "Gabriela Mistral (Lucila Godoy Alcayaga)",
      "Marcela Paz",
      "María Luisa Bombal",
      "Marta Brunet",
    ],
    correctIndex: 0,
    explanation: "Lucila Godoy Alcayaga nació en Vicuña en 1889 y pasó su infancia en Montegrande. La geografía, parras y cerros del Elqui marcaron profundamente su poesía de reconocimiento universal.",
  },
  {
    id: 4,
    category: "Patrimonio & Destilados",
    question: "¿En qué año se promulgó el decreto que reconoció oficialmente la Denominación de Origen (D.O.) del Pisco Chileno?",
    options: [
      "1931, siendo la más antigua de América del Sur",
      "1985, tras el tratado de libre comercio",
      "1910, durante el Centenario de la República",
      "2001, con la ley de denominaciones modernas",
    ],
    correctIndex: 0,
    explanation: "El Decreto con Fuerza de Ley N° 181 de mayo de 1931 delimitó legalmente la zona pisquera exclusiva a las regiones de Atacama y Coquimbo, protegiendo un oficio centenario.",
  },
  {
    id: 5,
    category: "Vitivinicultura de Altura",
    question: "¿Cuáles son las variedades de uva emblemáticas que le otorgan el aroma floral característico al pisco elquino?",
    options: [
      "Moscatel de Alejandría, Moscatel Rosada y Pedro Jiménez",
      "Cabernet Sauvignon y Merlot",
      "Carménère y Sauvignon Blanc",
      "Pinot Noir y Syrah",
    ],
    correctIndex: 0,
    explanation: "Las uvas aromáticas del grupo Moscatel concentran terpenos y esencias bajo la radiación solar extrema del valle, dotando al destilado de notas florales y cítricas inconfundibles.",
  },
  {
    id: 6,
    category: "Pueblos Originarios",
    question: "¿Qué pueblo ancestral habitó este valle y legó su extraordinaria alfarería zoomorfa y conocimiento estelar?",
    options: [
      "Pueblo Diaguita",
      "Pueblo Rapa Nui",
      "Pueblo Chono",
      "Pueblo Kawésqar",
    ],
    correctIndex: 0,
    explanation: "Los diaguitas dominaron la agricultura en terrazas de riego, la metalurgia del cobre y la observación astronómica, plasmando grecas geométricas y símbolos cósmicos en sus cerámicas rituales.",
  },
];

export const CHATBOT_FAQ = [
  {
    id: "horarios-llegada",
    label: "📅 Horarios y cómo llegar",
    question: "¿Cuáles son los horarios de la experiencia y cómo llegar?",
    answer: "Nuestra experiencia exclusiva se vive diariamente de 17:00 a 21:00 hrs. El punto de encuentro es en nuestro refugio de campo ubicado en Camino a Montegrande Km 14 (a 15 min de Vicuña). Contamos con estacionamiento cerrado y coordinación de traslado opcional desde La Serena o Vicuña.",
  },
  {
    id: "vestimenta-clima",
    label: "🧥 Ropa y qué traer",
    question: "¿Qué vestimenta se recomienda para el valle y la noche?",
    answer: "Te recomendamos vestir en capas: las tardes en el valle son cálidas y soleadas (24°C a 29°C), pero al caer la noche la temperatura desciende a 10°C - 13°C con brisa fresca cordillerana. Trae calzado cómodo para caminar en tierra de huerto y una chaqueta abrigada para la sesión con telescopios.",
  },
  {
    id: "tiempo-cielo",
    label: "✨ Estado del cielo y tiempo hoy",
    question: "¿Cómo está el tiempo y la visibilidad para ver estrellas hoy en Vicuña?",
    answer: "El Valle del Elqui goza típicamente de cielos extraordinariamente despejados. Consulta en tiempo real nuestro módulo meteorológico conectado a la estación de Vicuña para ver temperatura, humedad y porcentaje de visibilidad estelar.",
  },
];

export const SECTION_SUBTITLES: Record<string, { title: string; bullets: string[] }> = {
  hero: {
    title: "Resumen Hero",
    bullets: [
      "Experiencia gastronómica y astroturismo en Valle del Elqui, Chile.",
      "Horario diario: 17:00 a 21:00 hrs. Cupo máximo de 12 personas por día.",
      "Cena campestre en 4 tiempos y observación con telescopios profesionales.",
    ],
  },
  timeline: {
    title: "Resumen de las 4 Horas",
    bullets: [
      "17:00 - Cóctel de bienvenida con pisco sour de chañar al atardecer.",
      "18:00 - Taller botánico y cata sensorial de papayas y aceites.",
      "19:30 - Banquete campestre a la leña maridado en 4 tiempos.",
      "20:30 - Observación astronómica guiada con telescopio computarizado.",
    ],
  },
  products: {
    title: "Resumen de Productos Típicos",
    bullets: [
      "Papaya elquina confitada con miel silvestre de chañar.",
      "Queso de cabra de pastoreo madurado con hierbas andinas.",
      "Pisco D.O. de autor destilado con uvas moscatel de altura.",
    ],
  },
  about: {
    title: "Resumen Sobre Nosotros",
    bullets: [
      "Alianza entre agricultores, crianceros y divulgadores astronómicos del Elqui.",
      "Protección de los cielos oscuros y puesta en valor de la cocina originaria diaguita.",
    ],
  },
  territory: {
    title: "Resumen Vinculación Territorial",
    bullets: [
      "Red colaborativa con productores locales de Vicuña, Paihuano y Pisco Elqui.",
      "Comercio justo con familias crianceras y huertos agroecológicos.",
    ],
  },
  restaurants: {
    title: "Resumen Espacios Aliados",
    bullets: [
      "4 restaurantes y comedores tradicionales aliados en el valle.",
      "Cocina solar, fogones a leña y terrazas con mirador estelar.",
    ],
  },
  reservations: {
    title: "Resumen de Reservas",
    bullets: [
      "Grupos de 1 a 12 comensales por jornada.",
      "Opciones inclusivas: menús para celíacos, diabéticos y accesibilidad para adultos mayores.",
      "15% de descuento al ingresar cupón de suscriptor.",
    ],
  },
  subscription: {
    title: "Resumen Suscripción & Recetario",
    bullets: [
      "Recibe de inmediato tu código con 15% de descuento.",
      "Descarga el recetario digital de autor con 3 platos tradicionales elquinos.",
    ],
  },
  trivia: {
    title: "Resumen de la Trivia",
    bullets: [
      "6 preguntas interactivas y accesibles sobre astronomía, pisco y cultura diaguita.",
      "Compatible con teclado y lectores de pantalla.",
    ],
  },
  contact: {
    title: "Resumen de Contacto",
    bullets: [
      "Ubicación: Camino a Montegrande Km 14, Valle del Elqui.",
      "Contacto directo vía WhatsApp y formulario web.",
    ],
  },
};
