'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    currentScene: 'scena1',
    inventory: [],
    flags: {}, // Pro ukládání stavů jako 'dvere_otevreny: true'
    clickCounts: {}, // Sledování počtu kliknutí na hotspoty
    isReady: false, // Flag, abychom věděli, že se data načetla z localStorage
    activePopup: null, // ID aktuálně otevřeného popupu (transient)
    activeText: null // Aktuálně zobrazený dialog (transient)
  });

  // 1. Načtení dat při startu
  useEffect(() => {
    const saved = localStorage.getItem('polda_save');
    setTimeout(() => {
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setGameState(prev => ({
            ...prev,
            ...parsed,
            isReady: true
          }));
        } catch (e) {
          console.error("Chyba při načítání savu:", e);
          setGameState(prev => ({ ...prev, isReady: true }));
        }
      } else {
        setGameState(prev => ({ ...prev, isReady: true }));
      }
    }, 0);
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

  const recordClick = (sceneId, hotspotId) => {
    const key = `${sceneId}_${hotspotId}`;
    setGameState(prev => ({
      ...prev,
      clickCounts: {
        ...prev.clickCounts,
        [key]: (prev.clickCounts[key] || 0) + 1
      }
    }));
  };

  const addItem = (itemId) => {
    setGameState(prev => {
      if (prev.inventory.includes(itemId)) return prev;
      return {
        ...prev,
        inventory: [...prev.inventory, itemId]
      };
    });
  };

  const openPopup = (popupId) => {
    setGameState(prev => ({ ...prev, activePopup: popupId }));
  };

  const closePopup = () => {
    setGameState(prev => ({ ...prev, activePopup: null }));
  };

  const showText = (text) => {
    setGameState(prev => ({ ...prev, activeText: text }));
  };

  const clearText = () => {
    setGameState(prev => ({ ...prev, activeText: null }));
  };

  const resetGame = () => {
    const newState = {
      currentScene: 'scena1',
      inventory: [],
      flags: {},
      clickCounts: {},
      activePopup: null,
      activeText: null,
      isReady: true
    };
    setGameState(newState);
    localStorage.removeItem('polda_save');
  };

  return (
    <GameContext.Provider value={{
      gameState,
      updateScene,
      setFlag,
      recordClick,
      addItem,
      resetGame,
      openPopup,
      closePopup,
      showText,
      clearText
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
