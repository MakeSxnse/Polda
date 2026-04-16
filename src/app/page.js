'use client';

import Link from "next/link";
import { useGame } from "../context/GameContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { gameState, resetGame } = useGame();
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    // Kontrola, zda existuje uložená pozice (víc než jen výchozí stav)
    const saved = localStorage.getItem('polda_save');
    if (saved) setHasSave(true);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-[family-name:var(--font-denk)]">

      {/* Pozadí scény */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/scenes/lobby.png"
        alt="lobby_bg"
        draggable={false}
      />

      {/* Menu Container */}
      <div className="absolute inset-0 flex flex-col items-end pr-[10%] pt-[25%] space-y-6">

        {/* Tlačítko HRÁT (Nová hra) */}
        <Link
          href="/scena1"
          onClick={() => resetGame()}
          className="text-blue-500 text-[5rem] text-outlined hover:text-blue-400 transition-colors"
        >
          NOVÁ HRA
        </Link>

        {/* Tlačítko POKRAČOVAT (jen pokud existuje save) */}
        {hasSave && (
          <Link
            href={`/${gameState.currentScene}`}
            className="text-blue-500 text-[5rem] text-outlined hover:text-blue-400 transition-colors"
          >
            POKRAČOVAT
          </Link>
        )}

        {/* Odkaz JAK HRÁT - Posunutý úplně dolů */}
        <Link
          href="/jak-hrat"
          className="absolute bottom-10 right-[10%] text-blue-500 text-[3rem] text-outlined hover:text-blue-400 transition-colors"
        >
          JAK HRÁT
        </Link>

      </div>

    </div>
  );
}
