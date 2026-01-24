import "./globals.css";
import ClientRoot from "./ClientRoot";
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
      <body style={{ position: "relative" }}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
