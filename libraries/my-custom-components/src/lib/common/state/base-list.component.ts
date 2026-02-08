import { Observable } from 'rxjs';
import { BaseComponent } from './base.component';

type StoreType = {
  content$: Observable<any>;
  data$: Observable<any>;
  list$: Observable<any>;
  isLoading$: Observable<any>;
};

export abstract class BaseListComponent<T extends StoreType> extends BaseComponent<T> {
  get list$() {
    return this.store.list$;
  }
}
