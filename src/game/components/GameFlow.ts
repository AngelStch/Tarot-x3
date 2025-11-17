    // src/game/components/GameFlow.ts
import { tweenTo } from '../../core/gsapHelpers';
import { Game } from '../Game';
import { GameState } from '../../core/GameState';
import { MultiplierTable } from '../MultiplierTable';

export class GameFlow {
  private speed: 'regular' | 'fast' | 'instant' = 'regular';
  private autoPlay = false;

  constructor(private readonly game: Game) {}

  public toggleSpeed() {
    if (this.speed === 'regular') this.speed = 'fast';
    else if (this.speed === 'fast') this.speed = 'instant';
    else this.speed = 'regular';

    const lbl = (this.game.buttons.speed as any).label;
    lbl.text =
      this.speed === 'regular'
        ? 'SPEED: REG'
        : this.speed === 'fast'
        ? 'SPEED: FAST'
        : 'SPEED: INST';
  }

  public toggleAuto() {
    this.autoPlay = !this.autoPlay;
    const lbl = (this.game.buttons.auto as any).label;
    lbl.text = this.autoPlay ? 'AUTO ✓' : 'AUTO';
  }

  public async startRound() {
    if (!this.game.sm.isIn(GameState.Idle)) return;

    // balance check
    if (!this.game.betting.ui.deductBet()) {
      this.autoPlay = false;
      (this.game.buttons.auto as any).label.text = 'AUTO';
      this.game.popups.error.showError('Not enough balance!');
      return;
    }

    this.game.sm.transitionTo(GameState.RoundStart);

    this.game.table.cards.forEach(c => c.resetToBack());

    await tweenTo(this.game.table.container.position, {
      y: this.game.table.container.position.y - 15,
      duration: 0.15,
      yoyo: true,
      repeat: 1
    });

    for (const card of this.game.table.cards) {
      card.setMultiplier(this.game.table.cards.indexOf(card));
      card.setMultiplier(
        new MultiplierTable().pickRandomMultiplier()
      );
    }

    this.game.sm.transitionTo(GameState.Reveal);
    await this.reveal();
  }

  private async reveal() {
    const ms: number[] = [];

    for (const card of this.game.table.cards) {
      await card.flipToFront(this.getSpeedMultiplier());
      ms.push(card.getMultiplier());

      if (this.speed === 'fast') await this.delay(100);
      if (this.speed === 'regular') await this.delay(300);
    }

    const product = ms.reduce((p, v) => p * v, 1);
    const payout = this.game.betting.betValue * product;

    this.game.betting.ui.addWinnings(payout);

    this.game.sm.transitionTo(GameState.Result);

    await this.game.popups.result.show(ms, product, payout, !this.autoPlay);

    if (this.autoPlay) {
      setTimeout(() => {
        this.game.popups.result.hideInstant();
        this.game.sm.transitionTo(GameState.Idle);
        this.startRound();
      }, 1400);
    }
  }

  private delay(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }

  private getSpeedMultiplier() {
    return this.speed === 'instant' ? 0.4 :
           this.speed === 'fast'    ? 0.75 :
                                      1;
  }
}
