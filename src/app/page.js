'use client';

import Link from "next/link";
import { useGame } from "../context/GameContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { gameState, resetGame } = useGame();
  const router = useRouter();
  const [hasSave, setHasSave] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Zjištění existence savu v localStorage
  useEffect(() => {
    const saved = localStorage.getItem('polda_save');
    if (saved) {
      setHasSave(true);
    }
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Pokud se změní gameState (např. po načtení v Provideru), aktualizujeme hasSave
  useEffect(() => {
    if (gameState.isReady) {
      const saved = localStorage.getItem('polda_save');
      setHasSave(!!saved);
    }
  }, [gameState.isReady]);

  const handleStartGame = (e, isNew = true) => {
    e.preventDefault();
    if (!gameState.isReady) return; // Zabránit startu před načtením

    setIsExiting(true);

    if (isNew) {
      resetGame();
    }

    // Pokud pokračujeme, jdeme na uloženou scénu, jinak na scénu 1
    const target = isNew ? "/scena1" : `/${gameState.currentScene}`;

    setTimeout(() => {
      router.push(target);
    }, 1000);
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden font-[family-name:var(--font-denk)]">
      <div className={`relative w-full h-full overflow-hidden transition-all duration-1000 ease-in-out ${isExiting ? 'scale-110 blur-md brightness-50' : 'scale-100'}`}>
        <img
          className={`absolute inset-0 w-full h-full object-fill pointer-events-none transition-all duration-[250ms] ease-out ${!isMounted ? 'scale-125 blur-2xl brightness-0' : isExiting ? 'scale-110 blur-md brightness-50' : 'scale-100 brightness-100'}`}
          src="/scenes/lobby.png"
          alt="lobby_bg"
          draggable={false}
        />

        <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-black to-black/0 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-end pr-[10%] pt-[25%] space-y-6">

          <Link
            href="/scena1"
            onClick={(e) => handleStartGame(e, true)}
            className={`text-blue-500 text-[5rem] text-outlined hover:text-blue-400 transition-all duration-300 transform ${!isMounted ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'} hover:scale-105 active:scale-95`}
            style={!isMounted ? { transitionDelay: '300ms' } : {}}
          >
            NOVÁ HRA
          </Link>

          {hasSave && (
            <Link
              href={`/${gameState.currentScene}`}
              onClick={(e) => handleStartGame(e, false)}
              className={`text-blue-500 text-[5rem] text-outlined hover:text-blue-400 transition-all duration-300 transform ${!isMounted ? 'opacity-0 translate-x-20' : 'opacity-100 translate-x-0'} hover:scale-105 active:scale-95 ${!gameState.isReady ? 'pointer-events-none opacity-50' : ''}`}
              style={!isMounted ? { transitionDelay: '500ms' } : {}}
            >
              POKRAČOVAT
            </Link>
          )}

          <Link
            href="/jak-hrat"
            className={`absolute bottom-10 right-[10%] text-blue-500 text-[3rem] text-outlined hover:text-blue-400 transition-all duration-300 transform ${!isMounted ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
            style={!isMounted ? { transitionDelay: '800ms' } : {}}
          >
            JAK HRÁT
          </Link>

        </div>
      </div>

      <div
        className="fixed inset-0 bg-black pointer-events-none z-[100] transition-all duration-1000 ease-in-out flex items-center justify-center"
        style={{
          clipPath: (isExiting || !isMounted) ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)'
        }}
      >
        {(isExiting || !gameState.isReady) && (
          <div className="text-white text-2xl font-bold tracking-[0.5em] animate-pulse">
            NAČÍTÁNÍ...
          </div>
        )}
      </div>
    </div>
  );
}
