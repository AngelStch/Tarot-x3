// src/types/pixi-projection.d.ts
declare module 'pixi-projection' {
  import { Container, Sprite } from 'pixi.js';

  export class Camera3d extends Container {
    setPlanes(near: number, focus: number, far: number, orthographic?: boolean): void;
  }

  export class Sprite3d extends Sprite {
    euler: { x: number; y: number; z: number };
    position3d: { x: number; y: number; z: number };
  }
}
