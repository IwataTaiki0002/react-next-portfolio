"use client";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import KamomeAnimation from "./_components/useKamomeAnimation";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    // ラッパー自体（背景部分）の場合は発動
    if (e.target === e.currentTarget) {
      window.dispatchEvent(new CustomEvent("kamome-fire"));
      return;
    }
    
    // data-kamome-area属性を持つ要素内のクリックの場合
    const kamomeArea = target.closest("[data-kamome-area]");
    if (kamomeArea) {
      // リンク、ボタン、インタラクティブ要素でなければ発動
      const isInteractive = target.closest("a, button, input, select, textarea");
      if (!isInteractive) {
        window.dispatchEvent(new CustomEvent("kamome-fire"));
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ minHeight: "100vh" }}
    >
      <KamomeAnimation />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
