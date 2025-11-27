
export class StateMachine<TState> {
  private current: TState;
  private readonly onTransition?: (from: TState, to: TState) => void;

  constructor(initial: TState, onTransition?: (from: TState, to: TState) => void) {
    this.current = initial;
    this.onTransition = onTransition;
  }

  public isIn(state: TState): boolean {
    return this.current === state;
  }

  public getState(): TState {
    return this.current;
  }

  public transitionTo(next: TState): void {
    if (next === this.current) {
      return;
    }

    const prev = this.current;
    this.current = next;
    if (this.onTransition) {
      this.onTransition(prev, next);
    }
  }
}
