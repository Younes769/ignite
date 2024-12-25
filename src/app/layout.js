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
  description: '🚀 Join the biggest hackathon at NIT Rahmania! 72 hours of coding, innovation, and amazing prizes. Organized by NCS Club. Register now and make an impact! 💻✨',
  keywords: ['hackathon', 'coding', 'technology', 'innovation', 'NCS Club', 'NIT Rahmania'],
  authors: [{ name: 'NCS Club' }],
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devimpact.vercel.app',
    siteName: 'DevImpact Hackathon',
    title: 'DevImpact | Where Developers Make an Impact 🚀',
    description: '🎉 Join us for an epic 72-hour hackathon at NIT Rahmania!\n\n💻 Code, Create, Innovate\n🏆 Amazing Prizes\n🤝 Network with Industry Experts\n\nOrganized by NCS Club ✨',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevImpact Hackathon'
      }
    ]
  },

  // Discord specific metadata
  discord: {
    type: 'rich',
    title: 'DevImpact Hackathon 2024 🚀',
    description: '🎉 Join us for an epic 72-hour hackathon at NIT Rahmania!\n\n💻 Code, Create, Innovate\n🏆 Amazing Prizes\n🤝 Network with Industry Experts\n\nOrganized by NCS Club ✨',
    color: '10b981', // Emerald color
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DevImpact | Where Developers Make an Impact 🚀',
    description: '🎉 Join the biggest hackathon at NIT Rahmania! 72 hours of coding, innovation, and amazing prizes. Register now! 💻✨',
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
        {/* Discord specific meta tags */}
        <meta property="og:site_name" content="DevImpact Hackathon" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DevImpact Hackathon - Where Developers Make an Impact" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        <ScrollProgress />
        <ParticlesBackground />
        
        <main className="relative overflow-hidden">
          <div className="fixed inset-0 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_60%)]"></div>
          </div>
          
          <div className="relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
