import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orlando Moreno | Portafolio",
  description: "Portafolio profesional de desarrollo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
