import { Observable } from 'rxjs';

type StoreType = {
  content$: Observable<any>;
  data$: Observable<any>;
  isLoading$: Observable<any>;
};

export abstract class BaseComponent<T extends StoreType> {
  protected store!: T;
  get content$() {
    return this.store.content$;
  }
  get data$() {
    return this.store.data$;
  }
  get isLoading$() {
    return this.store.isLoading$;
  }
}
