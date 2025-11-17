// src/game/Game.ts
import { Application, Container } from 'pixi.js';
import { Camera3d } from 'pixi-projection';
import { StateMachine } from '../core/StateMachine';
import { GameState } from '../core/GameState';

import { GameTable } from './components/GameTable';
import { GameButtons } from './components/GameButtons';
import { GameFlow } from './components/GameFlow';
import { GamePopups } from './components/GamePopups';
import { GameBetting } from './components/GameBetting';

export class Game extends Container {
  private readonly app: Application;
  private readonly camera: Camera3d;

  public readonly sm: StateMachine<GameState>;

  public readonly table: GameTable;
  public readonly buttons: GameButtons;
  public readonly popups: GamePopups;
  public readonly betting: GameBetting;
  public readonly flow: GameFlow;

  constructor(app: Application) {
    super();
    this.app = app;

    // CAMERA
    this.camera = new Camera3d();
    this.camera.setPlanes(400, 1, 2000);
    this.app.stage.addChild(this.camera);


    // STATE MACHINE
    this.sm = new StateMachine<GameState>(GameState.Idle, (from, to) => {
      console.log(`STATE: ${from} → ${to}`);
      this.buttons.updateState(to);
    });

    // CREATE COMPONENTS
    this.table = new GameTable(app, this.camera);
    this.buttons = new GameButtons(app, this.camera);
    this.popups = new GamePopups(app, this.camera);
    this.betting = new GameBetting(app, this.camera);
    this.flow = new GameFlow(this);

    // CONNECT BUTTONS
    this.buttons.onPlay = () => this.flow.startRound();
    this.buttons.onToggleSpeed = () => this.flow.toggleSpeed();
    this.buttons.onToggleAuto = () => this.flow.toggleAuto();

    // CONNECT POPUP "PLAY AGAIN"
    this.popups.onPlayAgain = () => {
      this.popups.result.hide();
      this.table.cards.forEach(c => c.resetToBack());
      this.sm.transitionTo(GameState.Idle);
    };


    // (game starts in idle state)
    this.buttons.updateState(GameState.Idle);
  }
}
