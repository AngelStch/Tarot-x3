import { gsap } from 'gsap';

export function tweenTo(target: any, vars: gsap.TweenVars): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...vars,
      onComplete: () => resolve(),
    });
  });
}

/** Малък helper за изчакване в ms */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
