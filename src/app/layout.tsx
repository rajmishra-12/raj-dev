import type { Metadata } from "next";
import { Outfit, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raj Mishra | Premium Portfolio | Flutter & AI Developer",
  description: "Explore the portfolio of Raj Mishra, a premium Flutter developer building production-ready mobile applications powered by AI, real-time communication, IoT, and scalable architectures.",
  keywords: ["Flutter Developer", "Mobile App Developer", "React Native", "AI Apps", "iOS", "Android", "Raj Mishra", "EitBiz Technologies", "Prutor.ai"],
  authors: [{ name: "Raj Mishra" }],
  openGraph: {
    title: "Raj Mishra | Premium Portfolio | Flutter & AI Developer",
    description: "Premium Flutter developer building production-ready mobile applications powered by AI, real-time communication, IoT, and scalable architectures.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", "dark", outfit.variable, inter.variable, "font-sans", geist.variable)}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-screen bg-bg-main text-white selection:bg-primary-accent selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
