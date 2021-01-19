import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private _history: string[] = [];

  private _historyIndex: number = -1;

  constructor() { }

  push(path: string) {
    if (this._historyIndex < this._history.length - 1) {
      this._history = this._history.slice(0, this._historyIndex + 1);
    }

    this._history.push(path);
    ++this._historyIndex;
  }

  canForward(): boolean {
    return this._historyIndex <= this._history.length - 2;
  }

  forward(): string {
    if (!this.canForward()) {
      return this._history[this._history.length - 1];
    } else {
      return this._history[++this._historyIndex];
    }
  }

  canBack(): boolean {
    return this._historyIndex > 0;
  }

  back(): string {
    if (!this.canBack()) {
      return this._history[0];
    } else {
      return this._history[--this._historyIndex];
    }
  }
}
