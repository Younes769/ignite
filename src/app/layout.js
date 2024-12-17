import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'DevIM Hackathon | NCS Club',
  description: 'Join us for 72 hours of innovation, creativity, and impact at NIT Rahmania. Organized by NCS Club.',
  keywords: ['hackathon', 'coding', 'technology', 'innovation', 'NCS Club', 'NIT Rahmania'],
  authors: [{ name: 'NCS Club' }],
  openGraph: {
    title: 'DevIM Hackathon | NCS Club',
    description: 'Join us for 72 hours of innovation, creativity, and impact at NIT Rahmania.',
    url: 'https://devim-hackathon.com',
    siteName: 'DevIM Hackathon',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevIM Hackathon | NCS Club',
    description: 'Join us for 72 hours of innovation, creativity, and impact at NIT Rahmania.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#10b981',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
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
