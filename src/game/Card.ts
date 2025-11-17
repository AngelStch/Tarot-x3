// src/game/Card.ts
import {
  Container,
  Texture,
  Sprite,
  Text,
  TextStyle,
  IRenderer,
  Graphics,
} from 'pixi.js';
import { Sprite3d } from 'pixi-projection';
import { tweenTo } from '../core/gsapHelpers';

export class Card extends Container {
  private readonly rendererRef: IRenderer;

  private readonly sprite3d: Sprite3d;
  private readonly frontTexture: Texture;
  private readonly backTexture: Texture;

  private readonly frontLabel: Text;
  private readonly backLabel: Text;

  private multiplier = 1;
  private isFront = false;
  private isFlipping = false;

  constructor(w: number, h: number, renderer: IRenderer) {
    super();

    this.rendererRef = renderer;

    // FRONT side (жълта карта)
    this.frontTexture = this.makeFrontTexture(w, h);

    // BACK side – AI image, през Vite asset loader
    const cardBackUrl = new URL('../../assets/card-back.jpg', import.meta.url).href;
    this.backTexture = Texture.from(cardBackUrl);

    // 3D sprite
    const s = new Sprite(this.backTexture);
    const s3d = s as unknown as Sprite3d;

    s3d.anchor.set(0.5);
    s3d.euler = { x: 0, y: 0, z: 0 };
    s3d.position3d = { x: 0, y: 0, z: 0 };

    // фиксираме размера да съвпада с front texture
    s3d.width = w;
    s3d.height = h;

    this.sprite3d = s3d;
    this.addChild(this.sprite3d);

    // Front label
    this.frontLabel = new Text(
      '1.00x',
      new TextStyle({
        fill: 0x111827,
        fontSize: 26,
        fontWeight: '700',
      }),
    );
    this.frontLabel.anchor.set(0.5);
    this.addChild(this.frontLabel);

    // Back label – празен (гледаме само гърба)
    this.backLabel = new Text(
      '',
      new TextStyle({
        fill: 0xffffff,
        fontSize: 30,
        fontWeight: '700',
      }),
    );
    this.backLabel.anchor.set(0.5);
    this.addChild(this.backLabel);

    this.updateLabels();
  }

  /** Жълтата front карта като rounded rect */
  private makeFrontTexture(w: number, h: number): Texture {
    const g = new Graphics();
    g.beginFill(0xfbbf24);
    g.drawRoundedRect(0, 0, w, h, 18);
    g.endFill();

    const tex = this.rendererRef.generateTexture(g, { resolution: 2 });
    g.destroy();
    return tex;
  }

  public setMultiplier(m: number): void {
    this.multiplier = m;
    this.frontLabel.text = `${m.toFixed(2)}x`;
  }

  public getMultiplier(): number {
    return this.multiplier;
  }

  public resetToBack(): void {
    this.isFront = false;
    this.isFlipping = false;
    this.scale.set(1);
    this.sprite3d.texture = this.backTexture;
    this.updateLabels();
  }

  /** Smooth flip към фронта – speed е множител (1 = нормално, 0.5 = по-бързо) */
  public async flipToFront(speed = 1): Promise<void> {
    if (this.isFlipping || this.isFront) return;

    this.isFlipping = true;

    await tweenTo(this.scale, {
      x: 0,
      duration: 0.18 * speed,
      ease: 'power2.in',
    });

    this.sprite3d.texture = this.frontTexture;
    this.isFront = true;
    this.updateLabels();

    await tweenTo(this.scale, {
      x: 1,
      duration: 0.22 * speed,
      ease: 'power2.out',
    });

    this.isFlipping = false;
  }

  /** Smooth flip към гърба */
  public async flipToBack(speed = 1): Promise<void> {
    if (this.isFlipping || !this.isFront) return;

    this.isFlipping = true;

    await tweenTo(this.scale, {
      x: 0,
      duration: 0.18 * speed,
      ease: 'power2.in',
    });

    this.sprite3d.texture = this.backTexture;
    this.isFront = false;
    this.updateLabels();

    await tweenTo(this.scale, {
      x: 1,
      duration: 0.22 * speed,
      ease: 'power2.out',
    });

    this.isFlipping = false;
  }

  private updateLabels(): void {
    this.frontLabel.visible = this.isFront;
    this.backLabel.visible = !this.isFront;
  }

  public getSprite3d(): Sprite3d {
    return this.sprite3d;
  }
}
