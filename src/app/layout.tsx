import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/data/site';

const cinzel = Cinzel({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Valle del Elqui, Chile`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Valle del Elqui',
    'Gastronomía chilena',
    'Astroturismo',
    'Pisco D.O.',
    'Paihuano',
    'Vicuña',
    'Queso de cabra artesanal',
    'Papaya elquina',
    'Miel de chañar',
    'Turismo astronómico Chile',
    'Cena bajo las estrellas',
  ],
  authors: [{ name: 'Valle a las Estrellas' }],
  creator: 'Valle a las Estrellas',
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.shortName,
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/images/elqui_astroturismo.jpg',
        width: 1200,
        height: 630,
        alt: 'Atardecer dorado y cielo estrellado en el Valle del Elqui',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ['/images/elqui_astroturismo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Restaurant',
      '@id': `${SITE_CONFIG.url}/#restaurant`,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      servesCuisine: 'Chilena, Campestre, Autóctona del Elqui',
      priceRange: '$$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '17:00',
          closes: '21:00',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.location.address,
        addressLocality: 'Paihuano',
        addressRegion: 'Coquimbo',
        addressCountry: 'CL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.location.coordinates.lat,
        longitude: SITE_CONFIG.location.coordinates.lng,
      },
      telephone: SITE_CONFIG.demo.phone,
    },
    {
      '@type': 'TouristAttraction',
      '@id': `${SITE_CONFIG.url}/#attraction`,
      name: 'Experiencia Astroturismo y Banquete Elquino',
      description: 'Observación del cielo nocturno con telescopios guiada por astrónomos y cena maridada en 4 tiempos.',
      touristType: ['Gastroturismo', 'Astroturismo'],
      isAccessibleForFree: false,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cinzel.variable} ${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#1F1513] text-[#FDFBF7] antialiased selection:bg-[#D4AF37] selection:text-[#1F1513]">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
