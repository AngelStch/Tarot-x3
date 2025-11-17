# 🎴 Tarot x3 – Pixi.js Projection Game

A polished casino-style 3-card multiplier game built with **Pixi.js v7**, **pixi-projection**, **TypeScript (strict)** and **GSAP**.  
Features **3D card flipping**, **auto-play**, **speed modes**, **betting system**, **error & result popups**, and a **clean modular architecture**.

---

## 🚀 How to Run

### Install dependencies
```bash
npm install
```

### Start dev server
```bash
npm run dev
```

Runs at:
```
http://localhost:5173/
```

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 🔄 State Machine Flow
```
Idle → RoundStart → Reveal → Result → Idle
```

**Idle** – Player can press PLAY or enable AUTO  
**RoundStart** – Cards reset + table bounce  
**Reveal** – Cards flip one by one  
**Result** – Shows multipliers, product & payout  
**Idle** – Restart via “Play Again” or continue via auto-play  

---

## 📁 Project Structure
```
src/
 ├── core/
 │    ├── GameState.ts
 │    ├── StateMachine.ts
 │    └── gsapHelpers.ts
 │
 ├── game/
 │    ├── Game.ts
 │    ├── Card.ts
 │    ├── MultiplierTable.ts
 │    ├── ResultPopup.ts
 │    ├── ErrorPopup.ts
 │    ├── BetUI.ts
 │
 │    └── components/
 │          ├── GameTable.ts
 │          ├── GameButtons.ts
 │          ├── GameFlow.ts
 │          ├── GamePopups.ts
 │          └── GameBetting.ts
 │
 ├── types/
 │    └── pixi-projection.d.ts
 │
 ├── index.ts
 ├── index.html
 ├── vite.config.mjs
 ├── tsconfig.json
 ├── eslint.config.cjs
 └── README.md
```

---

## 🔥 Game Features

### 🎴 3D Card Flip
Smooth GSAP flip animations compatible with Pixi v7.

### ⚡ Speed Modes
- regular  
- fast  
- instant  

### 🔁 Auto-Play
- Continuous play  
- Auto-restart  
- Closes popup instantly  
- Auto-disables on low balance  

### 💰 Balance + Betting
- Default bet: 5  
- Min: 1  
- Max: 20  
- Animated balance  
- Error popup  

---

## 🧠 AI Log

### Какво представлява render loop в Pixi.js?
Render loop-ът е непрекъснат цикъл, в който Pixi.js обновява сцената и я рендира на екрана.
Той е базиран на requestAnimationFrame() и осигурява smooth анимации.

### Каква е разликата между Container и Sprite?
Sprite – визуален елемент с текстура.
Container – група от елементи, без собствена текстура.
Containers се използват за структуриране, позициониране и групиране.

### Какво е anchor и pivot в Pixi.js?
anchor е относителна точка на привързване (0..1) при спрайтове.
pivot е абсолютна координата, около която се върти/мащабира обектът.

### Какво представлява асинхронното зареждане на текстури?
Pixi.js зарежда изображения чрез Loader или Texture.from().
Текстурата не е налична мигновено – зареждането е async и трябва да се изчака преди да се използва.

### Какво е batching?
Batching е техника за групиране на множество draw calls в един.
Pixi.js прави автоматичен batching за:
sprites
текстури
graphics objects (частично)
Това е критично за performance.

### Какво е .prettierrc?
.prettierrc е конфигурационният файл на Prettier — автоматичен formatter, който:
подрежда кода автоматично
премахва излишни интервали
форматира кавички, скоби, разстояния
прави кода консистентен, независимо кой го пише
предотвратява “style” конфликти в екипите
С Prettier, всеки път когато запазиш файла (ако използваш format on save), кодът ти се форматира автоматично според тези правила.

### Как работи interaction system в Pixi.js?
Interaction system "хит-тества" елементите и вдига събития като:
pointerdown
pointertap
pointermove
и превръща canvas в интерактивен слой.

### Каква е разликата между Graphics и Sprite?
Graphics рендира primitive shapes (rect, circle…)
Sprite използва bitmap texture
Graphics е по-бавно при анимации → Sprite е по-оптимален.

### Какво е Mesh?
Mesh е custom геометрия + текстура → позволява напълно custom форми.

### Как работи zIndex в Pixi.js?
PIXI не сортира авто по zIndex → трябва да включиш:
container.sortableChildren = true;
child.zIndex = 10;

### Каква е ролята на Camera3d?
Camera3d въвежда perspective projection, позволявайки:
накланяне на спрайтове
3D ротации (Euler ъгли)
позициониране в пространство (x,y,z)

### Каква е разликата между Sprite и Sprite3d?
Sprite: 2D
Sprite3d: има матрица за 3D трансформации → може да се накланя, върти, променя перспектива.

### Защо в Pixi v7 projection API-то е по-ограничено?
Pixi.js v7 премахна няколко deprecated API-та, което налага:
използване на Sprite3d
директно задаване на euler и position3d

### Какво е perspective transform?
Perspective transform променя размера и ъгъла на обектите според тяхната Z позиция → наслоява 3D ефект върху 2D canvas.

### Какво представлява GSAP timeline?
Timeline е секвенция от анимации подредени във времето.
Позволява:
chaining
reverse
repeat
control (pause, play)

### Какво е ease функция?
Функция, която дефинира ускорението/забавянето на анимацията:
linear
ease-in
ease-out
back.out
elastic
Това прави анимациите много по-естествени.

### Какво прави GSAP ticker?
Ticker е event loop на GSAP.
Позволява синхрон между анимации и Pixi render loop.

### Как да спра GSAP анимация?
gsap.killTweensOf(object); или
timeline.kill();

### Какво е tween?
Tween е анимация, която променя свойство от стойност A до B.

### Как реализирахте Weighted Random Multiplier Selection?
Използва се алгоритъм:
randomPoint = Math.random() * totalWeight
iterate entries:
    accumulator += weight
    if accumulator >= randomPoint → chosen
Това е оптимален O(n) метод.

### Какво представлява разделянето на Game.ts на компоненти?
Създадени са:
GameTable – UI на масата
GameButtons – бутони
GameFlow – цялата логика на рундове
GamePopups – управление на popup-и
GameBetting – баланс + залози
Това подобрява:
четимост
тестируемост
scalability

### Как е предотвратен race condition между autoplay и резултатния popup?
Auto-play затваря popup-а с hideInstant()
ResultPopup показва PLAY AGAIN само при manual play
GameFlow гарантира че state винаги се връща към Idle преди нов рунд

### Как е структурирана архитектурата от тип State Machine?
States:
Idle
RoundStart
Reveal
Result
Transitions се логват и управляват входа от UI.

### Какво е double buffering в рендеринга?
Canvas браузърите използват две видеопамети:
front buffer (показва се)
back buffer (рендериране)
Pixi.js рендерира в back buffer → swap → визуално smooth резултат.

### Какво е texture atlas и защо е полезно?
Texture atlas = много изображения в един sheet.
Предимства:
по-малко мрежови заявки
по-малко texture binds
по-добър performance

### Как се предотвратяват blurry textures?
Чрез:
texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
renderer.resolution = 2;

### Защо използваме pivot за card flipping?
Пивотът дефинира ос на въртене → при flip трябва да е центърът на картата.

### Как се прави responsive layout в Pixi.js?
използване на resize listener
преизчисляване на позиции
динамични anchor-и

### How to architect Game.ts?
Split into modules:
- GameTable  
- GameButtons  
- GameFlow  
- GamePopups  
- GameBetting  

### How to stabilize flips?
Use scale-based flip instead of deprecated projection rotation.

### Auto-play safety?
- Hide popup instantly  
- Correct state transitions  
- Disable auto on insufficient balance  

---

## ⭐ What I Would Add Next
- Particle effects  
- Sound  
- Mobile UI  
- Animated balance  
- Win streak bonus  

---

## 🛠 Technologies
- Pixi.js v7  
- pixi-projection  
- GSAP 3  
- TypeScript  
- Vite  
- ESLint + Prettier  
