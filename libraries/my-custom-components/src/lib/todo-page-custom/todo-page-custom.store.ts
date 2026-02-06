import { Injectable } from '@angular/core';
import { ButtonElementModel, ElementModel, PageListStore } from '../common';
import { TodoPageCustomContent } from './todo-page-custom.content.model';
import { TodoPageCustomData } from './todo-page-custom.data.model';

@Injectable()
export class TodoPageCustomStore extends PageListStore<
  TodoPageCustomContent,
  TodoPageCustomData,
  { items: TodoPageCustomData[] }
> {
  constructor() {
    super(TodoPageCustomContent.empty(), TodoPageCustomData.empty(), {
      items: [],
    });
  }

  init() {
    this.initContent();
    this.initData();
  }

  private initContent() {
    this.updateContent({
      title: ElementModel.create('Todo List', true),
      description: ElementModel.create('To be version', true),
      placeholder: ElementModel.create('Add a new task...', true),
      itemsLength: ElementModel.create('items', true),
      addButton: ButtonElementModel.create('add', true),
      editButton: ButtonElementModel.create('edit', true),
      deleteButton: ButtonElementModel.create('remove', true),
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

  getTodo(index: number): TodoPageCustomData | undefined {
    const t = this.list.items[index];
    return t;
  }

  updateTitle(index: number, updated: TodoPageCustomData) {
    const t = this.list.items[index];
    const trimmed = updated.title.trim();
    if (trimmed) t.title = trimmed;
  }

  toggleDone(index: number) {
    const t = this.list.items[index];
    if (t) t.done = !t.done;
  }

  newItem() {
    this.updateData(TodoPageCustomData.empty());
  }

  remove(index: number) {
    if (index >= 0 && index < this.list.items.length) {
      this.list.items.splice(index, 1);
    }
  }
}
