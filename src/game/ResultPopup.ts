// src/game/ResultPopup.ts
import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { tweenTo } from '../core/gsapHelpers';

export class ResultPopup extends Container {
  private readonly bg: Graphics;
  private readonly txt: Text;
  public readonly playAgainLabel: Text;

  constructor() {
    super();

    this.visible = false;
    this.alpha = 0;

    this.interactive = true;
    this.interactiveChildren = true;

    // BACKGROUND
    this.bg = new Graphics();
    this.bg.beginFill(0x020617);
    this.bg.lineStyle(3, 0xf59e0b);
    this.bg.drawRoundedRect(-200, -130, 400, 260, 30);
    this.bg.endFill();
    this.bg.interactive = false;
    this.addChild(this.bg);

    // TEXT
    this.txt = new Text(
      '',
      new TextStyle({
        fill: 0xffffff,
        fontSize: 24,
        align: 'center',
        lineHeight: 34
      })
    );
    this.txt.anchor.set(0.5);
    this.txt.position.set(0, -20);
    this.addChild(this.txt);

    // PLAY AGAIN
    this.playAgainLabel = new Text(
      'PLAY AGAIN',
      new TextStyle({
        fill: 0x10b981,
        fontSize: 28,
        fontWeight: '700'
      })
    );
    this.playAgainLabel.anchor.set(0.5);
    this.playAgainLabel.position.set(0, 80);
    this.playAgainLabel.interactive = true;
    this.playAgainLabel.cursor = 'pointer';

    this.playAgainLabel.on('pointertap', () => {
      this.emit('playAgainClicked');
    });

    this.addChild(this.playAgainLabel);
  }

  /** showPlayAgain = false при autoplay */
  public async show(
    multipliers: number[],
    product: number,
    payout: number,
    showPlayAgain: boolean = true
  ): Promise<void> {
    const [m1, m2, m3] = multipliers;

    this.txt.text =
      `Multipliers:\n${m1.toFixed(2)}x  •  ${m2.toFixed(2)}x  •  ${m3.toFixed(2)}x\n\n` +
      `Product: ${product.toFixed(2)}x\n` +
      `Payout: ${payout.toFixed(2)}$`;

    this.playAgainLabel.visible = showPlayAgain;
    this.playAgainLabel.interactive = showPlayAgain;

    this.alpha = 0;
    this.scale.set(0.65);
    this.visible = true;

    await tweenTo(this, { alpha: 1, duration: 0.25 });
    await tweenTo(this.scale, {
      x: 1,
      y: 1,
      duration: 0.35,
      ease: 'back.out(1.6)'
    });
    
    if (!showPlayAgain) {
      // AUTOPLAY MODE — popup stays open fully
      this.playAgainLabel.visible = false;
    }

  }

  public async hide(): Promise<void> {
    if (!this.visible) return;
    await tweenTo(this, { alpha: 0, duration: 0.25 });
    this.visible = false;
  }

  public hideInstant(): void {
    this.visible = false;
    this.alpha = 0;
  }
}
