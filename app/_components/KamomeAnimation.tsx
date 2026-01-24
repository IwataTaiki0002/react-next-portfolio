"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function KamomeAnimation() {
  useEffect(() => {
    const fire = () => {
      // 画面サイズ取得
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // 画面右端 or 下端からランダムに発射
      let startX, startY;
      if (Math.random() < 0.5) {
        // 右端（上下全体）
        startY = Math.random() * (vh - 80);
        startX = vw - 80;
      } else {
        // 下端（左右全体）
        startX = Math.random() * (vw - 80);
        startY = vh - 80;
      }
      // 目標方向を常に左上45度（-1, -1）に固定
      // 画面外まで直線移動
      const maxDist = Math.max(startX + 120, startY + 120); // 120px画面外まで
      const dx = -maxDist;
      const dy = -maxDist;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.7; // px/ms
      const duration = distance / speed;

      // カモメ要素生成
      const kamome = document.createElement("img");
      kamome.src = "/kamome.png";
      kamome.alt = "カモメ";
      kamome.style.position = "fixed";
      kamome.style.left = `${startX}px`;
      kamome.style.top = `${startY}px`;
      kamome.style.width = "80px";
      kamome.style.height = "80px";
      kamome.style.pointerEvents = "none";
      kamome.style.zIndex = "-1";
      kamome.style.transition = `transform ${duration}ms linear`;
      kamome.style.transform = "translate(0,0) rotate(-10deg)";
      kamome.style.opacity = "1";

      document.body.appendChild(kamome);

      // アニメーション開始（次フレームで）
      requestAnimationFrame(() => {
        kamome.style.transform = `translate(${dx}px, ${dy}px) rotate(-40deg)`;
      });

      // アニメーション後に削除
      setTimeout(() => {
        kamome.remove();
      }, duration + 100);
    };
    window.addEventListener("kamome-fire", fire);
    return () => window.removeEventListener("kamome-fire", fire);
  }, []);
  return null;
}
