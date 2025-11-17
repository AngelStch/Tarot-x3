// src/game/components/GameTable.ts
import { Application, Container, Graphics } from 'pixi.js';
import { Camera3d } from 'pixi-projection';
import { Card } from '../Card';

export class GameTable {
  public readonly container: Container;
  public readonly cards: Card[] = [];

  constructor(app: Application, camera: Camera3d) {
    const { width, height } = app.screen;

    this.container = new Container();
    this.container.position.set(width / 2, height / 2 - 40);
    camera.addChild(this.container);

    // Table background
    const surf = new Graphics();
    surf.beginFill(0x111827);
    surf.drawRoundedRect(-330, -190, 660, 380, 50);
    surf.endFill();
    this.container.addChild(surf);

    // Cards
    const W = 140, H = 200, SPACING = 180;

    for (let i = 0; i < 3; i++) {
      const card = new Card(W, H, app.renderer);
      card.position.set((i - 1) * SPACING, 0);

      if (i === 0) card.rotation = -0.15;
      if (i === 2) card.rotation = 0.15;

      this.cards.push(card);
      this.container.addChild(card);
    }
  }
}
