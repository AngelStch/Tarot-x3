import { Application } from 'pixi.js';
import { Camera3d } from 'pixi-projection';
import { BetUI } from '../BetUI';

export class GameBetting {
  public readonly ui: BetUI;

  get betValue() { return this.ui.betValue; }
  get balance() { return this.ui.balance; }

  constructor(app: Application, camera: Camera3d) {
    const { width, height } = app.screen;

    this.ui = new BetUI();
    this.ui.position.set(width / 2, height / 2 + 215);
    camera.addChild(this.ui);
  }
}
