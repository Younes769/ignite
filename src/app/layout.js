import { Inter } from 'next/font/google';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import ParticlesBackground from '@/components/ParticlesBackground';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://devimpact.vercel.app'),
  title: {
    default: 'DevImpact | NCS Club',
    template: '%s | DevImpact'
  },
  description: 'Join us for 72 hours of innovation, creativity, and impact at NIT Rahmania. A hackathon where developers make an impact, organized by NCS Club.',
  keywords: ['hackathon', 'coding', 'technology', 'innovation', 'NCS Club', 'NIT Rahmania'],
  authors: [{ name: 'NCS Club' }],
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devimpact.vercel.app',
    siteName: 'DevImpact Hackathon',
    title: 'DevImpact | NCS Club',
    description: 'Join us for 72 hours of innovation, creativity, and impact at NIT Rahmania.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevImpact Hackathon'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DevImpact | NCS Club',
    description: 'Join us for 72 hours of innovation, creativity, and impact at NIT Rahmania.',
    images: ['/og-image.png'],
    creator: '@ncsclub'
  },

  icons: {
    icon: '/logo.png'
  },
  
  manifest: '/manifest.json'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        <ScrollProgress />
        <ParticlesBackground />
        
        <main className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="fixed inset-0 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_60%)]"></div>
          </div>
          
          {/* Content */}
          <div className="relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
