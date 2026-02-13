"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Fireworks from "../../components/fireworks-button";

export default function Home() {
    const [showFireworks, setShowFireworks] = useState(false);
    const [showMeme, setShowMeme] = useState(false);
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const memeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".hero-content", {
            opacity: 0,
            y: 40,
            duration: 1.5,
            ease: "power3.out",
        });

        gsap.from(".photo-left", {
            opacity: 0,
            x: -120,
            rotate: -20,
            duration: 1.5,
            delay: 0.4,
            ease: "power3.out",
        });

        gsap.from(".photo-right", {
            opacity: 0,
            x: 120,
            rotate: 20,
            duration: 1.5,
            delay: 0.4,
            ease: "power3.out",
        });
    }, []);

    // Move NO button randomly
    const moveNoButton = () => {
        if (!noButtonRef.current) return;
        const randomX = Math.floor(Math.random() * 200) - 100;
        const randomY = Math.floor(Math.random() * 200) - 100;

        gsap.to(noButtonRef.current, {
            x: randomX,
            y: randomY,
            duration: 0.3,
        });
    };

    // Handle NO click → play audio + show meme
    const handleNoClick = () => {
        if (audioRef.current) audioRef.current.play();
        setShowMeme(true);

        if (!memeRef.current) return;
        gsap.fromTo(
            memeRef.current,
            { scale: 0, opacity: 0, y: -50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
        );
    };

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-pink-500 via-rose-400 to-orange-200">

            {/* Background */}
            <div className="absolute inset-0 bg-[url('/1312796.svg')] bg-bottom bg-cover bg-no-repeat opacity-80 pointer-events-none animate-slow-zoom" />

            {/* Fireworks */}
            {showFireworks && (
                <div className="absolute inset-0 z-50 pointer-events-none">
                    <Fireworks />
                </div>
            )}

            {/* Blur Container */}
            <div className="relative z-10 flex w-full min-h-screen backdrop-blur-sm items-center justify-center px-6">

                {/* LEFT IMAGE */}
                <div className="photo-left absolute left-6 md:left-24 top-1/2 -translate-y-1/2 rotate-[-12deg] w-[220px] md:w-[260px] h-[320px] md:h-[380px] z-20">
                    <img
                        src="/her1.jpg"
                        alt="Beautiful Nonkululeko"
                        className="rounded-2xl shadow-2xl object-cover w-full h-full"
                    />
                </div>

                {/* RIGHT IMAGE */}
                <div className="photo-right absolute right-6 md:right-24 top-1/2 -translate-y-1/2 rotate-[12deg] w-[220px] md:w-[260px] h-[320px] md:h-[380px] z-20">
                    <img
                        src="/her2.jpg"
                        alt="Beautiful Nonkululeko"
                        className="rounded-2xl shadow-2xl object-cover w-full h-full"
                    />
                </div>

                {/* TEXT CONTENT */}
                <div className="hero-content relative z-30 flex w-full max-w-3xl flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-xl">
                        Nonkululeko, Will You Be My Valentine? 💘
                    </h1>

                    <div className="mt-12 flex gap-6 relative">

                        {/* YES BUTTON */}
                        <Fireworks/>

                        {/* NO BUTTON */}
                        <button
                            ref={noButtonRef}
                            onMouseEnter={moveNoButton}
                            onClick={handleNoClick}
                            className="px-8 py-4 bg-gray-200 text-gray-800 text-lg rounded-full shadow-xl"
                        >
                            No 😢
                        </button>

                    </div>
                </div>
            </div>

            {/* HIDDEN AUDIO */}
            <audio ref={audioRef} src="/gogo (online-video-cutter.com).wav" />

            {/* MEME CARD */}
            {showMeme && (
                <div className="absolute inset-0 z-40 flex items-center justify-center">
                    <div
                        ref={memeRef}
                        className="relative w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-2xl shadow-2xl overflow-hidden bg-white/20 backdrop-blur-md flex items-center justify-center"
                    >

                        <img
                            src="/Funny Tik Tok Pfp.jpg"
                            alt="Beautiful Nonkululeko"
                            className="object-cover rounded-2xl"
                        />

                    </div>
                </div>
            )}

            {/* Background Zoom Animation */}
            <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-slow-zoom {
          animation: slow-zoom 20s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}
