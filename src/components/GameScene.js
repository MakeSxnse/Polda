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
  const { gameState, recordClick, addItem, updateScene, openPopup, closePopup, showText, clearText } = useGame();

  const [hoverText, setHoverText] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHotspots, setShowHotspots] = useState(false);

  const data = SCENES[sceneId];

  // Nastavení aktuální scény v globálním stavu (jen pokud to není popup)
  useEffect(() => {
    if (!isPopup && sceneId) {
      updateScene(sceneId);
    }
  }, [sceneId, isPopup, updateScene]);

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

  const handleAction = (action) => {
    if (action.type === 'SHOW_TEXT') showText(action.text);
    if (action.type === 'CHANGE_SCENE') {
      clearText();
      updateScene(action.sceneId);
      router.push('/' + action.sceneId);
    }
    if (action.type === 'ADD_ITEM') addItem(action.itemId);
    if (action.type === 'OPEN_POPUP') openPopup(action.popupId);
    if (action.type === 'CLOSE_POPUP') closePopup();
  };

  const containerClasses = isPopup
    ? "absolute inset-0 flex items-center justify-center bg-black/60 z-50 p-[5%]"
    : "relative w-full h-[100dvh] bg-black overflow-hidden";

  return (
    <div className={containerClasses} onMouseMove={handleMouseMove}>
      <div className={`relative w-full h-full shadow-2xl overflow-hidden ${isPopup ? 'ring-4 ring-black' : ''}`}>

        {/* Pozadí scény */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.background}
          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
          alt={data.id}
          draggable={false}
        />

        {/* Hotspoty */}
        {data.hotspots.map(h => (
          <div
            key={h.id}
            className={`absolute cursor-pointer transition-colors z-10 ${showHotspots ? 'bg-white/20' : 'hover:bg-white/40'}`}    //ODSTRANĚNÍ HOVERU TADY    
            style={{
              left: h.x + '%',
              top: h.y + '%',
              width: h.w + '%',
              height: h.h + '%'
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

        {/* Tlačítko pro zavření popupu */}
        {isPopup && (
          <button
            onClick={closePopup}
            className="absolute top-6 right-6 bg-red-600/80 hover:bg-red-700/80 text-white px-4 py-1 font-bold text-xl rounded z-40 transition-transform active:scale-95"
          >
            [X]
          </button>
        )}

        {/* Rekurzivní renderování popupu, pokud je aktivní a my jsme hlavní scéna */}
        {!isPopup && gameState.activePopup && (
          <GameScene sceneId={gameState.activePopup} isPopup={true} />
        )}

        {/* Textové pole (Titulky) - Vykreslujeme ho jen v hlavní scéně, aby bylo přes celou šířku */}
        {!isPopup && gameState.activeText && (
          <div
            className="absolute bottom-[5%] left-0 right-0 p-6 bg-black/85 text-white text-2xl text-center cursor-pointer z-[60] animate-in fade-in slide-in-from-bottom-4 duration-300"
            onClick={clearText}
          >
            {gameState.activeText}
            <div className="text-sm mt-3 font-bold text-blue-400 uppercase tracking-widest">[ Pokračovat ]</div>
          </div>
        )}
      </div>

      {/* Tooltip u myši */}
      {hoverText && (
        <div
          className="fixed pointer-events-none z-[100] text-white text-3xl font-bold select-none drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
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
