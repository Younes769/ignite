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
    default: 'DevImpact Hackathon 2024 | NCS Club',
    template: '%s | DevImpact 2024'
  },
  description: '🚀 Join the most exciting hackathon at NIT Rahmania! 72 hours of non-stop innovation, coding challenges, mentorship, and amazing prizes. Connect with fellow developers, build groundbreaking projects, and make a lasting impact! 💻✨',
  keywords: [
    'hackathon',
    'coding competition',
    'tech innovation',
    'software development',
    'NCS Club',
    'NIT Rahmania',
    'student hackathon',
    'programming challenge',
    'developer community',
    'tech event',
    'coding marathon',
    'project building',
    'team collaboration',
    'tech networking',
    'software engineering'
  ],
  authors: [{ name: 'NCS Club', url: 'https://devimpact.vercel.app' }],
  category: 'Technology',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devimpact.vercel.app',
    siteName: 'DevImpact Hackathon 2024',
    title: 'DevImpact 2024 | Where Innovation Meets Impact 🚀',
    description: '🎯 72 Hours of Pure Innovation\n💡 Build. Learn. Network.\n🏆 Amazing Prizes & Recognition\n🤝 Expert Mentorship\n\n Join +60 passionate developers at NIT Rahmania\'s premier hackathon! 🌟',
    images: [
      {
        url: '/meta/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevImpact Hackathon 2024 - Where Innovation Meets Impact',
        type: 'image/png',
      },
      {
        url: '/meta/og-image-square.png',
        width: 600,
        height: 600,
        alt: 'DevImpact Hackathon 2024 Logo',
        type: 'image/png',
      }
    ]
  },

  // Discord rich embed
  discord: {
    type: 'rich',
    title: '🏆 DevImpact Hackathon 2024',
    description: '🎯 72 Hours of Pure Innovation\n💡 Build. Learn. Network.\n🏆 Amazing Prizes & Recognition\n🤝 Expert Mentorship\n\nJoin +60 passionate developers at NIT Rahmania\'s premier hackathon! 🌟',
    color: '10b981',
    image: '/meta/og-image.png'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DevImpact 2024 | Where Innovation Meets Impact 🚀',
    description: '🎯 72-hour coding adventure at NIT Rahmania!\n💡 Build amazing projects\n🤝 Network with industry experts\n\nJoin +60 developers in this epic hackathon! 🌟',
    images: [{
      url: '/meta/og-image.png',
      width: 1200,
      height: 630,
      alt: 'DevImpact Hackathon 2024 - Where Innovation Meets Impact',
      type: 'image/png',
    }],
    creator: '@ncsclub',
    site: '@ncsclub',
    creatorId: '1234567890', // Replace with actual Twitter ID
  },

  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'DevImpact 2024',
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/shortcut-icon.png'],
  },
  
  manifest: '/manifest.json',
  
  verification: {
    google: 'your-google-site-verification', // Add your verification code
    yandex: 'your-yandex-verification', // Add if needed
    me: ['your-personal-website'] // Add if needed
  }
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
