import { StateStore } from './state.store';

export abstract class PageStore<TContent, TData> {
  private _content: StateStore<TContent>;
  get content$() {
    return this._content.current$;
  }
  get content() {
    return this._content.current;
  }
  updateContent(content: Partial<TContent>) {
    this._content.update(content);
  }

  private _data: StateStore<TData>;
  get data$() {
    return this._data.current$;
  }
  get data() {
    return this._data.current;
  }
  updateData(data: Partial<TData>) {
    this._data.update(data);
  }

  private _isLoading: StateStore<boolean> = new StateStore<boolean>(false);
  get isLoading$() {
    return this._isLoading.current$;
  }
  get isLoading() {
    return this._isLoading.current;
  }
  setIsLoading(value: boolean) {
    this._isLoading.update(value ?? false);
  }

  constructor(defContent: TContent, defData: TData) {
    this._content = new StateStore<TContent>(defContent);
    this._data = new StateStore<TData>(defData);
  }
}
