# Renobyte — Estrutura para Deploy (GitHub Pages)

## Estrutura de Pastas

```
/  (raiz do repositório)
├── index.html                  ← Landing page (página principal)
├── _nojekyll                   ← Necessário para GitHub Pages ignorar Jekyll
├── README.md
│
├── Renobyte/
│   ├── Styles/
│   │   └── Index.css           ← CSS da landing page
│   ├── Scripts/
│   │   └── Index.js            ← JS da landing page
│   └── imgs/
│       ├── image-2.png         ← Imagem notícia 1 (adicionar manualmente)
│       ├── image-3.png         ← Imagem notícia 3
│       └── LixosLugar.png      ← Imagem notícia 2 (adicionar manualmente)
│
└── jogo/
    ├── index.html              ← Página do jogo
    ├── style.css               ← CSS do jogo (adicionar manualmente)
    └── game.js                 ← JS do jogo (adicionar manualmente)
```

## ⚠️ Arquivos que precisam ser adicionados manualmente

Coloque estes arquivos nas pastas indicadas antes do deploy:

- `jogo/style.css` — CSS do jogo
- `jogo/game.js` — lógica do jogo
- `Renobyte/imgs/image-2.png` — imagem da notícia 1
- `Renobyte/imgs/LixosLugar.png` — imagem da notícia 2

## Deploy no GitHub Pages

1. Faça push de toda essa estrutura para a branch `main` (ou `gh-pages`)
2. No repositório GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)**
3. Aguarde ~1 minuto e acesse: `https://<seu-usuario>.github.io/<nome-do-repo>/`

## O que foi alterado

- **Botão "Jogar Agora"** agora aponta para `./jogo/index.html` (abre em nova aba)
- **Seção "Tipos de Lixo"** corrigida para exibir apenas as 4 categorias do jogo:
  - 🔵 Linha Azul — Eletrodomésticos pequenos e ferramentas
  - 🟢 Linha Verde — Informática e telefonia
  - 🟤 Linha Marrom — Áudio e vídeo
  - ⬜ Linha Branca — Grandes eletrodomésticos
  - *(Linha Vermelha removida pois não existe no jogo)*
