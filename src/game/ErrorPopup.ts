// src/game/ErrorPopup.ts
import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { tweenTo } from '../core/gsapHelpers';

export class ErrorPopup extends Container {
  private readonly bg: Graphics;
  private readonly txt: Text;

  constructor() {
    super();

    this.visible = false;
    this.alpha = 0;

    this.bg = new Graphics();
    this.bg.beginFill(0x290000);
    this.bg.lineStyle(3, 0xff4444);
    this.bg.drawRoundedRect(-160, -40, 320, 80, 18);
    this.bg.endFill();
    this.addChild(this.bg);

    this.txt = new Text(
      'Error!',
      new TextStyle({
        fill: 0xffdddd,
        fontSize: 22,
        fontWeight: '700',
        align: 'center'
      })
    );
    this.txt.anchor.set(0.5);
    this.addChild(this.txt);
  }

  public async showError(message: string) {
    this.txt.text = message;

    this.visible = true;
    this.alpha = 0;

    await tweenTo(this, { alpha: 1, duration: 0.25 });

    // stands visible for 1.2 sec
    await new Promise(res => setTimeout(res, 1200));

    await tweenTo(this, { alpha: 0, duration: 0.25 });
    this.visible = false;
  }
}
