import { Inter } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://devimpact.vercel.app"),
  title: "EGNITE 2024 | Startup Conference & Ideathon",
  description:
    "Join EGNITE 2024 for an inspiring three-day journey featuring a startup showcase and ideathon challenge. Connect with innovative startups, develop groundbreaking solutions, and ignite your entrepreneurial spirit.",
  keywords: [
    "EGNITE",
    "Startup Conference",
    "Ideathon",
    "Innovation",
    "Entrepreneurship",
    "Technology",
    "Startup Showcase",
    "Business Competition",
  ],
  authors: [{ name: "EGNITE Team" }],
  category: "Business & Technology",
  openGraph: {
    title: "EGNITE 2024 | Startup Conference & Ideathon",
    description:
      "Join EGNITE 2024 for an inspiring three-day journey featuring a startup showcase and ideathon challenge. Connect with innovative startups, develop groundbreaking solutions, and ignite your entrepreneurial spirit.",
    url: "https://devimpact.vercel.app",
    siteName: "EGNITE 2024",
    images: [
      {
        url: "https://devimpact.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EGNITE 2024 | Startup Conference & Ideathon",
    description:
      "Join EGNITE 2024 for an inspiring three-day journey featuring a startup showcase and ideathon challenge. Connect with innovative startups, develop groundbreaking solutions, and ignite your entrepreneurial spirit.",
    images: ["https://devimpact.vercel.app/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-black text-white overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200`}
      >
        <div className="relative min-h-screen">
          {/* Background */}
          <Background />

          {/* Main content */}
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
