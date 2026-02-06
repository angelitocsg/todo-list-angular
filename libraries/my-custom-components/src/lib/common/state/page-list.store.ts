import { StateStore } from './state.store';
import { PageStore } from './page.store';

export abstract class PageListStore<TContent, TData, TList> extends PageStore<
  TContent,
  TData
> {
  private _list: StateStore<TList>;
  get list$() {
    return this._list.current$;
  }
  get list() {
    return this._list.current;
  }
  updateList(data: TList) {
    this._list.update(data);
  }

  constructor(defContent: TContent, defData: TData, defList: TList) {
    super(defContent, defData);
    this._list = new StateStore<TList>(defList);
  }
}
