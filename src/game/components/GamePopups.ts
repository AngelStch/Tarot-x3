import { Application } from 'pixi.js';
import { Camera3d } from 'pixi-projection';

import { ResultPopup } from '../ResultPopup';
import { ErrorPopup } from '../ErrorPopup';

export class GamePopups {
  public readonly result: ResultPopup;
  public readonly error: ErrorPopup;

  public onPlayAgain: () => void = () => {};

  constructor(app: Application, camera: Camera3d) {
    const { width, height } = app.screen;

    this.result = new ResultPopup();
    this.result.position.set(width / 2, height / 2);
    this.result.on('playAgainClicked', () => this.onPlayAgain());
    camera.addChild(this.result);

    this.error = new ErrorPopup();
    this.error.position.set(width / 2, height / 2 - 260);
    camera.addChild(this.error);
  }
}
