import { inject, Type } from '@angular/core';
import { Observable } from 'rxjs';

type StoreType = {
  content$: Observable<any>;
  data$: Observable<any>;
  isLoading$: Observable<any>;
};

export abstract class BaseComponent<T extends StoreType> {
  private readonly _strategies?: Record<string, T>;
  private readonly _hasStrategy: boolean;
  protected _store!: T;
  get store() {
    return this._store;
  }
  get content$() {
    return this._store.content$;
  }
  get data$() {
    return this._store.data$;
  }
  get isLoading$() {
    return this._store.isLoading$;
  }

  constructor(store: Type<T> | Record<string, T>, hasStrategy?: boolean) {
    this._hasStrategy = !!hasStrategy;
    if (this._hasStrategy) {
      this._strategies = store as Record<string, T>;
      return;
    }
    try {
      this._store = inject(store as Type<T>);
    } catch (e) {
      console.error('Check if the injected type is correct or mark it as a strategy.', e);
    }
  }

  resolveStrategy(strategy: string) {
    if (!this._strategies || !this._hasStrategy) {
      throw new Error(`No strategy was found or defined in the constructor.`);
    }
    const resolved = this._strategies[strategy];
    if (!resolved) {
      throw new Error(
        `Strategy "${strategy}" not found. Strategies: ${Object.keys(this._strategies)}`,
      );
    }
    this._store = resolved;
  }
}
