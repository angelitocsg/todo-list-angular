import { BaseStore } from './base.store';

export class PageListStore<TContent, TData, TList> {
  private _content: BaseStore<TContent>;
  get content$() {
    return this._content.current$;
  }
  get content() {
    return this._content.current;
  }
  updateContent(content: Partial<TContent>) {
    this._content.update(content);
  }

  private _data: BaseStore<TData>;
  get data$() {
    return this._data.current$;
  }
  get data() {
    return this._data.current;
  }
  updateData(data: Partial<TData>) {
    this._data.update(data);
  }

  private _list: BaseStore<TList>;
  get list$() {
    return this._list.current$;
  }
  get list() {
    return this._list.current;
  }
  updateList(data: TList) {
    this._list.update(data);
  }

  private _isLoading: BaseStore<boolean> = new BaseStore<boolean>(false);
  get isLoading$() {
    return this._isLoading.current$;
  }
  get isLoading() {
    return this._isLoading.current;
  }
  setIsLoading(value: boolean) {
    this._isLoading.update(value ?? false);
  }

  constructor(defContent: TContent, defData: TData, defList: TList) {
    this._content = new BaseStore<TContent>(defContent);
    this._data = new BaseStore<TData>(defData);
    this._list = new BaseStore<TList>(defList);
  }
}
