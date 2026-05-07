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
            condition: (s) => s.inventory.includes('tyc'),
            action: [
              { type: 'SHOW_TEXT', text: 'Tyč jako žebřík. Starý trik. A moje záda mi to nikdy neodpustí.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena3' }
            ]
          },
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
            condition: (s) => s.inventory.includes('tyc'),
            action: [
              { type: 'SHOW_TEXT', text: 'Šprajcnout, podepřít a... tradá! Teď je to stabilní jako státní rozpočet těsně před volbama. Vypadá to sice blbě, ale svoji funkci to splní.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena3' }
            ],
          },
          {
            condition: (s) => (s.clickCounts?.['scena2_matrace'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Fuj tajbl, ta už něco pamatuje. Je smradlavá, flekatá a těžká jako hříchy mýho mládí. Ale na spaní ji nechci, to je jasný.' },
          },
          {
            condition: (s) => (s.clickCounts?.['scena2_matrace'] || 0) === 1,
            action: { type: 'SHOW_TEXT', text: 'Nejsem sebevrah. Na tohle stoupnout, tak se prohnu až k zemi a vyrazím si dech. To chce nějakou vzpěru.' },
          },
          {
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
            condition: (s) => s.inventory.includes('tyc'),
            action: { type: 'SHOW_TEXT', text: 'Ta tyč už mi říká pane. Bez ní už ta lampa vypadá tak nějak smutně.' },
          },
          {
            condition: (s) => (s.clickCounts?.['scena2_tyc'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Hm, divím se, že ještě svítí. Tady zezadu něco kouká. Stará tyč, co drží tu lampu. Vypadá dost bytelně.' },
          },
          {
            condition: (s) => (s.clickCounts?.['scena2_tyc'] || 0) === 1,
            action: [
              { type: 'SHOW_TEXT', text: 'Zkusím to teda utrhnout... Povedlo se!' },
              { type: 'ADD_ITEM', itemId: 'tyc' }
            ],
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Lampa už je bez té tyče jen kus šrotu.' },
          },
        ],
      },

      {
        id: 'dvere',
        label: 'Zamčené dveře',
        x: 72, y: 37, w: 18, h: 27,
        hoverText: 'Zamčené dveře',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Zamčeno. Ten zámek vypadá tak bytelně, že by ho neotevřel ani Červenej trpaslík. Tady se někdo hodně bál, aby mu neukradli i ten rezavej vzduch uvnitř.' }
          }
        ]
      }
    ],
  },

  scena3: {
    id: 'scena3',
    background: '/scenes/scena3.png',
    hotspots: [
      {
        id: 'nahoru',
        label: 'nahoru',
        x: 1,
        y: -20,
        w: 30,
        h: 100,
        hoverText: 'Jít nahoru',
        onClick: [
          {
            condition: (s) => s.inventory.includes('oblek'),
            action: { type: 'CHANGE_SCENE', sceneId: 'scena4' }
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Tak nahoře už šli asi spát. Můj tenzometr mi tam ale hlásí vysokou radiaci. Bez obleku ani ránu. Nerad bych, aby mi narostla třetí ruka, i když na psaní protokolů by se hodila.' }
          }
        ],
      },

      {
        id: 'dolu',
        label: 'dolu',
        x: 75, y: -10, w: 30, h: 100,
        hoverText: 'Jít dolů',
        onClick: [
          {
            condition: (s) => s.inventory.includes('svitilna') && s.inventory.includes('baterky'),
            action: [
              { type: 'SHOW_TEXT', text: 'Tak jdeme dolů. Svítilna naplno, hlava dolu a modlíme se.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena4' }
            ]
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Dolů? Do tý černý díry? Leda ve snu. Tam dole končí sranda a začíná... no, tma a smrad. Bez světla tam nelezu, nerad bych šlápl na něco, co mě sežere.' }
          }
        ]
      },

      {
        id: 'elektricka_skrinka',
        label: 'Skříňka s elektrikou',
        x: 65, y: 33, w: 8, h: 20,
        hoverText: 'Skříňka s elektrikou',
        onClick: [
          {
            condition: (s) => s.inventory.includes('paklic'),
            action: { type: 'OPEN_POPUP', popupId: 'popup_skrinka' }
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Zámek je rezavý, ale s paklíčem by to mohlo jít.' }
          }
        ],
      },
      {
        id: 'svitilna',
        label: 'Svítilna',
        x: 53, y: 73, w: 3, h: 5,
        hoverText: 'Svítilna',
        onClick: [
          {
            condition: (s) => s.inventory.includes('svitilna'),
            action: { type: 'SHOW_TEXT', text: 'Svítilna je v kapse. Ještě potřebuju baterky.' }
          },
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Pojď ke mně, krásko. Sice jsi celá od oleje a smrdíš jako vyjetá nafta, ale tvůj svit mě povede vstříc lepším zítřkům... sakra, ale došla ti šťáva.' },
              { type: 'ADD_ITEM', itemId: 'svitilna' }
            ]
          }
        ]
      },


    ],
  },

  // POPUP SCÉNA — DETAIL SKŘÍŇKY
  popup_skrinka: {
    id: 'popup_skrinka',
    background: '/scenes/popup1.png',
    hotspots: [
      {
        id: 'baterky',
        label: 'Baterky',
        x: 40, y: 50, w: 30, h: 40,
        hoverText: 'Rozteklé baterky',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Tohle je teda nadělení. Jističe jsou vyhozený a dráty vypadají, že je ohlodali mutanti. Ale hele! Mezi těma ohořelejma kabelama se válí dvě staré, vyteklé baterie. Sice vypadají, že už zažily i VŘSR, ale možná v nich zbyla trocha šťávy. Lepší než drátem do oka.' },
              { type: 'ADD_ITEM', itemId: 'baterky' }
            ]
          }
        ]
      }
    ]
  },

  scena4: {
    id: 'scena4',
    background: '/scenes/scena4.png',
    hotspots: [
      {
        id: 'gumaky',
        label: 'Gumáky',
        x: 49, y: 60, w: 8, h: 12,
        hoverText: 'Gumáky',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Někdo je tu nechal a vzal to odtud nejspíš bosky. Podle toho smradu v nich ta noha musela i zkamenět. Velikost tak čtyřicet šest – v tom by se dalo i veslovat. Radši na ně nebudu sahat. Nerad bych chytil plíseň, co má vlastní občanku.' }
            ]
          }
        ]
      },

      {
        id: 'nastroje',
        label: 'Nástroje',
        x: 20, y: 65, w: 20, h: 35,
        hoverText: 'Krabice s nářadím',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Nástroje... No, jestli tím mysleli rezavý hřebíky a ohnutej šroubovák, tak nekecali. Je to prostě hřbitov železářství.' }
            ]
          }
        ]

      },

      {
        id: 'dvere',
        label: 'Dveře',
        x: 60, y: 15, w: 12, h: 55,
        hoverText: 'Dveře',
        onClick: [
          {
            condition: (s) => s.inventory.includes('klic_sklep'),
            action: [
              { type: 'SET_FLAG', key: 'mistnost_zatemnena', value: true },
            ]
          },
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Zámek ani necvakne.' }
            ]
          }
        ]

      },

      {
        id: 'klice',
        label: 'Krabice klíčů',
        x: 70, y: 65, w: 10, h: 10,
        hoverText: 'Krabice klíčů',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'ADD_ITEM', itemId: 'klic_sklep' },
              { type: 'SHOW_TEXT', text: 'Těch klíčů je tu víc než v klíčenství u nás na rohu. Každý má jiný zoubky a jinou barvu rzi. Ale tento... ten je vyleštěnej, jako by je někdo používal denně. Tak ho beru.' }
            ]
          }
        ]
      },

      {
        id: 'oblek',
        label: 'Protiradiační oblek',
        x: 75, y: 15, w: 15, h: 45,
        hoverText: 'Oblek',
        onClick: [
          {
            condition: (s) => s.inventory.includes('oblek'),
            action: { type: 'CHANGE_SCENE', sceneId: 'scena5' }
          },
          {
            condition: (s) => s.flags.paka_zatazena,
            action: [
              { type: 'SHOW_TEXT', text: 'Tak a je dole. Trochu se při tom pádu zvířil prach z roku raz dva, ale oblek vypadá v cajku. Šedá mu sluší, je to taková nenápadná barva pro nenápadnýho hrdinu, jako jsem já. Jdeme se do toho nasoukat.' },
              { type: 'ADD_ITEM', itemId: 'oblek' }
            ]
          },
          {
            // Výchozí stav (před rozsvícením)
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Ten oblek tam visí jak vycpanej kosmonaut. Je to přesně v tý vejšce, kam nedosáhnu, ani kdybych se rozkrájel. Musím najít způsob, jak ten věšák dostat dolů, jinak budu nahoře svítit jak vánoční stromeček i bez baterek.' }
          }
        ]
      }
    ],
  },

  scena5: {
    id: 'scena5',
    background: '/scenes/scena5.png',
    hotspots: [
      {
        id: 'nahoru',
        label: 'nahoru',
        x: 1,
        y: -20,
        w: 30,
        h: 100,
        hoverText: 'Jít nahoru',
        onClick: [
          {
            condition: (s) => s.inventory.includes('oblek'),
            action: { type: 'CHANGE_SCENE', sceneId: 'scena6' }
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Tak nahoře už šli asi spát. Můj tenzometr mi tam ale hlásí vysokou radiaci. Bez obleku ani ránu. Nerad bych, aby mi narostla třetí ruka, i když na psaní protokolů by se hodila.' }
          }
        ],
      },

      {
        id: 'dolu',
        label: 'dolu',
        x: 75, y: -10, w: 30, h: 100,
        hoverText: 'Jít dolů',
        onClick: [
          {
            // FALLBACK — nemá světlo
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Všechno, co potřebuju, už z tam mám.' }
          }
        ]
      },

      {
        id: 'elektricka_skrinka',
        label: 'Skříňka s elektrikou',
        x: 65, y: 33, w: 8, h: 20,
        hoverText: 'Skříňka s elektrikou',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Kromě baterek už v ní nic zajímavého není.' }
          }
        ],
      },
      {
        id: 'svitilna',
        label: 'Svítilna',
        x: 53, y: 73, w: 3, h: 5,
        hoverText: 'Svítilna',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Přece už ji mám, ale proč je tu zase?..' },
            ]
          }
        ]
      },

    ],
  },

  scena6: {
    id: 'scena6',
    background: '/scenes/scena6.png',
    hotspots: [
      {
        id: 'rozpadle_schodiste',
        label: 'rozpadle_schodiste',
        x: 40,
        y: 30,
        w: 20,
        h: 50,
        hoverText: 'Rozpadlé schodiště',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'No to mě podrž. Cesta končí dřív, než začala. Schody se prostě rozhodly, že už je tohle patro nebaví a zřítily se o úroveň níž. Ze zdi trčí jenom pár ohnutých drátů jako vyceněný zuby. Tudy neprojde ani myš, natož já s těma olověnýma botama.' }
          }
        ]
      },

      {
        id: 'vytah',
        label: 'vytah',
        x: 70, y: 20, w: 20, h: 70,
        hoverText: 'Výtah',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Dveře se otevřely jen tak na půl, musel jsem jim pomoct ramenem. Uvnitř to smrdí jako v uzavřený plechovce od sardinek, co ležela rok na sluníčku. Světlo v kabině poblikává, jako by mi chtělo morseovkou říct: \'Běda ti!\'' },
              { type: 'CHANGE_SCENE', sceneId: 'scena7', delay: 1500 }
            ]
          },
        ]
      }
    ]
  },

  scena7: {
    id: 'scena7',
    background: '/scenes/scena7.png',
    onEnter: [
      {
        condition: (s) => !s.flags.scena7_intro_hotovo,
        action: [
          { type: 'SET_FLAG', key: 'scena7_intro_hotovo', value: true },
          { type: 'SHOW_TEXT', text: 'Nastavil jsem tam čtvrté patro, tak uvidíme, kde mě to vysadí.', delay: 500 },
          { type: 'SHOW_TEXT', text: 'Jedeme. Vrrr-skřííí. Každý patro doprovází takovej ten zvuk, jako když brousíš nůž o beton. Dva... tři... no tak, ještě kousek...', delay: 4500 },
          { type: 'SHOW_TEXT', text: 'Kabinou to škublo tak, že mi cvakly zuby o sklo masky. A ticho. To nejhorší ticho na světě. Světlo zhaslo a zbyla jen ta moje bludička na rameni. \'Tak a je to,\' řekl by Pat nebo Mat. Já říkám něco mnohem sprostšího.', delay: 9500 },
          { type: 'SHOW_TEXT', text: 'Dveře se ani nehnou. Jsou zablokovaný někde mezi patry. Koukám přímo do betonový zdi šachty. Tohle je past na myši a já jsem ta myš. Musím se odsud dostat, než mi v týhle masce dojde trpělivost... nebo kyslík.', delay: 16000 }
        ]
      }
    ],
    hotspots: [
      {
        id: 'dira_ve_strope',
        label: 'dira_ve_strope',
        x: 23,
        y: 5,
        w: 15,
        h: 12,
        hoverText: 'Díra ve stropě',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Zatraceně, ta díra ve stropě vypadá, že by se tam dalo projít...', delay: 2000 },
              { type: 'CHANGE_SCENE', sceneId: 'scena8' }
            ]
          }
        ]
      }
    ]
  },

  scena8: {
    id: 'scena8',
    background: '/scenes/scena8.png',
    hotspots: [
      {
        id: 'lezt_nahoru',
        label: 'Lézt nahoru',
        x: 0,
        y: 0,
        w: 100,
        h: 20,
        hoverText: 'Lézt nahoru',
        onClick: [
          {
            condition: (s) => s.inventory.includes('nozik'),
            action: [
              { type: 'CHANGE_SCENE', sceneId: 'scena9' }
            ]
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Ještě jsi nenašel všechno. Cítím, že se tu někde povaluje něco, co by se mohlo hodit, než se vydám nahoru do neznáma.' }
          }
        ]
      },
      {
        id: 'nozik',
        label: 'Kapesní nožík',
        x: 71, y: 48, w: 3, h: 10,
        hoverText: 'Kapesní nožík',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Někdo ho tu nechal zapíchnutej v trámku. Rukojeť je omotaná izolačkou, čepel vypadá celkem solidně. Možná tu zbyl po posledním opraváři, co měl víc štěstí než já. Beru ho!' },
              { type: 'ADD_ITEM', itemId: 'nozik' }
            ]
          },
        ]
      }
    ]
  },

  scena9: {
    id: 'scena9',
    background: '/scenes/scena9.png',
    hotspots: [
      {
        id: 'kodovy_zamek',
        label: 'Kódový zámek',
        x: 8, y: 48, w: 4, h: 13,
        hoverText: 'Kódový zámek',
        onClick: [
          {
            condition: (s) => !s.flags.zamek_otevren,
            action: [
              { type: 'SHOW_TEXT', text: 'Je to zamčený. Ale vypadá to, že by to mohlo jít otevřít.' },
              { type: 'OPEN_POPUP', popupId: 'popup_zamek' }
            ]
          },
          {
            condition: (s) => s.flags.zamek_otevren,
            action: { type: 'CHANGE_SCENE', sceneId: 'scena10' }
          }
        ]
      },
      {
        id: 'noviny',
        label: 'Noviny',
        x: 46,
        y: 62,
        w: 6,
        h: 7,
        hoverText: 'Noviny',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Dotazník: Kolik písmen měla barva skříňky, skříňky, skříňky. Počkat, že by to byla nějaká hádanka.....' },
              { type: 'OPEN_POPUP', popupId: 'popup_noviny' }
            ]
          }
        ]
      }
    ]
  },

  popup_zamek: {
    id: 'popup_zamek',
    background: '/scenes/popup3.png',
    aspectRatio: '0.65',
    puzzle: {
      type: 'code_input',
      question: 'VLOŽTE KÓD',
      solution: '2641',
      onSolve: [
        { type: 'SET_FLAG', key: 'zamek_otevren', value: true },
        { type: 'SHOW_TEXT', text: 'Cvak! Zámek se s hlasitým skřípěním otevřel. Povedlo se.' },
        { type: 'CLOSE_POPUP' }
      ],
      onFail: { type: 'SHOW_TEXT', text: 'Přístup odepřen. Neplatný kód.' }
    },
    hotspots: []
  },

  popup_noviny: {
    id: 'popup_noviny',
    background: '/scenes/popup2.jpg',
    hotspots: []
  },

  scena10: {
    id: 'scena10',
    background: '/scenes/scena10.png',
    hotspots: [
      {
        id: 'konec',
        label: 'Konec',
        x: 40, y: 40, w: 20, h: 20,
        hoverText: 'Pokračování příště...',
        onClick: [{ condition: (s) => true, action: { type: 'SHOW_TEXT', text: 'Gratuluji! Právě jsi dokončil tuto část hry. Pokračování příště...' } }]
      }
    ]
  },
};



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
    image: '/items/paklic.png',
    description: 'Starý ohlý paklíč.',
  },
  tyc: {
    id: 'tyc',
    name: 'Tyč',
    image: '/items/tyc.png',
    description: 'Stará ocelová tyč.',
  },
  oblek: {
    id: 'oblek',
    name: 'Oblek',
    image: '/items/oblek.png',
    description: 'Protiradiační oblek',
  },
  svitilna: {
    id: 'svitilna',
    name: 'Svítilna',
    image: '/items/svitilna.png',
    description: 'Svítílna, škoda, že jí došla šťáva'
  },
  baterky: {
    id: 'baterky',
    name: 'Batalerie',
    image: '/items/baterky.png',
    description: 'Nové alkalické baterie.'
  },
  nozik: {
    id: 'nozik',
    name: 'Kapesní nožík',
    image: '/items/nozik.png',
    description: 'Starý kapesní nožík.'
  }
};



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
