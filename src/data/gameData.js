// =============================================================
//  gameData.js — CENTRÁLNÍ DATOVÝ SOUBOR HRY
//  Sem doplňuješ: scény, hotspoty, itemy, hádanky
// =============================================================

// -------------------------------------------------------------
//  SCÉNY
//  Každá scéna má pozadí a pole hotspotů.
//  Hotspot = neviditelný obdélník nad itemem ve scéně.
//
//  Pozice (x, y, w, h) jsou v procentech šířky/výšky scény,
//  takže fungují na různých rozlišeních.
//
//  onClick je pole pravidel vyhodnocovaných shora dolů —
//  použije se první pravidlo, jehož condition() vrátí true.
// -------------------------------------------------------------

export const SCENES = {

  scena1: {
    id: 'scena1',
    background: '/scenes/lobby.png',   // ← cesta k PNG v /public/scenes/
    hotspots: [
      {
        id: 'predmet1',
        label: 'Auto',                  // ← jen pro debugování
        x: 0,    // Úprava podle obrázku
        y: 55,
        w: 42,
        h: 45,
        hoverText: 'Kára',
        onClick: [
          {
            condition: () => true,
            action: { type: 'SHOW_TEXT', text: 'Moje věrná kára. Žere víc než já v neděli u tchyně, ale aspoň mě sem dovezla. Snad tu ještě bude, až se vrátím.' },
          },
        ],
      },

      {
        id: 'skrinka',
        label: 'Plechová skříňka',
        x: 43.5,
        y: 36.5,
        w: 13,
        h: 35,
        hoverText: 'Stará plechová skříňka.',
        onClick: [
          {
            condition: () => true,
            action: { type: 'SHOW_TEXT', text: 'Plechová skříňka. Drží pohromadě jen silou vůle a nánosem špíny. Na boku je fixou napsáno "Nedotýkat se, kouše".' },
          },
        ],
      },

      // ← Přechod do jiné scény
      {
        id: 'brana',
        label: 'Brána',
        x: 60, y: 30, w: 40, h: 40,
        hoverText: 'Brána.',
        onClick: [
          {
            condition: () => true,
            action: { type: 'SHOW_TEXT', text: 'Zamčeno. No jasně. V tomhle státě se krade i radioaktivní šrot, tak co bych čekal.' },
          },
        ],
      },
    ],
  },

  // ← DRUHÁ SCÉNA
  scena2: {
    id: 'scena2',
    background: '/scenes/scena2.png',
    hotspots: [
      // ... sem přidáš hotspoty
    ],
  },

  // ← PŘIDÁVEJ DALŠÍ SCÉNY STEJNÝM ZPŮSOBEM
};

// -------------------------------------------------------------
//  ITEMY
//  Předměty, které hráč může sebrat do inventáře.
//  image → cesta k PNG v /public/items/
// -------------------------------------------------------------

export const ITEMS = {

  // ← SEM PŘIDÁVEJ ITEMY
  // priklad: {
  //   id: 'priklad',
  //   name: 'Příklad',
  //   image: '/items/priklad.png',
  //   description: 'Popis při kliknutí v inventáři.',
  // },
};

// -------------------------------------------------------------
//  HÁDANKY
//  Typy: 'code_input' (zadání kódu), přidej další dle potřeby.
//  onSolve / onFail → action dispatch po vyřešení / špatné odpovědi
// -------------------------------------------------------------

export const PUZZLES = {

  // ← SEM PŘIDÁVEJ HÁDANKY
  // prikladHadanky: {
  //   id: 'prikladHadanky',
  //   type: 'code_input',
  //   question: 'Zadej čtyřmístný kód.',
  //   solution: '1234',
  //   hint: 'Nápověda po 2 pokusech.',
  //   hintAfterAttempts: 2,
  //   onSolve: { type: 'ADD_ITEM', itemId: 'priklad' },
  //   onFail:  { type: 'SHOW_TEXT', text: 'Špatný kód.' },
  // },
};
