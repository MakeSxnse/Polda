'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '../context/GameContext';
import { SCENES } from '../data/gameData';

/**
 * GameScene - Komponenta pro renderování herní scény.
 * Zvládá: Pozadí, hotspoty, tooltipy, dialogové texty a vyskakovací okna (popups).
 * Udržuje fixní poměr stran 16:10 pro eliminaci roztažení.
 */
export default function GameScene({ sceneId, isPopup = false }) {
  const router = useRouter();
  const { gameState, recordClick, addItem, updateScene, openPopup, closePopup, showText, clearText, setFlag } = useGame();

  const [hoverText, setHoverText] = useState('');
  const [credits, setCredits] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHotspots, setShowHotspots] = useState(false);

  const data = SCENES[sceneId];

  const handleAction = (action) => {
    // Podpora pro dynamické akce — pokud je akce funkce, zavoláme ji s aktuálním stavem
    const act = typeof action === 'function' ? action(gameState) : action;

    const execute = () => {
      if (act.type === 'SHOW_TEXT') showText(act.text);
      if (act.type === 'SHOW_CREDITS') setCredits(act.text);
      if (act.type === 'CHANGE_SCENE') {
        clearText();
        updateScene(act.sceneId);
        router.push('/' + act.sceneId);
      }
      if (act.type === 'ADD_ITEM') addItem(act.itemId);
      if (act.type === 'OPEN_POPUP') openPopup(act.popupId);
      if (act.type === 'CLOSE_POPUP') closePopup();
      if (act.type === 'SET_FLAG') setFlag(act.key, act.value);
      if (act.type === 'GO_TO_LOBBY') {
        window.location.href = '/';
      }
    };

    if (act.delay) {
      setTimeout(execute, act.delay);
    } else {
      execute();
    }
  };

  // Nastavení aktuální scény a spuštění onEnter akcí
  useEffect(() => {
    if (!isPopup && sceneId) {
      updateScene(sceneId);

      // Spuštění automatických akcí při vstupu do scény
      if (data?.onEnter) {
        const entries = Array.isArray(data.onEnter) ? data.onEnter : [data.onEnter];
        entries.forEach(entry => {
          // Pokud má entry condition, zkontrolujeme ji. Pokud ne, bereme ji jako vždy platnou.
          if (!entry.condition || entry.condition(gameState)) {
            // Pokud má entry vlastnost 'action', provedeme ji/je. 
            // Jinak bereme celou entry jako jednu akci (pro zpětnou kompatibilitu).
            const actions = entry.action
              ? (Array.isArray(entry.action) ? entry.action : [entry.action])
              : [entry];

            actions.forEach(handleAction);
          }
        });
      }
    }
  }, [sceneId, isPopup, updateScene, data]);

  // Mezerník — problikne hotspoty bíle
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setShowHotspots(true);
        setTimeout(() => setShowHotspots(false), 300);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Pokud data scény neexistují nebo state není připraven
  if (!gameState.isReady || !data) {
    return isPopup ? null : <div className="flex items-center justify-center w-full h-full bg-black text-white">Načítání...</div>;
  }

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const containerClasses = isPopup
    ? "absolute inset-0 flex items-center justify-center bg-black/60 z-50 p-[5%]"
    : "relative w-full h-[100dvh] bg-black overflow-hidden";

  return (
    <div className={containerClasses} onMouseMove={handleMouseMove}>
      <div
        className={`relative shadow-2xl overflow-hidden ${isPopup ? 'ring-4 ring-black h-full' : 'w-full h-full'} ${gameState.flags.trigger_glitch ? 'animate-shake animate-glitch' : ''}`}
        style={isPopup ? { aspectRatio: data.aspectRatio || '16/10' } : {}}
      >
        {/* Černá clona pro filmové přechody */}
        <div className={`blackout-overlay ${gameState.flags.trigger_glitch || gameState.flags.trigger_blackout ? 'active' : ''}`} />

        {/* Vycentrované titulky */}
        <div className={`credits-overlay ${credits ? 'active' : ''}`}>
          <h1 className="credits-title">KONEC</h1>
          <p className="credits-text">{credits}</p>
        </div>

        {/* Pozadí scény */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.background}
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          alt={data.id}
          draggable={false}
        />

        {/* Speciální overlay pro tmu v Scéně 4 */}
        {sceneId === 'scena4' && gameState.flags.mistnost_zatemnena && !gameState.flags.paka_zatazena && (
          <div
            className="absolute inset-0 bg-black z-20 flex flex-col items-center justify-center text-white p-10 text-center cursor-pointer"
            onClick={() => {
              setFlag('paka_zatazena', true);
              showText('Cvak! No sláva, už vidím na špičku vlastního nosu.');
            }}
          >
            <p className="text-3xl italic max-w-2xl animate-pulse">
              "Je tu tma jak v pytli, jediný, čeho sem si všiml, je tato páka, zkusím za ní zatáhnout."
            </p>
            <div className="mt-8 text-sm opacity-50 uppercase tracking-widest font-bold">[ Klikni pro zatažení za páku ]</div>
          </div>
        )}

        {/* Hotspoty */}
        {data.hotspots.filter(h => !h.condition || h.condition(gameState)).map(h => (
          <div
            key={h.id}
            className={`absolute cursor-pointer transition-colors ${showHotspots ? 'border-4 border-red-600/40' : ''}`}
            style={{
              left: h.x + '%',
              top: h.y + '%',
              width: h.w + '%',
              height: h.h + '%',
              zIndex: h.zIndex || 10
            }}
            onMouseEnter={() => setHoverText(h.hoverText || '')}
            onMouseLeave={() => setHoverText('')}
            onClick={() => {
              const rule = h.onClick.find(r => r.condition(gameState));
              if (rule) {
                const actions = Array.isArray(rule.action) ? rule.action : [rule.action];
                actions.forEach(handleAction);
              }
              recordClick(data.id, h.id);
            }}
          />
        ))}

        {/* Puzzle - Textový vstup (Kódový zámek) */}
        {data.puzzle && data.puzzle.type === 'code_input' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30 animate-in fade-in duration-500">
            <div className="bg-zinc-900/90 backdrop-blur-md p-10 rounded-2xl border border-zinc-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center max-w-sm w-full mx-4">
              <h3 className="text-zinc-400 uppercase tracking-[0.2em] text-sm mb-6 font-bold">
                {data.puzzle.question || 'Zadejte přístupový kód'}
              </h3>

              <div className="relative mb-8">
                <input
                  type="text"
                  id="puzzle-input"
                  placeholder="____"
                  className="bg-black/50 text-white text-5xl tracking-[0.3em] font-mono border-b-2 border-zinc-700 py-4 px-2 text-center w-full outline-none focus:border-blue-500 transition-all duration-300 placeholder:opacity-20"
                  autoFocus
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = e.target.value;
                      if (val === data.puzzle.solution) {
                        const acts = Array.isArray(data.puzzle.onSolve) ? data.puzzle.onSolve : [data.puzzle.onSolve];
                        acts.forEach(handleAction);
                      } else {
                        const acts = Array.isArray(data.puzzle.onFail) ? data.puzzle.onFail : [data.puzzle.onFail];
                        acts.forEach(handleAction);
                        e.target.value = ''; // Reset on fail
                      }
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    const input = document.getElementById('puzzle-input');
                    const val = input.value;
                    if (val === data.puzzle.solution) {
                      const acts = Array.isArray(data.puzzle.onSolve) ? data.puzzle.onSolve : [data.puzzle.onSolve];
                      acts.forEach(handleAction);
                    } else {
                      const acts = Array.isArray(data.puzzle.onFail) ? data.puzzle.onFail : [data.puzzle.onFail];
                      acts.forEach(handleAction);
                      input.value = '';
                    }
                  }}
                  className="bg-white text-black hover:bg-blue-500 hover:text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
                >
                  Ověřit kód
                </button>
                <p className="text-zinc-600 text-xs mt-2 italic">
                  [ Stiskněte ENTER pro rychlé potvrzení ]
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tlačítko pro zavření popupu */}
        {isPopup && (
          <button
            onClick={closePopup}
            className="absolute top-6 right-6 bg-red-600/80 hover:bg-red-700/80 text-white px-4 py-1 font-bold text-xl rounded z-40 transition-transform active:scale-95"
          >
            [X]
          </button>
        )}

        {/* Rekurzivní renderování popupu */}
        {!isPopup && gameState.activePopup && (
          <GameScene sceneId={gameState.activePopup} isPopup={true} />
        )}
      </div>

      {/* Textové pole (Titulky) - Přesunuto mimo vnitřní div a zvednut z-index */}
      {!isPopup && gameState.activeText && (
        <div
          className="fixed bottom-[10%] left-[10%] right-[10%] p-8 bg-black/90 text-white text-2xl text-center cursor-pointer z-[10001] animate-in fade-in slide-in-from-bottom-4 duration-300 border-2 border-blue-500/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
          onClick={clearText}
        >
          {gameState.activeText}
          <div className="text-sm mt-3 font-bold text-blue-400 uppercase tracking-widest">[ Pokračovat ]</div>
        </div>
      )}

      {/* Tooltip u myši */}
      {hoverText && (
        <div
          className="fixed pointer-events-none z-[110] text-white text-3xl font-bold select-none drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
          style={{
            left: mousePos.x + 25 + 'px',
            top: mousePos.y - 45 + 'px'
          }}
        >
          {hoverText}
        </div>
      )}
    </div>
  );
}
