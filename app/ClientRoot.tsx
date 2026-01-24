"use client";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import KamomeAnimation from "./_components/KamomeAnimation";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // クリックされた要素がラッパー自体（背景部分）の場合のみ発火
    if (e.target === e.currentTarget) {
      window.dispatchEvent(new CustomEvent("kamome-fire"));
    }
  };

  return (
    <div
      onClick={handleBgClick}
      style={{ minHeight: "100vh" }}
    >
      <KamomeAnimation />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
