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
    background: '/scenes/scena1_fhd.png',   // ← cesta k PNG v /public/scenes/
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
        x: 48,
        y: 37,
        w: 12,
        h: 35,
        hoverText: 'Stará plechová skříňka.',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['scena1_skrinka'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Plechová skříňka. Drží pohromadě jen silou vůle a nánosem špíny. Na boku je fixou napsáno "Nedotýkat se, kouše".' },
          },
          {
            condition: (s) => (s.clickCounts?.['scena1_skrinka'] || 0) === 2,
            action: [
              { type: 'SHOW_TEXT', text: 'Cvak. No sláva. Vevnitř je jen hromada starých hlášení o narušení prostoru a... moment, co je tohle?' },
              { type: 'ADD_ITEM', itemId: 'stipacky' }
            ],
          },
          {
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
        x: 55.7, y: 27, w: 2.5, h: 10,
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
    background: '/scenes/scena2_fhd.png',
    hotspots: [
      {
        id: 'kos',
        label: 'Koš',
        x: 18, y: 65, w: 14, h: 16,
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
        x: 55.5, y: 5, w: 12, h: 12,
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
        x: 55.5, y: 28, w: 12, h: 12,
        hoverText: 'Rozbité okno',
        onClick: [
          {
            condition: (s) => s.inventory.includes('tyc') && s.inventory.includes('paklic'),
            action: [
              { type: 'SHOW_TEXT', text: 'Tyč jako žebřík. Starý trik. A moje záda mi to nikdy neodpustí.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena3' }
            ]
          },
          {
            condition: (s) => !s.inventory.includes('tyc') || !s.inventory.includes('paklic'),
            action: { type: 'SHOW_TEXT', text: 'Ještě jsem nesebral všechno. Cítím, že mi tu ještě něco chybí, než se pokusím vylézt nahoru.' },
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
        x: 52, y: 52, w: 16, h: 15,
        hoverText: 'Stará matrace',
        onClick: [
          {
            condition: (s) => s.inventory.includes('tyc') && s.inventory.includes('paklic'),
            action: [
              { type: 'SHOW_TEXT', text: 'Šprajcnout, podepřít a... tradá! Teď je to stabilní jako státní rozpočet těsně před volbama. Vypadá to sice blbě, ale svoji funkci to splní.' },
              { type: 'CHANGE_SCENE', sceneId: 'scena3' }
            ],
          },
          {
            condition: (s) => s.inventory.includes('tyc') && !s.inventory.includes('paklic'),
            action: { type: 'SHOW_TEXT', text: 'Mám tyč na podepření, ale pořád mi něco chybí. Ještě jsem tu nesebral všechno.' },
          },
          {
            condition: (s) => !s.inventory.includes('tyc') && s.inventory.includes('paklic'),
            action: { type: 'SHOW_TEXT', text: 'Nejsem sebevrah. Na tohle stoupnout bez vzpěry, tak se prohnu až k zemi. Potřebuju něco pevného, čím to podepřít.' },
          },
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Fuj tajbl, ta už něco pamatuje. Je smradlavá, flekatá a těžká jako hříchy mýho mládí. Kdybych to podepřel nějakou tyčí, mohl bych se na ni vyšplhat k tomu oknu.' },
          },
        ],
      },

      {
        id: 'tyc',
        label: 'tyc',
        x: 45.2, y: 17, w: 3, h: 50,
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
        x: 75, y: 37, w: 18, h: 27,
        hoverText: 'Dveře s nápisem',
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
    background: '/scenes/scena3_fhd.png',
    hotspots: [
      {
        id: 'nahoru',
        label: 'nahoru',
        x: 5,
        y: 0,
        w: 30,
        h: 85,
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
        x: 74, y: 0, w: 26, h: 90,
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
        x: 63.3, y: 33, w: 8, h: 20,
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
        x: 52, y: 73, w: 2.5, h: 5,
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
    background: '/scenes/scena4_fhd.png',
    hotspots: [
      {
        id: 'gumaky',
        label: 'Gumáky',
        x: 43.3, y: 59.2, w: 8, h: 12,
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
        x: 17, y: 65, w: 20, h: 35,
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
        x: 53, y: 15, w: 10, h: 50,
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
        x: 61.5, y: 65, w: 10, h: 8,
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
        x: 66, y: 15, w: 12, h: 45,
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
    background: '/scenes/scena5_fhd.png',
    hotspots: [
      {
        id: 'nahoru',
        label: 'nahoru',
        x: 5,
        y: 0,
        w: 30,
        h: 85,
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
        x: 74, y: 0, w: 26, h: 90,
        hoverText: 'Jít dolů',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Všechno, co potřebuju, už z tam mám.' }
          }
        ]
      },

      {
        id: 'elektricka_skrinka',
        label: 'Skříňka s elektrikou',
        x: 63.3, y: 33, w: 8, h: 20,
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
        x: 52, y: 73, w: 2.5, h: 5,
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
    background: '/scenes/scena6_fhd.png',
    hotspots: [
      {
        id: 'rozpadle_schodiste',
        label: 'rozpadle_schodiste',
        x: 45,
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
        x: 73, y: 20, w: 20, h: 70,
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
    background: '/scenes/scena7_fhd.png',
    onEnter: [
      {
        condition: (s) => !s.flags.scena7_intro_hotovo,
        action: [
          { type: 'SET_FLAG', key: 'scena7_intro_hotovo', value: true },
          { type: 'SHOW_TEXT', text: 'Nastavil jsem tam čtvrté patro, tak uvidíme, kde mě to vysadí.', delay: 500 },
          { type: 'SHOW_TEXT', text: 'Jedeme. Vrrr-skřííí. Každý patro doprovází takovej ten zvuk, jako když brousíš nůž o beton. Dva... tři... no tak, ještě kousek...', delay: 8500 },
          { type: 'SHOW_TEXT', text: 'Kabinou to škublo tak, že mi cvakly zuby o sklo masky. A ticho. To nejhorší ticho na světě. Světlo zhaslo a zbyla jen ta moje bludička na rameni. \'Tak a je to,\' řekl by Pat nebo Mat. Já říkám něco mnohem sprostšího.', delay: 16500 },
          { type: 'SHOW_TEXT', text: 'Dveře se ani nehnou. Jsou zablokovaný někde mezi patry. Koukám přímo do betonový zdi šachty. Tohle je past na myši a já jsem ta myš. Musím se odsud dostat, než mi v týhle masce dojde trpělivost... nebo kyslík.', delay: 26000 }
        ]
      }
    ],
    hotspots: [
      {
        id: 'dira_ve_strope',
        label: 'dira_ve_strope',
        x: 28,
        y: 5,
        w: 15,
        h: 12,
        hoverText: 'Díra ve stropě',
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'SHOW_TEXT', text: 'Zatraceně, ta díra ve stropě vypadá, že by se tam dalo projít...' },
              { type: 'CHANGE_SCENE', sceneId: 'scena8' }
            ]
          }
        ]
      },
      {
        id: 'tlacitka_vytahu',
        label: 'Tlačítka',
        x: 81,
        y: 37,
        w: 8,
        h: 30,
        hoverText: 'Tlačítka',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Myslím si, že se nic nestane, když je zmáčknu.' }
          }
        ]
      },
      {
        id: 'dvere_vytahu',
        label: 'Dveře výtahu',
        x: 35,
        y: 30,
        w: 23,
        h: 50,
        hoverText: 'Dveře',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Dveře jsou zaseknutý. Musím jít jinudy.' }
          }
        ]
      }
    ]
  },

  scena8: {
    id: 'scena8',
    background: '/scenes/scena8_fhd.png',
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
        x: 71, y: 48.5, w: 3, h: 10,
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
    background: '/scenes/scena9_fhd.png',
    hotspots: [
      {
        id: 'kodovy_zamek',
        label: 'Kódový zámek',
        x: 20, y: 48, w: 4, h: 15,
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
        x: 54,
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
      },

      {
        id: 'tekutina',
        label: 'Tekutina',
        x: 32, y: 67, w: 15, h: 11,
        hoverText: 'Rozteklá tekutina',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'Něco je rozlitý na zemi. Podle toho, jak to rozežírá tu podlahovou krytinu, to asi nebude jenom vylitý kafe noční směny. Radši to obejdu velkým obloukem.' },
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
    background: '/scenes/scena10_fhd.png',
    hotspots: [
      {
        id: 'noc',
        label: 'Noc',
        x: 39.5,
        y: 15,
        w: 27,
        h: 35,
        hoverText: 'Měsíc',
        onClick: [
          {
            condition: (s) => true,
            action:
              [
                { type: 'SHOW_TEXT', text: 'To už bude půlnoc? No, čekal jsem, že mně to tolik času nezabere.' }
              ]
          }
        ]
      },
      {
        id: 'gauc',
        label: 'Starý gauč',
        x: 10,
        y: 50,
        w: 33,
        h: 40,
        hoverText: 'Rozpadlý gauč',
        onClick: [
          {
            condition: (s) => true,
            action:
              [
                { type: 'SHOW_TEXT', text: '„Ta pohovka už má nejlepší léta dávno za sebou. Je prožraná až na péra, jako by si na ní někdo brousil zuby. Sedat si na ni nebudu, ještě by mě sežrala zaživa i s botama.' }
              ]
          }
        ]
      },

      {
        id: 'papir',
        label: 'Recyklovaný papír',
        x: 50,
        y: 79,
        w: 14,
        h: 17,
        hoverText: 'Recyklovaný papír',
        onClick: [
          {
            condition: (s) => true,
            action:
              [
                { type: 'OPEN_POPUP', popupId: 'popup_papir' }
              ]
          }
        ]
      },

      {
        id: 'do_kuchyne',
        label: 'Do kuchyně',
        x: 0,
        y: 0,
        w: 16,
        h: 100,
        hoverText: 'Projít dál',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'CHANGE_SCENE', sceneId: 'scena11' }
          }
        ]
      }
    ]
  },

  popup_papir: {
    id: 'popup_papir',
    background: '/scenes/popup4.png',
    hotspots: []
  },

  scena11: {
    id: 'scena11',
    background: '/scenes/scena11_fhd.png',
    onEnter: [
      {
        condition: (s) => !s.flags.scena11_intro_hotovo,
        action: [
          { type: 'SET_FLAG', key: 'scena11_intro_hotovo', value: true },
          { type: 'SHOW_TEXT', text: '„No nazdar, tohle není kuchyň, to je biologická zbraň v rozkladu, ze který by se osypal i vrahoun na útěku.“' }
        ]
      }
    ],
    hotspots: [
      {
        id: 'kuchyne',
        label: 'Kuchyně',
        x: 0,
        y: 0,
        w: 40,
        h: 100,
        hoverText: 'Kuchyňská linka',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'V kuchyni nic nepotřebuju, ledaže by tady na mě číhal vrah a já se potřeboval bránit, tak si vypůjčím nějakou polorozpadlou vařečku.' }
          }
        ]
      },
      {
        id: 'zahadna_skrinka',
        label: 'Záhadná skříňka',
        x: 72,
        y: 25,
        w: 14,
        h: 60,
        hoverText: 'Záhadná skříňka',
        onClick: [
          {
            condition: (s) => true,
            action: { type: 'SHOW_TEXT', text: 'To vypadá jako to, co hledám. Starej vypínač, ale zamklej...' }
          }
        ]
      },
      {
        id: 'pletivo',
        label: 'Pletivo',
        x: 85,
        y: 22,
        w: 10,
        h: 65,
        hoverText: 'Pletivo',
        condition: (s) => (s.clickCounts?.['scena11_zahadna_skrinka'] || 0) > 0,
        onClick: [
          {
            condition: (s) => true,
            action: [
              { type: 'OPEN_POPUP', popupId: 'popup_vypinac' },
              { type: 'SHOW_TEXT', text: 'Jsem rád, že se mi ti štípačky po otevření brány nerozpadly a že je ještě teď můžu použít.', delay: 500 },
              { type: 'SHOW_TEXT', text: 'Hm, to bude zas něco na mozek. Jsou tu nějaké pojistky, drátky a něco, co se tváří, jako tlakoměr.', delay: 4500 }
            ]
          }
        ]
      }
    ]
  },

  popup_vypinac: {
    id: 'popup_vypinac',
    background: '/scenes/popup5.png',
    hotspots: [
      {
        id: 'pojistka1',
        label: 'Pojistka 1',
        x: 46, y: 30, w: 5, h: 18,
        hoverText: 'Pojistka 1',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['popup_vypinac_pojistka1'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Nad pojistkami jsou vruty, můžu je vyšroubovat nebo zašroubovat zpět.' }
          },
          {
            condition: (s) => !s.flags.pojistka1_out && s.flags.pojistka2_out && s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'pojistka1_out', value: true },
              { type: 'SHOW_TEXT', text: 'Pojistka 1 je vyřazená. Něco se děje!' }
            ]
          },
          {
            condition: (s) => !s.flags.pojistka1_out,
            action: [
              { type: 'SET_FLAG', key: 'pojistka1_out', value: true },
              { type: 'SHOW_TEXT', text: 'Pojistka 1 je vyřazená. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          },
          {
            condition: (s) => s.flags.pojistka1_out,
            action: [
              { type: 'SET_FLAG', key: 'pojistka1_out', value: false },
              { type: 'SHOW_TEXT', text: 'Pojistku 1 jsem zašrouboval zpět. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          }
        ]
      },
      {
        id: 'pojistka2',
        label: 'Pojistka 2',
        x: 53, y: 30, w: 5, h: 18,
        hoverText: 'Pojistka 2',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['popup_vypinac_pojistka2'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Tady ten vrut vypadá, že jde taky povolit. Vyšroubovat?' }
          },
          {
            condition: (s) => !s.flags.pojistka2_out && s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'pojistka2_out', value: true },
              { type: 'SET_FLAG', key: 'trigger_glitch', value: true },
              { type: 'SHOW_TEXT', text: 'Pojistka 2 je vyřazená. Něco se děje!' },
              { type: 'CHANGE_SCENE', sceneId: 'scena12', delay: 2000 }
            ]
          },
          {
            condition: (s) => !s.flags.pojistka2_out,
            action: [
              { type: 'SET_FLAG', key: 'pojistka2_out', value: true },
              { type: 'SHOW_TEXT', text: 'Pojistka 2 je vyřazená. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          },
          {
            condition: (s) => s.flags.pojistka2_out,
            action: [
              { type: 'SET_FLAG', key: 'pojistka2_out', value: false },
              { type: 'SHOW_TEXT', text: 'Pojistku 2 jsem zašrouboval zpět. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          }
        ]
      },
      {
        id: 'pojistka3',
        label: 'Pojistka 3',
        x: 61, y: 30, w: 5, h: 18,
        hoverText: 'Pojistka 3',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['popup_vypinac_pojistka3'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Zkusím i tuhle pojistku vyšroubovat...' }
          },
          {
            condition: (s) => !s.flags.pojistka3_out && s.flags.pojistka2_out && s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'pojistka3_out', value: true },
              { type: 'SHOW_TEXT', text: 'Pojistka 3 je vyřazená. Něco se děje!' }
            ]
          },
          {
            condition: (s) => !s.flags.pojistka3_out,
            action: [
              { type: 'SET_FLAG', key: 'pojistka3_out', value: true },
              { type: 'SHOW_TEXT', text: 'Pojistka 3 je vyřazená. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          },
          {
            condition: (s) => s.flags.pojistka3_out,
            action: [
              { type: 'SET_FLAG', key: 'pojistka3_out', value: false },
              { type: 'SHOW_TEXT', text: 'Pojistku 3 jsem zašrouboval zpět. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          }
        ]
      },
      {
        id: 'zeleny_dratek',
        label: 'Zelený drátek',
        x: 42, y: 50, w: 7, h: 20,
        hoverText: 'Zelený drátek',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['popup_vypinac_zeleny_dratek'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Zelený drát. Můžu ho přestřihnout nebo zase spojit k sobě.' }
          },
          {
            condition: (s) => !s.flags.zeleny_dratek_cut && s.flags.pojistka2_out,
            action: [
              { type: 'SET_FLAG', key: 'zeleny_dratek_cut', value: true },
              { type: 'SET_FLAG', key: 'trigger_glitch', value: true },
              { type: 'SHOW_TEXT', text: 'Zelený drátek jsem přestřihl. Něco se děje!' },
              { type: 'CHANGE_SCENE', sceneId: 'scena12', delay: 2000 }
            ]
          },
          {
            condition: (s) => !s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'zeleny_dratek_cut', value: true },
              { type: 'SHOW_TEXT', text: 'Zelený drátek jsem přestřihl. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          },
          {
            condition: (s) => s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'zeleny_dratek_cut', value: false },
              { type: 'SHOW_TEXT', text: 'Zelený drátek jsem spojil zpět. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          }
        ]
      },
      {
        id: 'zluty_dratek',
        label: 'Žlutý drátek',
        x: 50, y: 50, w: 7, h: 20,
        hoverText: 'Žlutý drátek',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['popup_vypinac_zluty_dratek'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Žlutý drát. Tenhle můžu taky zkusit přestřihnout.' }
          },
          {
            condition: (s) => !s.flags.zluty_dratek_cut && s.flags.pojistka2_out && s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'zluty_dratek_cut', value: true },
              { type: 'SHOW_TEXT', text: 'Žlutý drátek jsem přestřihl. Něco se děje!' }
            ]
          },
          {
            condition: (s) => !s.flags.zluty_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'zluty_dratek_cut', value: true },
              { type: 'SHOW_TEXT', text: 'Žlutý drátek jsem přestřihl. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          },
          {
            condition: (s) => s.flags.zluty_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'zluty_dratek_cut', value: false },
              { type: 'SHOW_TEXT', text: 'Žlutý drátek jsem spojil zpět. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          }
        ]
      },
      {
        id: 'cerveny_dratek',
        label: 'Červený drátek',
        x: 58, y: 50, w: 7, h: 20,
        hoverText: 'Červený drátek',
        onClick: [
          {
            condition: (s) => (s.clickCounts?.['popup_vypinac_cerveny_dratek'] || 0) === 0,
            action: { type: 'SHOW_TEXT', text: 'Červený drát. Tenhle vypadá důležitě. Přestřihnout?' }
          },
          {
            condition: (s) => !s.flags.cerveny_dratek_cut && s.flags.pojistka2_out && s.flags.zeleny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'cerveny_dratek_cut', value: true },
              { type: 'SHOW_TEXT', text: 'Červený drátek jsem přestřihl. Něco se děje!' }
            ]
          },
          {
            condition: (s) => !s.flags.cerveny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'cerveny_dratek_cut', value: true },
              { type: 'SHOW_TEXT', text: 'Červený drátek jsem přestřihl. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          },
          {
            condition: (s) => s.flags.cerveny_dratek_cut,
            action: [
              { type: 'SET_FLAG', key: 'cerveny_dratek_cut', value: false },
              { type: 'SHOW_TEXT', text: 'Červený drátek jsem spojil zpět. Zatím se nic nestalo, nevím, jestli je to dobře nebo špatně.' }
            ]
          }
        ]
      }
    ]
  },
  scena12: {
    id: 'scena12',
    background: '/scenes/scena12_fhd.png',
    onEnter: [
      { type: 'CLOSE_POPUP' },
      { type: 'SET_FLAG', key: 'trigger_glitch', value: false },
      { type: 'SET_FLAG', key: 'trigger_blackout', value: false },
      {
        type: 'SHOW_TEXT',
        text: 'Někdo sem přijíždí, vystupuje z auta. Počkat počkat. Vždyť to jsem já. Sakra co se děje?!...'
      },
      { type: 'SET_FLAG', key: 'trigger_blackout', value: true, delay: 10000 },
      { type: 'SHOW_CREDITS', text: 'Díky za zahrání!', delay: 11000 },
      { type: 'GO_TO_LOBBY', delay: 17000 }
    ],
    hotspots: []
  }
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
    name: 'Baterie',
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
