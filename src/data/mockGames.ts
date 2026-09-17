import type { Game, Genre } from "../types/game";

export const MOCK_GENRES: Genre[] = [
  {
    "id": 4,
    "name": "Action",
    "slug": "action",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg"
  },
  {
    "id": 5,
    "name": "RPG",
    "slug": "role-playing-games-rpg",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_616x353.jpg"
  },
  {
    "id": 3,
    "name": "Adventure",
    "slug": "adventure",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/capsule_616x353.jpg"
  },
  {
    "id": 2,
    "name": "Shooter",
    "slug": "shooter",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg"
  },
  {
    "id": 7,
    "name": "Puzzle",
    "slug": "puzzle",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/capsule_616x353.jpg"
  },
  {
    "id": 1,
    "name": "Racing",
    "slug": "racing",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/capsule_616x353.jpg"
  },
  {
    "id": 10,
    "name": "Strategy",
    "slug": "strategy",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/289070/capsule_616x353.jpg"
  },
  {
    "id": 51,
    "name": "Indie",
    "slug": "indie",
    "image_background": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg"
  }
];

export const MOCK_GAMES: Game[] = [
  {
    "id": 3328,
    "trailer_url": "https://www.youtube-nocookie.com/embed/c0i88t0Kacs",
    "slug": "the-witcher-3-wild-hunt",
    "name": "The Witcher 3: Wild Hunt",
    "released": "2015-05-18",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_616x353.jpg",
    "rating": 4.65,
    "rating_top": 5,
    "metacritic": 92,
    "playtime": 46,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 5,
        "name": "RPG",
        "slug": "role-playing-games-rpg"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      },
      {
        "platform": {
          "id": 7,
          "name": "Nintendo",
          "slug": "nintendo"
        }
      }
    ],
    "description_raw": "Культовая ролевая игра от CD PROJEKT RED. Вы — Геральт из Ривии, наемный охотник на чудовищ. Перед вами раскинулся охваченный войной континент, где вам предстоит найти Дитя Предназначения.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.600x338.jpg"
      },
      {
        "id": 2,
        "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_0901e64e9d4b8ebaea8348c194e7a3644d2d832d.600x338.jpg"
      },
      {
        "id": 3,
        "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_112b1e176c1bd271d8a565eacb6feaf90f240bb2.600x338.jpg"
      },
      {
        "id": 4,
        "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_d1b73b18cbcd5e9e412c7a1dead3c5cd7303d2ad.600x338.jpg"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: 64-bit Windows 7, 8 (8.1) | Процессор: Intel CPU Core i5-2500K 3.3GHz / AMD A10-5800K APU | ОЗУ: 6 GB | Видеокарта: Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870 | Диск: 50 GB",
      "recommended": "ОС: 64-bit Windows 10 | Процессор: Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz | ОЗУ: 8 GB | Видеокарта: Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290 | Диск: 50 GB SSD"
    }
  },
  {
    "id": 41494,
    "trailer_url": "https://www.youtube-nocookie.com/embed/qIcTM8WXFjk",
    "slug": "cyberpunk-2077",
    "name": "Cyberpunk 2077",
    "released": "2020-12-10",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    "rating": 4.25,
    "rating_top": 5,
    "metacritic": 86,
    "playtime": 62,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 5,
        "name": "RPG",
        "slug": "role-playing-games-rpg"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Приключенческая ролевая игра с открытым миром, действие которой происходит в мегаполисе Найт-Сити, где власть, роскошь и модификации тела ценятся превыше всего.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 2,
        "image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 3,
        "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 4,
        "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: 64-bit Windows 10 | Процессор: Core i7-6700 или Ryzen 5 1600 | ОЗУ: 12 GB | Видеокарта: GeForce GTX 1060 6GB или Radeon RX 580 8GB | Диск: 70 GB SSD",
      "recommended": "ОС: 64-bit Windows 10 | Процессор: Core i7-12700 или Ryzen 7 7800X3D | ОЗУ: 16 GB | Видеокарта: GeForce RTX 2060 SUPER или Radeon RX 5700 XT | Диск: 70 GB SSD"
    }
  },
  {
    "id": 3498,
    "trailer_url": "https://www.youtube-nocookie.com/embed/QkkoHAzjnUs",
    "slug": "grand-theft-auto-v",
    "name": "Grand Theft Auto V",
    "released": "2013-09-17",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/capsule_616x353.jpg",
    "rating": 4.47,
    "rating_top": 5,
    "metacritic": 96,
    "playtime": 80,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 3,
        "name": "Adventure",
        "slug": "adventure"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Чтобы выжить в неприветливом городе, трем очень разным преступникам приходится решиться на серию дерзких ограблений.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_32aa18ab3175e3002217862dd5917646d298ab6b.600x338.jpg?t=1765387725"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_2744f112fa060320d191a50e8b3a92441a648a56.600x338.jpg?t=1765387725"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_da39c16db175f6973770bae6b91d411251763152.600x338.jpg?t=1765387725"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_bd5db78286be0a7c6b2c62519099a9e27e6b06f3.600x338.jpg?t=1765387725"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 64 Bit | Процессор: Intel Core 2 Quad CPU Q6600 @ 2.40GHz / AMD Phenom 9850 | ОЗУ: 4 GB | Видеокарта: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB | Диск: 110 GB",
      "recommended": "ОС: Windows 10 64 Bit | Процессор: Intel Core i5 3470 @ 3.2GHz / AMD X8 FX-8350 @ 4GHz | ОЗУ: 8 GB | Видеокарта: NVIDIA GTX 660 2GB / AMD HD 7870 2GB | Диск: 110 GB"
    }
  },
  {
    "id": 1245620,
    "trailer_url": "https://www.youtube-nocookie.com/embed/E3Huy2cdih0",
    "slug": "elden-ring",
    "name": "Elden Ring",
    "released": "2022-02-25",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    "rating": 4.72,
    "rating_top": 5,
    "metacritic": 96,
    "playtime": 75,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 5,
        "name": "RPG",
        "slug": "role-playing-games-rpg"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Ролевой экшен от FromSoftware и Джорджа Р. Р. Мартина. Восстаньте, погасшая душа, и станьте владыкой Междуземья.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.600x338.jpg?t=1789162449"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.600x338.jpg?t=1789162449"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.600x338.jpg?t=1789162449"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_e0316c76f8197405c1312d072b84331dd735d60b.600x338.jpg?t=1789162449"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 | Процессор: INTEL CORE I5-8400 или AMD RYZEN 3 3300X | ОЗУ: 12 GB | Видеокарта: NVIDIA GEFORCE GTX 1060 3 GB или AMD RADEON RX 580 4 GB | Диск: 60 GB",
      "recommended": "ОС: Windows 10/11 | Процессор: INTEL CORE I7-8700K или AMD RYZEN 5 3600X | ОЗУ: 16 GB | Видеокарта: NVIDIA GEFORCE GTX 1070 8 GB или AMD RADEON RX VEGA 56 8 GB | Диск: 60 GB"
    }
  },
  {
    "id": 1086940,
    "trailer_url": "https://www.youtube-nocookie.com/embed/1T22wNlUiNh",
    "slug": "baldurs-gate-3",
    "name": "Baldur's Gate 3",
    "released": "2023-08-03",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg",
    "rating": 4.88,
    "rating_top": 5,
    "metacritic": 96,
    "playtime": 95,
    "genres": [
      {
        "id": 5,
        "name": "RPG",
        "slug": "role-playing-games-rpg"
      },
      {
        "id": 10,
        "name": "Strategy",
        "slug": "strategy"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Соберите отряд и вернитесь в Забытые Королевства. Вас ждет история о дружбе и предательстве, выживании и самопожертвовании, а также о зове абсолютной власти.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.600x338.jpg?t=1777363040"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.600x338.jpg?t=1777363040"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_cf936d31061b58e98e0c646aee00e6030c410cda.600x338.jpg?t=1777363040"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.600x338.jpg?t=1777363040"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 64-bit | Процессор: Intel I5 4690 / AMD FX 8350 | ОЗУ: 8 GB | Видеокарта: Nvidia GTX 970 / RX 480 (4GB+ VRAM) | Диск: 150 GB SSD",
      "recommended": "ОС: Windows 10 64-bit | Процессор: Intel i7 8700K / AMD r5 3600 | ОЗУ: 16 GB | Видеокарта: Nvidia 2060 Super / RX 5700 XT (8GB+ VRAM) | Диск: 150 GB SSD"
    }
  },
  {
    "id": 1174180,
    "trailer_url": "https://www.youtube-nocookie.com/embed/eaW0tYpxyp0",
    "slug": "red-dead-redemption-2",
    "name": "Red Dead Redemption 2",
    "released": "2018-10-26",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg",
    "rating": 4.75,
    "rating_top": 5,
    "metacritic": 97,
    "playtime": 90,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 3,
        "name": "Adventure",
        "slug": "adventure"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Америка, 1899 год. Эпоха Дикого Запада подходит к концу. Артур Морган и другие подручные Датча ван дер Линде вынуждены пуститься в бега.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg"
      },
      {
        "id": 2,
        "image": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 3,
        "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 4,
        "image": "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 | Процессор: Intel Core i5-2500K / AMD FX-6300 | ОЗУ: 8 GB | Видеокарта: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB | Диск: 150 GB",
      "recommended": "ОС: Windows 10 | Процессор: Intel Core i7-4770K / AMD Ryzen 5 1500X | ОЗУ: 12 GB | Видеокарта: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB | Диск: 150 GB"
    }
  },
  {
    "id": 4200,
    "trailer_url": "https://www.youtube-nocookie.com/embed/tax4e4hBBZc",
    "slug": "portal-2",
    "name": "Portal 2",
    "released": "2011-04-18",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/capsule_616x353.jpg",
    "rating": 4.61,
    "rating_top": 5,
    "metacritic": 95,
    "playtime": 11,
    "genres": [
      {
        "id": 2,
        "name": "Shooter",
        "slug": "shooter"
      },
      {
        "id": 7,
        "name": "Puzzle",
        "slug": "puzzle"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Оригинальная головоломка от Valve. Вам предстоит вновь взяться за портальную пушку и исследовать неизведанные лаборатории Aperture Science под надзором GLaDOS.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/ss_f3f6787d74739d3b2ec8a484b5c994b3d31ef325.600x338.jpg?t=1745363004"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/ss_6a4f5afdaa98402de9cf0b59fed27bab3256a6f4.600x338.jpg?t=1745363004"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/ss_0cdd90fafc160b52d08b303d205f9fd4e83cf164.600x338.jpg?t=1745363004"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/ss_ec35a739b4b33270eb170d9e561c5b016cba50a6.600x338.jpg?t=1745363004"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 7/Vista/XP | Процессор: 3.0 GHz P4, Dual Core 2.0 | ОЗУ: 2 GB | Видеокарта: 128 MB VRAM Pixel Shader 2.0b | Диск: 8 GB",
      "recommended": "ОС: Windows 10/11 | Процессор: Dual Core 3.0 GHz | ОЗУ: 4 GB | Видеокарта: 512 MB VRAM DirectX 9.0c | Диск: 8 GB"
    }
  },
  {
    "id": 58175,
    "trailer_url": "https://www.youtube-nocookie.com/embed/K0u_kAWLJOA",
    "slug": "god-of-war",
    "name": "God of War",
    "released": "2018-04-20",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1593500/capsule_616x353.jpg",
    "rating": 4.68,
    "rating_top": 5,
    "metacritic": 94,
    "playtime": 35,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 3,
        "name": "Adventure",
        "slug": "adventure"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      }
    ],
    "description_raw": "Отомстив богам Олимпа, Кратос поселился в суровом скандинавском царстве. Теперь он снова отец и наставник для своего сына Атрея.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_6eccc970b5de2943546d93d319be1b5c0618f21b.600x338.jpg?t=1763059412"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_f1bff24d3967a21d303d95e11ed892e3d9113057.600x338.jpg?t=1763059412"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_3670ba72c7e3e9c3c3225547ef2c1053504e62b8.600x338.jpg?t=1763059412"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_93a3ca63aa2cd8c675bbb6430324ee3f2d44b845.600x338.jpg?t=1763059412"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 64-bit | Процессор: Intel i5-2500k (4 core 3.3 GHz) или AMD Ryzen 3 1200 | ОЗУ: 8 GB | Видеокарта: NVIDIA GTX 960 (4 GB) | Диск: 70 GB",
      "recommended": "ОС: Windows 10 64-bit | Процессор: Intel i5-6600k (4 core 3.5 GHz) или AMD Ryzen 5 2400 G | ОЗУ: 8 GB | Видеокарта: NVIDIA GTX 1060 (6 GB) | Диск: 70 GB SSD"
    }
  },
  {
    "id": 730,
    "trailer_url": "https://www.youtube-nocookie.com/embed/_y9MpNcAitQ",
    "slug": "counter-strike-2",
    "name": "Counter-Strike 2",
    "released": "2023-09-27",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg",
    "rating": 4.12,
    "rating_top": 5,
    "metacritic": 82,
    "playtime": 150,
    "genres": [
      {
        "id": 2,
        "name": "Shooter",
        "slug": "shooter"
      },
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      }
    ],
    "description_raw": "Крупнейший технологический скачок в истории легендарной серии. Новый движок Source 2, отзывчивый дым и переработанные карты.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/9c8b8fd6ebb2c84a1c38541369e6c05db7f1fbe0/ss_9c8b8fd6ebb2c84a1c38541369e6c05db7f1fbe0.600x338.jpg?t=1789251637"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/4ef95eed5fcd98c576bf13e024bc6c845b622132/ss_4ef95eed5fcd98c576bf13e024bc6c845b622132.600x338.jpg?t=1789251637"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_13bb35638c0267759276f511ee97064773b37a51.600x338.jpg?t=1789251637"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_0f8cf82d019c614760fd20801f2bb4001da7ea77.600x338.jpg?t=1789251637"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 64-bit | Процессор: 4-поточный процессор Intel Core i5 750 | ОЗУ: 8 GB | Видеокарта: 1 GB VRAM с поддержкой Shader Model 5.0 | Диск: 85 GB",
      "recommended": "ОС: Windows 10/11 64-bit | Процессор: 6-ядерный Intel Core i5 или AMD Ryzen 5 | ОЗУ: 16 GB | Видеокарта: GeForce RTX 2060 / Radeon RX 6600 | Диск: 85 GB SSD"
    }
  },
  {
    "id": 367520,
    "trailer_url": "https://www.youtube-nocookie.com/embed/UAO2urG23S4",
    "slug": "hollow-knight",
    "name": "Hollow Knight",
    "released": "2017-02-24",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg",
    "rating": 4.71,
    "rating_top": 5,
    "metacritic": 90,
    "playtime": 42,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 51,
        "name": "Indie",
        "slug": "indie"
      },
      {
        "id": 3,
        "name": "Adventure",
        "slug": "adventure"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      },
      {
        "platform": {
          "id": 7,
          "name": "Nintendo",
          "slug": "nintendo"
        }
      }
    ],
    "description_raw": "Атмосферное двухмерное приключение в полуразрушенном подземном королевстве Халлоунест. Сражайтесь с порчеными тварями и раскрывайте тайны древних богов.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_5384f9f8b96a0b9934b2bc35a4058376211636d2.600x338.jpg?t=1776125684"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_d5b6edd94e77ba6db31c44d8a3c09d807ab27751.600x338.jpg?t=1776125684"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_a81e4231cc8d55f58b51a4a938898af46503cae5.600x338.jpg?t=1776125684"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_62e10cf506d461e11e050457b08aa0e2a1c078d0.600x338.jpg?t=1776125684"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 7 | Процессор: Intel Core 2 Duo E5200 | ОЗУ: 4 GB | Видеокарта: GeForce 9800GTX+ (1GB) | Диск: 9 GB",
      "recommended": "ОС: Windows 10 | Процессор: Intel Core i5 | ОЗУ: 8 GB | Видеокарта: GeForce GTX 560 | Диск: 9 GB"
    }
  },
  {
    "id": 1145360,
    "trailer_url": "https://www.youtube-nocookie.com/embed/mD8x5xLHRho",
    "slug": "hades",
    "name": "Hades",
    "released": "2020-09-17",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/capsule_616x353.jpg",
    "rating": 4.69,
    "rating_top": 5,
    "metacritic": 93,
    "playtime": 55,
    "genres": [
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      },
      {
        "id": 5,
        "name": "RPG",
        "slug": "role-playing-games-rpg"
      },
      {
        "id": 51,
        "name": "Indie",
        "slug": "indie"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 2,
          "name": "PlayStation",
          "slug": "playstation"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      },
      {
        "platform": {
          "id": 7,
          "name": "Nintendo",
          "slug": "nintendo"
        }
      }
    ],
    "description_raw": "Динамичный roguelike dungeon crawler от авторов Bastion и Transistor. Бросьте вызов богу мертвых и вырвитесь из Подземного мира Олимпа.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_c0fed447426b69981cf1721756acf75369801b31.600x338.jpg?t=1758127023"
      },
      {
        "id": 2,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_d60d7b0c4d5b023733e5b62c9a485c489159d8b3.600x338.jpg?t=1758127023"
      },
      {
        "id": 3,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_68300459a8c3daacb2ec687adcdbf4442fcc4f47.600x338.jpg?t=1758127023"
      },
      {
        "id": 4,
        "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_bcb499a0dd001f4101823f99ec5094d2872ba6ee.600x338.jpg?t=1758127023"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 7 SP1 | Процессор: Dual Core 2.4 GHz | ОЗУ: 4 GB | Видеокарта: 1GB VRAM / DirectX 10+ support | Диск: 15 GB",
      "recommended": "ОС: Windows 10 | Процессор: Dual Core 3.0 GHz+ | ОЗУ: 8 GB | Видеокарта: 2GB VRAM / DirectX 10+ support | Диск: 20 GB"
    }
  },
  {
    "id": 1551360,
    "trailer_url": "https://www.youtube-nocookie.com/embed/FYH9n3Ov126",
    "slug": "forza-horizon-5",
    "name": "Forza Horizon 5",
    "released": "2021-11-09",
    "background_image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/capsule_616x353.jpg",
    "rating": 4.45,
    "rating_top": 5,
    "metacritic": 92,
    "playtime": 68,
    "genres": [
      {
        "id": 1,
        "name": "Racing",
        "slug": "racing"
      },
      {
        "id": 4,
        "name": "Action",
        "slug": "action"
      }
    ],
    "parent_platforms": [
      {
        "platform": {
          "id": 1,
          "name": "PC",
          "slug": "pc"
        }
      },
      {
        "platform": {
          "id": 3,
          "name": "Xbox",
          "slug": "xbox"
        }
      }
    ],
    "description_raw": "Вас ждут бесконечные гонки по живописным и изменчивым просторам открытого мира Мексики на самых знаменитых автомобилях мира.",
    "short_screenshots": [
      {
        "id": 1,
        "image": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/capsule_616x353.jpg"
      },
      {
        "id": 2,
        "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 3,
        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
      },
      {
        "id": 4,
        "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80"
      }
    ],
    "pc_requirements": {
      "minimum": "ОС: Windows 10 version 15063.0 or higher | Процессор: Intel i5-4460 или AMD Ryzen 3 1200 | ОЗУ: 8 GB | Видеокарта: NVidia GTX 970 или AMD RX 470 | Диск: 110 GB",
      "recommended": "ОС: Windows 10/11 | Процессор: Intel i7-10700K или AMD Ryzen 7 3800XT | ОЗУ: 16 GB | Видеокарта: NVidia RTX 2070 или AMD RX 5700 XT | Диск: 110 GB SSD"
    }
  }
];
