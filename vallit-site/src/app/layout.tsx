import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarWrapper } from "@/components/layout/navbar-wrapper";
import { FooterWrapper } from "@/components/layout/footer-wrapper";
import { KianWidget } from "@/components/kian-widget/kian-widget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vallit – Digital Solutions Redefined",
    template: "%s | Vallit",
  },
  description:
    "Personalized and improved digital solutions. We build what others can't: Custom AI Automation, Deeply Integrated Discord Bots, Immersive Websites, and Cognitive Time Tracking.",
  keywords: [
    "AI automation",
    "Data Analysis",
    "Discord bots",
    "web development",
    "time tracking AI",
    "managed AI",
    "enterprise automation",
    "Kian AI",
  ],
  authors: [{ name: "Vallit" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Vallit",
    title: "Vallit – Digital Solutions Redefined",
    description:
      "Personalized and improved digital solutions. Custom AI, Discord Bots, Websites, and Time Tracking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vallit – Digital Solutions Redefined",
    description:
      "Personalized and improved digital solutions. Custom AI, Discord Bots, Websites, and Time Tracking.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {/* Skip to main content (Accessibility) */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Global background glow layer */}
        <div className="global-glow" aria-hidden="true" />

        {/* Navigation */}
        <NavbarWrapper />

        {/* Main Content */}
        <main id="main-content">{children}</main>

        {/* Footer */}
        <FooterWrapper />

        {/* Kian Chatbot Widget */}
        <KianWidget />
      </body>
    </html>
  );
}
