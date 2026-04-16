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
    background: '/scenes/scena1.png',   // ← cesta k PNG v /public/scenes/
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
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Moje věrná kára. Žere víc než já v neděli u tchyně, ale aspoň mě sem dovezla. Snad tu ještě bude, až se vrátím.' },
          }
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
            // PRVNÍ KLIKNUTÍ
            condition: (s) => (s.clickCounts?.['scena1_skrinka'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Plechová skříňka. Drží pohromadě jen silou vůle a nánosem špíny. Na boku je fixou napsáno "Nedotýkat se, kouše".' },
          },
          {
            // TŘETÍ KLIKNUTÍ (count je 2)
            condition: (s) => (s.clickCounts?.['scena1_skrinka'] || 0) === 2,
            action: [
              { type: 'SHOW_TEXT', text: 'Cvak. No sláva. Vevnitř je jen hromada starých hlášení o narušení prostoru a... moment, co je tohle?' },
              { type: 'ADD_ITEM', itemId: 'stipacky' }
            ],
          },
          {
            // OSTATNÍ KLIKNUTÍ (fallback)
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Plechová skříňka. Drží pohromadě jen silou vůle a nánosem špíny. Na boku je fixou napsáno "Nedotýkat se, kouše".' },
          }
        ],
      },

      {
        id: 'brana',
        label: 'Brána',
        x: 75, y: 27.5, w: 20, h: 45,
        hoverText: 'Brána.',
        onClick: [
          {
            condition: (s) => s.inventory.includes('stipacky'),
            action: [
              { type: 'SHOW_TEXT', text: 'Jdeme dál.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena2' }
            ],
          },
          {
            condition: (s) => (s.clickCounts?.['scena1_brana'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Zamčeno. No jasně. V tomhle státě se krade i radioaktivní šrot, tak co bych čekal.' },
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Fakt je to zamčený. Musím najít jinou cestu nebo klíč.' },
          },
        ],
      },

      {
        id: 'lahev',
        label: 'Lahev',
        x: 51.5, y: 27, w: 2.5, h: 10,
        hoverText: 'Lahev piva',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Lahváč. Podle etikety je deset let po záruce.' },
          },
        ],
      },
    ],
  },

  // ← DRUHÁ SCÉNA
  // ← DRUHÁ SCÉNA
  scena2: {
    id: 'scena2',
    background: '/scenes/scena2.png',
    hotspots: [
      {
        id: 'kos',
        label: 'Koš',
        x: 9, y: 65, w: 15, h: 14,
        hoverText: 'Odpadkový koš',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['scena2_kos'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Plechová popelnice. Někdo ji převrátil tak odborně, že to vypadá jako moderní umění. Smrdí to z ní jako z kafilérie po zavíračce.' },
          },
          {
            condition: (s) => (s.clickCounts?.['scena2_kos'] || 0) === 1,
            action: [
              { type: 'SHOW_TEXT', text: 'No vida! Mezi slupkama od banánů a starejma novinama se válel paklíč. Někdo ho tu zahodil, jako by se ho chtěl narychlo zbavit. Bude se hodit.' },
              { type: 'ADD_ITEM', itemId: 'paklic' }
            ],
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'V popelnici už je jen ten hroznej smrad. Paklíč byl jediný poklad, co tam byl.' },
          },
        ],
      },

      {
        id: 'svitici_okno',
        label: 'Svitící okno',
        x: 51.5, y: 5, w: 12, h: 12,
        hoverText: 'Svitící okno',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'V tomhle paneláku už zbyla jenom tahle jedna zářivka. Svítí tam automat, nebo tam někdo zapomněl zhasnout, když v panice utíkal. Každopádně je to vysoko jak na Sněžce.' },
          },
        ],
      },

      {
        id: 'rozbite_okno',
        label: 'Rozbité okno',
        x: 51.5, y: 28, w: 12, h: 12,
        hoverText: 'Rozbité okno',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'To okno je vysoko. Moje klouby už dávno nejsou to, co bejvaly v devadesátkách. Kdybych se pokusil tam vyskočit, skončím na JIPce dřív, než stačím zaklepat na sklo.' },
          },
        ],
      },

      {
        id: 'matrace',
        label: 'Matrace',
        x: 48, y: 52, w: 16, h: 15,
        hoverText: 'Stará matrace',
        onClick: [
          {
            // POUŽITÍ PŘEDMĚTU (Priorita)
            condition: (s) => s.inventory.includes('tyc'),
            action: [
              { type: 'SHOW_TEXT', text: 'Šprajcnout, podepřít a... tradá! Teď je to stabilní jako státní rozpočet těsně před volbama. Vypadá to sice blbě, ale svoji funkci to splní.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena3' }
            ],
          },
          {
            // PRVNÍ KLIKNUTÍ
            condition: (s) => (s.clickCounts?.['scena2_matrace'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Fuj tajbl, ta už něco pamatuje. Je smradlavá, flekatá a těžká jako hříchy mýho mládí. Ale na spaní ji nechci, to je jasný.' },
          },
          {
            // DRUHÉ KLIKNUTÍ
            condition: (s) => (s.clickCounts?.['scena2_matrace'] || 0) === 1,
            action: { type: 'SHOW_TEXT', text: 'Nejsem sebevrah. Na tohle stoupnout, tak se prohnu až k zemi a vyrazím si dech. To chce nějakou vzpěru.' },
          },
          {
            // DALŠÍ KLIKNUTÍ
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Bez nějaké tyče nebo podpěry s tou matrací nic nevymyslím.' },
          },
        ],
      },

      {
        id: 'tyc',
        label: 'tyc',
        x: 39, y: 17, w: 3, h: 50,
        hoverText: 'Lampa',
        onClick: [
          {
            // POKUD UŽ TYČ MÁ
            condition: (s) => s.inventory.includes('tyc'),
            action: { type: 'SHOW_TEXT', text: 'Ta tyč už mi říká pane. Bez ní už ta lampa vypadá tak nějak smutně.' },
          },
          {
            // PRVNÍ KLIKNUTÍ
            condition: (s) => (s.clickCounts?.['scena2_tyc'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Hm, divím se, že ještě svítí. Tady zezadu něco kouká. Stará tyč, co drží tu lampu. Vypadá dost bytelně.' },
          },
          {
            // DRUHÉ KLIKNUTÍ (sebere tyč)
            condition: (s) => (s.clickCounts?.['scena2_tyc'] || 0) === 1,
            action: [
              { type: 'SHOW_TEXT', text: 'Zkusím to teda utrhnout... Povedlo se!' },
              { type: 'ADD_ITEM', itemId: 'tyc' }
            ],
          },
          {
            // OSTATNÍ (fallback)
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Lampa už je bez té tyče jen kus šrotu.' },
          },
        ],
      }
    ],
  },

  scena3: {
    id: 'scena3',
    background: '/scenes/scena3.png',
    hotspots: [
      {
        id: 'zpet',
        label: 'Zpět',
        x: 5, y: 80, w: 10, h: 10,
        hoverText: 'Jít zpět k paneláku',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'CHANGE_SCENE', sceneId: 'scena2' }
          }
        ],
      }
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
  stipacky: {
    id: 'stipacky',
    name: 'Štípačky',
    image: '/items/stipacky.png',
    description: 'Štípací kleště',
  },
  paklic: {
    id: 'paklic',
    name: 'Paklíč',
    image: '/items/paklic.png', // ← nezapomeň nahrát obrázek do /public/items/
    description: 'Starý ohlý paklíč.',
  },
  tyc: {
    id: 'tyc',
    name: 'Tyč',
    image: '/items/tyc.png', // ← nezapomeň nahrát obrázek do /public/items/
    description: 'Stará ocelová tyč.',
  },
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
