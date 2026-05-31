import type { Metadata } from "next";
import "./globals.css";
import RouteTunnelTransition from "@/components/RouteTunnelTransition";

function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  return envUrl ?? "http://localhost:3000";
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "عروض زين فايبر",
    template: "%s | عروض زين فايبر",
  },
  description: "عروض وباقات زين فايبر المنزلية في السعودية",
  applicationName: "عروض زين فايبر",
  icons: {
    icon: [
      { url: "/ans.png", type: "image/png" },
    ],
    shortcut: ["/ans.png"],
    apple: [{ url: "/ans.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "عروض زين فايبر",
    description: "عروض وباقات زين فايبر المنزلية في السعودية",
    siteName: "عروض زين فايبر",
  },
  twitter: {
    card: "summary_large_image",
    title: "عروض زين فايبر",
    description: "عروض وباقات زين فايبر المنزلية في السعودية",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "عروض زين فايبر",
    url: siteUrl,
    inLanguage: "ar-SA",
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <RouteTunnelTransition />
      </body>
    </html>
  );  

}
