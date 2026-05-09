'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function JakHrat() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const sections = [
    {
      title: "PRŮZKUM A INTERAKCE",
      description: "Svět hry prozkoumáváš pomocí myši. Kliknutím na zajímavé objekty můžeš zjistit více informací, sebrat předměty nebo spustit akci. Pokud si nebudeš jistý, na co lze kliknout, zmáčni mezerník a na obrazovce ti probliknou všechny dostupné interakce.",
      icon: "🔍",
      image: "/scenes/jak_hrat1.png"
    },
    {
      title: "INVENTÁŘ",
      description: "Sebrané předměty se ukládají do tvého inventáře. Správná kombinace předmětů je klíčem k postupu. Pokud na některé itemy klikneš vícekrát (maximálně 3x), můžou se chovat jinak.",
      icon: "🎒",
      image: "/scenes/popup1.png"
    },
    {
      title: "PROSLOV",
      description: "Pozorně poslouchej/ čti, co ti polda říká. většinou jsou to popisky, ale i mezi nimi se občas objeví důležité informace.",
      icon: "💬",
      image: "/scenes/scena2.png"
    },
    {
      title: "HÁDANKY A PUZZLE",
      description: "Některé cesty jsou uzavřené a vyžadují vyřešení logické hádanky nebo nalezení správného kódu. Pokud se zasekneš, zkus proskoumat okolí, jestli ti nechybí nějaký detail.",
      icon: "🧩",
      image: "/scenes/popup3.png"
    },
    {
      title: "VŠÍMAVOST",
      description: "Na každé scéně může být něco, co se ti bude do budoucna hodit. Buď proto pozorný a nenech se zviklat štokavým klamem.",
      icon: "👁️",
      image: "/scenes/scena2.png"
    }

  ];

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-[family-name:var(--font-denk)] overflow-x-hidden">

      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 to-black pointer-events-none" />

      <main className={`relative z-10 max-w-6xl mx-auto px-6 py-16 transition-all duration-1000 ${isMounted && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        <div className="flex justify-between items-center mb-16">
          <h1 className="text-6xl text-blue-500 text-outlined tracking-wider">JAK HRÁT</h1>
          <Link
            href="/"
            onClick={handleBack}
            className="text-3xl text-white/50 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
          >
            ZPĚT DO MENU
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-500 group`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl">{section.icon}</span>
                <h2 className="text-3xl text-blue-400">{section.title}</h2>
              </div>

              <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sekce herních principů */}
        <div className="mt-24 space-y-16">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="text-5xl text-blue-500 text-outlined uppercase tracking-widest">Princip hry</h2>
            <p className="text-2xl text-gray-300 leading-relaxed italic">
              Hra je klasickou 2D adventurou, kde se ujímáš role detektiva. Tvým úkolem je vyřešittajemství v podobě případu poldy Břéti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pravidlo: Ukládání */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex items-start space-x-6">
              <div className="bg-blue-500/20 p-4 rounded-xl text-3xl">💾</div>
              <div>
                <h3 className="text-2xl text-blue-400 mb-2 font-bold uppercase">Automatické ukládání</h3>
                <p className="text-lg text-gray-400">Hra se ukládá při každém přechodu mezi scénami. Pokud se ztratíš, zkus se podívat do inventáře, jestli ti nechybí nějaký detail.</p>
              </div>
            </div>

            {/* Pravidlo: Průzkum */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex items-start space-x-6">
              <div className="bg-blue-500/20 p-4 rounded-xl text-3xl">🕵️</div>
              <div>
                <h3 className="text-2xl text-blue-400 mb-2 font-bold uppercase">Důkladný průzkum</h3>
                <p className="text-lg text-gray-400">Pokud znáš cestu dál, prvně se ujisti, že jsi všechno prozkoumal. Než opustíš scénu, zkontroluj, zda jsi na nic nezapomněl.</p>
              </div>
            </div>

            {/* Pravidlo: Bugy */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex items-start space-x-6">
              <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl flex items-start space-x-6 col-span-1 md:col-span-1">
                <div className="bg-red-500/20 p-4 rounded-xl text-3xl">⚠️</div>
                <div>
                  <h3 className="text-2xl text-red-400 mb-2 font-bold uppercase">Fair Play</h3>
                  <p className="text-lg text-gray-400">Pokud objevíš bug nebo chybu, nezneužívej ji. Místo toho prosím restartuj hru a začni hrát znovu pro nejlepší zážitek.</p>
                </div>
              </div>
            </div>

            {/* Pravidlo: Logika */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex items-start space-x-6">
              <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl flex items-start space-x-6 col-span-1 md:col-span-1">
                <div className="bg-green-500/20 p-4 rounded-xl text-3xl">🧠</div>
                <div>
                  <h3 className="text-2xl text-green-400 mb-2 font-bold uppercase">Logické uvažování</h3>
                  <p className="text-lg text-gray-400">Nepoužívej metodu „zkus všechno na všechno“. Přemýšlej jako detektiv a hledej logické vazby mezi předměty a světem.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <div
        className="fixed inset-0 bg-black pointer-events-none z-[100] transition-all duration-1000 ease-in-out"
        style={{
          clipPath: (isExiting || !isMounted) ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)'
        }}
      />
    </div>
  );
}
