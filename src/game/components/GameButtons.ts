// src/game/components/GameButtons.ts
import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Camera3d } from 'pixi-projection';
import { GameState } from '../../core/GameState';

export class GameButtons {
  public readonly play: Container;
  public readonly speed: Container;
  public readonly auto: Container;

  public onPlay: () => void = () => {};
  public onToggleSpeed: () => void = () => {};
  public onToggleAuto: () => void = () => {};

  constructor(app: Application, camera: Camera3d) {
    const { width, height } = app.screen;

    this.speed = this.makeButton('SPEED: REG', 0xf59e0b, 150);
    this.speed.position.set(width / 2 - 180, height - 90);
    this.speed.on('pointertap', () => this.onToggleSpeed());
    camera.addChild(this.speed);

    this.play = this.makeButton('PLAY', 0x10b981, 180);
    this.play.position.set(width / 2, height - 95);
    this.play.on('pointertap', () => this.onPlay());
    camera.addChild(this.play);

    this.auto = this.makeButton('AUTO', 0x3b82f6, 150);
    this.auto.position.set(width / 2 + 180, height - 90);
    this.auto.on('pointertap', () => this.onToggleAuto());
    camera.addChild(this.auto);
  }

  private makeButton(text: string, color: number, width: number): Container {
    const btn = new Container();
    btn.interactive = true;
    btn.cursor = 'pointer';

    const bg = new Graphics();
    bg.beginFill(color);
    bg.drawRoundedRect(-width / 2, -30, width, 60, 18);
    bg.endFill();
    btn.addChild(bg);

    const lbl = new Text(text, new TextStyle({
      fill: 0x000000,
      fontSize: 20,
      fontWeight: '700'
    }));
    lbl.anchor.set(0.5);
    btn.addChild(lbl);

    (btn as any).label = lbl;
    return btn;
  }

  public updateState(state: GameState) {
    const active = state === GameState.Idle;
    this.play.interactive = active;
    this.play.alpha = active ? 1 : 0.5;
  }
}
