// src/game/MultiplierTable.ts

export interface MultiplierEntry {
  multiplier: number;
  weight: number;
}

// Data-driven pay table (лесно може да се изнесе в JSON)
export class MultiplierTable {
  private readonly entries: MultiplierEntry[] = [
    { multiplier: 10.0, weight: 3 },
    { multiplier: 5.0, weight: 6 },
    { multiplier: 3.0, weight: 13 },
    { multiplier: 2.0, weight: 23 },
    { multiplier: 1.0, weight: 55 },
    { multiplier: 4.0, weight: 7 },
    { multiplier: 2.0, weight: 9 }, 
    { multiplier: 0.6, weight: 15 },
    { multiplier: 0.3, weight: 50 },
    { multiplier: 0.0, weight: 19 },
  ];

  public getEntries(): ReadonlyArray<MultiplierEntry> {
    return this.entries;
  }

  // weighted random sampling
  public pickRandomMultiplier(): number {
    const totalWeight = this.entries.reduce((sum, e) => sum + e.weight, 0);
    const randomPoint = Math.random() * totalWeight;

    let acc = 0;
    for (const entry of this.entries) {
      acc += entry.weight;
      if (randomPoint <= acc) {
        return entry.multiplier;
      }
    }

    // fallback
    return this.entries[this.entries.length - 1]?.multiplier ?? 1;
  }
}
