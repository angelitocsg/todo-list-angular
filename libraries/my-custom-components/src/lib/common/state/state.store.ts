import { BehaviorSubject } from 'rxjs';
import { jsonCastTo } from '../helpers/json.helper';
export class StateStore<T> {
  private _current: BehaviorSubject<T>;
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }
  update(input: Partial<T>) {
    if (typeof input === 'boolean' || typeof input === 'string' || typeof input === 'number') {
      this._current.next(input);
      return;
    }
    this._current.next({
      ...jsonCastTo<T>(this.current),
      ...input,
    });
  }
  constructor(def: T) {
    this._current = new BehaviorSubject<T>(def);
  }
}
