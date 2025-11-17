import { Application } from 'pixi.js';
import { Game } from './game/Game';

async function bootstrap(): Promise<void> {
  const hostElement = document.getElementById('app');
  if (!hostElement) throw new Error('#app not found');

  const app = new Application({
    backgroundColor: 0x020617,
    resizeTo: hostElement,
    antialias: true
  });

  hostElement.appendChild(app.view as HTMLCanvasElement);

  const game = new Game(app);
  app.stage.addChild(game);
}

bootstrap();
