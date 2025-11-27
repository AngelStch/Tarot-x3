import { Application } from 'pixi.js';
import { Game } from '../src/game/Game';

async function bootstrap(): Promise<void> {
  const hostElement = document.getElementById('app');
  if (!hostElement) {
    throw new Error('Missing #app element');
  }

  const app = new Application({
    backgroundColor: 0x020617,
    resizeTo: hostElement as HTMLElement,
    antialias: true,
  });

  hostElement.appendChild(app.view as HTMLCanvasElement);

  const game = new Game(app);
  app.stage.addChild(game);
}

void bootstrap();
