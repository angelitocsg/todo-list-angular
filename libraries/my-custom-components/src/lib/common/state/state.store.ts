import { BehaviorSubject, Observable } from 'rxjs';
import { jsonCastTo } from '../helpers/json.helper';

export class StateStore<T> {
  private _current: BehaviorSubject<T>;
  get current$(): Observable<T> {
    return this._current.asObservable();
  }
  get current(): T {
    return this._current.value;
  }
  update(input: Partial<T>) {
    if (typeof input !== 'object') {
      this._current.next(input as T);
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
