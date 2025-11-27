// src/game/BetUI.ts
import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class BetUI extends Container {
  public balance = 35;
  public betValue = 5;

  private balanceLabel: Text;
  private betLabel: Text;

  private minusBtn: Container;
  private plusBtn: Container;

  constructor() {
    super();

    // === BALANCE LABEL ===
    this.balanceLabel = new Text(
      `Balance: ${this.balance.toFixed(2)}$`,
      new TextStyle({
        fill: 0xffffff,
        fontSize: 26,
        fontWeight: '700'
      })
    );
    this.balanceLabel.anchor.set(0.5);
    this.balanceLabel.position.set(0, 0);
    this.addChild(this.balanceLabel);

    // === BET LABEL (целият ред е надолу с 35px) ===
    this.betLabel = new Text(
      `Bet: ${this.betValue}`,
      new TextStyle({
        fill: 0xfbbf24,
        fontSize: 26,
        fontWeight: '700'
      })
    );
    this.betLabel.anchor.set(0.5);
    this.betLabel.position.set(0, 40); 
    this.addChild(this.betLabel);

    // === MINUS BUTTON ===
    this.minusBtn = this.makeBtn(0xff4d4d, '-');
    this.minusBtn.position.set(-90, 40);
    this.minusBtn.on('pointertap', () => this.changeBet(-1));
    this.addChild(this.minusBtn);

    // === PLUS BUTTON ===
    this.plusBtn = this.makeBtn(0x22cc66, '+');
    this.plusBtn.position.set(90, 40);
    this.plusBtn.on('pointertap', () => this.changeBet(1));
    this.addChild(this.plusBtn);

    this.updateLabels();
  }

  private makeBtn(color: number, text: string): Container {
    const c = new Container();
    c.interactive = true;
    c.cursor = 'pointer';

    const bg = new Graphics();
    bg.beginFill(color);
    bg.drawRoundedRect(-30, -22, 60, 44, 12);
    bg.endFill();
    c.addChild(bg);

    const lbl = new Text(
      text,
      new TextStyle({
        fill: 0xffffff,
        fontWeight: '900',
        fontSize: 26
      })
    );
    lbl.anchor.set(0.5);
    c.addChild(lbl);

    return c;
  }

  private changeBet(delta: number) {
    const newBet = this.betValue + delta;

    if (newBet < 1) return;
    if (newBet > 20) return;

    this.betValue = newBet;
    this.updateLabels();
  }

  private updateLabels() {
    this.balanceLabel.text = `Balance: ${this.balance.toFixed(2)}$`;
    this.betLabel.text = `Bet: ${this.betValue}`;
  }

  public deductBet(): boolean {
    if (this.balance < this.betValue) return false;

    this.balance -= this.betValue;
    this.updateLabels();
    return true;
  }

  public addWinnings(amount: number) {
    this.balance += amount;
    this.updateLabels();
  }
}
