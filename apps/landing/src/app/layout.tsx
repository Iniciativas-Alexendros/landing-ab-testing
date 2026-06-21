import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landing AB Testing",
  description: "Landing page de alto impacto con A/B testing sobre el CTA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
