import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinServiceService {
  private localStorageKey = 'coins';

  // BehaviorSubject to emit coin updates
  private coinsSubject = new BehaviorSubject<number>(0);

  // Observable for components to subscribe to
  public coins$ = this.coinsSubject.asObservable();

  constructor() {
    const initialCoins = this.getCoinsFromStorage();
    this.coinsSubject.next(initialCoins); // Emit initial value
  }

  // Retrieve coins from localStorage
  private getCoinsFromStorage(): number {
    const coins = localStorage.getItem(this.localStorageKey);
    return coins ? parseInt(coins, 10) : 0;
  }

  // Update the coins in localStorage and notify subscribers
  private updateCoins(value: number): void {
    localStorage.setItem(this.localStorageKey, value.toString());
    this.coinsSubject.next(value); // Notify listeners of the update
  }

  // Public method to get current coins
  getCoins(): number {
    return this.coinsSubject.value; // Get the current value from BehaviorSubject
  }

  // Set coins and emit the updated value
  setCoins(value: number): void {
    this.updateCoins(value);
  }

  // Reset coins to 0 and emit the updated value
  resetCoins(): void {
    this.updateCoins(0);
  }

  // Add coins and emit the updated value
  addCoins(amount: number): void {
    const currentCoins = this.getCoins();
    this.updateCoins(currentCoins + amount);
  }

  // Remove coins (ensuring the value doesn't go below 0) and emit the updated value
  removeCoins(amount: number): void {
    const currentCoins = this.getCoins();
    this.updateCoins(Math.max(currentCoins - amount, 0));
  }
}
