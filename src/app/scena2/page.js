'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '../../context/GameContext';
import { SCENES } from '../../data/gameData';

export default function Scena2() {
  const router = useRouter();
  const { gameState, recordClick, addItem, updateScene } = useGame();
  const [text, setText] = useState('');
  const [hoverText, setHoverText] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Uložíme informaci, že jsme v této scéně
  useEffect(() => {
    updateScene('scena2');
  }, []);

  // Přímý přístup k datům scény
  const data = SCENES.scena2;

  if (!gameState.isReady) return <div>Načítání...</div>;

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* Pozadí */}
      <img src={data.background} className="w-[100%] h-[100vh]" alt="bg" />

      {/* Hotspoty */}
      {data.hotspots.map(h => (
        <div
          key={h.id}
          className="absolute cursor-pointer hover:bg-white/20"
          style={{ left: h.x + '%', top: h.y + '%', width: h.w + '%', height: h.h + '%' }}
          onMouseEnter={() => setHoverText(h.hoverText || '')}
          onMouseLeave={() => setHoverText('')}
          onClick={() => {
            // 1. Najdeme pravidlo, které splňuje podmínku (před započtením kliku)
            const rule = h.onClick.find(r => r.condition(gameState));

            if (rule) {
              // Podpora pro více akcí v jednom pravidle (pole i jeden objekt)
              const actions = Array.isArray(rule.action) ? rule.action : [rule.action];

              actions.forEach(action => {
                if (action.type === 'SHOW_TEXT') setText(action.text);
                if (action.type === 'CHANGE_SCENE') {
                  updateScene(action.sceneId);
                  router.push('/' + action.sceneId);
                }
                if (action.type === 'ADD_ITEM') addItem(action.itemId);
              });
            }

            // 2. Zapíšeme klik do state
            recordClick(data.id, h.id);
          }}
        />
      ))}

      {/* Dynamický popisek u myši (Tooltip) */}
      {hoverText && !text && (
        <div
          className="fixed pointer-events-none z-50 text-white text-2xl font-bold select-none"
          style={{
            left: mousePos.x + 20 + 'px',
            top: mousePos.y - 40 + 'px'
          }}
        >
          {hoverText}
        </div>
      )}

      {/* Jednoduché zobrazení textu */}
      {text && (
        <div
          className="absolute bottom-10 left-0 right-0 p-10 bg-black/70 text-white text-2xl text-center cursor-pointer bg-black"
          onClick={() => setText('')}
        >
          {text}
          <div className="text-sm mt-2 font-bold text-blue-400">[ Zavřít ]</div>
        </div>
      )}

    </div>
  );
}
