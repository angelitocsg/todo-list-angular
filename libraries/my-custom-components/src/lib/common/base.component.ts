import { inject, Type } from '@angular/core';
import { Observable } from 'rxjs';

interface StoreType {
  content$: Observable<any>;
  data$: Observable<any>;
  list$: Observable<any>;
  isLoading$: Observable<any>;
}

export class BaseComponent<T extends StoreType> {
  readonly store: T;
  get content$() {
    return this.store.content$;
  }
  get data$() {
    return this.store.data$;
  }
  get list$() {
    return this.store.list$;
  }
  get isLoading$() {
    return this.store.isLoading$;
  }
  constructor(storeType: Type<T>) {
    this.store = inject(storeType);
  }
}
