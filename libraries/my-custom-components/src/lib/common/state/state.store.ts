import { BehaviorSubject } from 'rxjs';

export class StateStore<T> {
  private _current: BehaviorSubject<T>;
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }
  update(input: Partial<T>) {
    this._current.next({
      ...this.current,
      ...input,
    });
  }
  constructor(def: T) {
    this._current = new BehaviorSubject<T>(def);
  }
}
