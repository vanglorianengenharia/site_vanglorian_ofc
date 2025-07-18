import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Vanglorian | Construtora e Incorporadora",
  description:
    "A Vanglorian é uma construtora e incorporadora localizada em Fazenda Rio Grande, Paraná, próxima a Curitiba. Construímos casas com qualidade, responsabilidade e foco no bem-estar dos futuros moradores. Conheça nossos projetos e transforme seu sonho em realidade.",
  keywords: [
    "construtora",
    "incorporadora",
    "casas",
    "Fazenda Rio Grande",
    "Curitiba",
    "Paraná",
    "Vanglorian",
  ],
  authors: [{ name: "Vanglorian", url: "https://vanglorian.com.br" }],
  creator: "Vanglorian",
  openGraph: {
    title: "Vanglorian | Construtora e Incorporadora",
    description:
      "Casas com qualidade e bem-estar em Fazenda Rio Grande, Curitiba, Paraná.",
    url: "https://vanglorian.com.br",
    siteName: "Vanglorian",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
