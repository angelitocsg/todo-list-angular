import { BaseButtonElement, BaseElement, PageListStore } from '../common';
import { {{ComponentName}}Content } from './todo-page-custom.content.model';
import { {{ComponentName}}Data } from './todo-page-custom.data.model';

export class {{ComponentName}}Store extends PageListStore<
  {{ComponentName}}Content,
  {{ComponentName}}Data,
  { items: {{ComponentName}}Data[] }
> {
  init() {
    this.initContent();
    this.initData();
  }

  private initContent() {
    this.updateContent({
      title: BaseElement.create('Todo List', true),
      description: BaseElement.create('To be version', true),
      placeholder: BaseElement.create('Add a new task...', true),
      counter: BaseElement.create('items', true),
      button: BaseButtonElement.create('add', true),
    });
  }

  private initData() {
    this.updateList({ items: [] });
    this.updateData({{ComponentName}}Data.empty());
  }

  addTodo(input: { title: any }) {
    this.updateList({
      items: [...this.list.items, new {{ComponentName}}Data(input)],
    });
  }

  new() {
    this.updateData({{ComponentName}}Data.empty());
  }
}
