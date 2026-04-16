'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    currentScene: 'scena1',
    inventory: [],
    flags: {}, // Pro ukládání stavů jako 'dvere_otevreny: true'
    isReady: false // Flag, abychom věděli, že se data načetla z localStorage
  });

  // 1. Načtení dat při startu
  useEffect(() => {
    const saved = localStorage.getItem('polda_save');
    if (saved) {
      try {
        setGameState({ ...JSON.parse(saved), isReady: true });
      } catch (e) {
        console.error("Chyba při načítání savu:", e);
        setGameState(prev => ({ ...prev, isReady: true }));
      }
    } else {
      setGameState(prev => ({ ...prev, isReady: true }));
    }
  }, []);

  // 2. Uložení dat při každé změně
  useEffect(() => {
    if (gameState.isReady) {
      localStorage.setItem('polda_save', JSON.stringify(gameState));
    }
  }, [gameState]);

  // Pomocné funkce pro úpravu stavu
  const updateScene = (sceneId) => {
    setGameState(prev => ({ ...prev, currentScene: sceneId }));
  };

  const setFlag = (key, value) => {
    setGameState(prev => ({
      ...prev,
      flags: { ...prev.flags, [key]: value }
    }));
  };

  const resetGame = () => {
    const newState = {
      currentScene: 'scena1',
      inventory: [],
      flags: {},
      isReady: true
    };
    setGameState(newState);
    localStorage.removeItem('polda_save');
  };

  return (
    <GameContext.Provider value={{ gameState, updateScene, setFlag, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
