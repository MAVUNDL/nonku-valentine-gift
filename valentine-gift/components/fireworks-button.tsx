"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function FireWorks() {
    // Hidden audio for celebration
    useEffect(() => {
        const audio = new Audio("/thanda wena.mp3"); // <-- add your audio in public folder
        audio.id = "celebration-audio";
        document.body.appendChild(audio);
    }, []);

    const handleOnClick = () => {
        // Play audio
        const audio = document.getElementById("celebration-audio") as HTMLAudioElement;
        if (audio) audio.play();

        // Fireworks
        const duration = 70 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });

            // Floating hearts effect using confetti shapes
            for (let i = 0; i < 5; i++) {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    gravity: 0.1,
                    drift: Math.random() * 2 - 1,
                    origin: { x: Math.random(), y: Math.random() },
                    shape: "heart", // custom shape
                    colors: ["#FF2D95", "#FF6B81", "#FF9AA2"]
                } as any);
            }
        }, 250);

        // Extra visual: small floating sparkles hearts on screen
        const sparkleInterval = window.setInterval(() => {
            const sparkle = document.createElement("div");
            sparkle.className = "absolute w-4 h-4 bg-pink-400 rounded-full opacity-75 animate-float-up z-50 pointer-events-none";
            sparkle.style.left = `${Math.random() * 90 + 5}%`;
            sparkle.style.top = `90%`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        }, 200);
        setTimeout(() => clearInterval(sparkleInterval), duration);
    };

    return (
        <>
            <button
                onClick={handleOnClick}
                className="px-8 py-4 bg-rose-600 text-white text-lg rounded-full shadow-xl hover:scale-110 transition duration-300 z-50 relative"
            >
                Accept 💖
            </button>

            <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-60px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-120px) scale(0.8); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 3s ease-in forwards;
        }
      `}</style>
        </>
    );
}
