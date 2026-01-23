import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ポートフォリオサイト",
  description:
    "エンジニアを目指して学習中です。制作物や学びの記録を発信しています。",
  openGraph: {
    title: "ポートフォリオサイト",
    description:
      "エンジニアを目指して学習中です。制作物や学びの記録を発信しています。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
