import { BaseButtonElement, BaseElement, PageListStore } from '../common';
import { TodoPageCustomContent } from './todo-page-custom.content.model';
import { TodoPageCustomData } from './todo-page-custom.data.model';

export class TodoPageCustomStore extends PageListStore<
  TodoPageCustomContent,
  TodoPageCustomData,
  { items: TodoPageCustomData[] }
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
    this.updateData(TodoPageCustomData.empty());
  }

  addTodo(input: { title: any }) {
    this.updateList({
      items: [...this.list.items, new TodoPageCustomData(input)],
    });
  }

  new() {
    this.updateData(TodoPageCustomData.empty());
  }
}
