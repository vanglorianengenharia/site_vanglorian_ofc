import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, DM_Serif_Display, Outfit, Roboto } from "next/font/google";




const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100','200', '300' ,'400','500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dmSerifDisplay',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['100','200', '300' ,'400','500', '600', '700', '800', '900'],
  variable: '--font-outfit',
})
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});




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
    <html lang="pt-BR" className={`${montserrat.variable} ${dmSerifDisplay.variable} ${outfit.variable} ${roboto.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
