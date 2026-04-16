'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SCENES } from '../../data/gameData';

export default function Scena1() {
  const router = useRouter();
  const [text, setText] = useState('');

  // Přímý přístup k datům scény
  const data = SCENES.scena1;

  return (
    <div className="relative w-screen h-screen">

      {/* Pozadí */}
      <img src={data.background} className="absolute inset-0 w-full h-full object-cover" alt="bg" />

      {/* Hotspoty */}
      {data.hotspots.map(h => (
        <div
          key={h.id}
          className="absolute cursor-pointer hover:"
          style={{ left: h.x + '%', top: h.y + '%', width: h.w + '%', height: h.h + '%' }}
          onClick={() => {
            const action = h.onClick[0].action; // Jen první akce pro jednoduchost
            if (action.type === 'SHOW_TEXT') setText(action.text);
            if (action.type === 'CHANGE_SCENE') router.push('/' + action.sceneId);
          }}
        />
      ))}

      {/* Jednoduché zobrazení textu */}
      {text && (
        <div
          className="absolute bottom-10 left-0 right-0 p-10 bg-black/70 text-white text-2xl text-center cursor-pointer"
          onClick={() => setText('')}
        >
          {text}
          <div className="text-sm mt-2 font-bold text-blue-400">[ Zavřít ]</div>
        </div>
      )}

    </div>
  );
}
