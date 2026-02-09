import { Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { ButtonElementModel, PageListStore, TextElementModel } from '../../common';
import { TodoPageCustomContent } from '../todo-page-custom.content.model';
import { TodoPageCustomData } from '../todo-page-custom.data.model';
import { TodoPageStoreStrategy } from './todo-page.store.strategy';

@Injectable()
export class TodoPageCustomEnUsStore
  extends PageListStore<TodoPageCustomContent, TodoPageCustomData, { items: TodoPageCustomData[] }>
  implements TodoPageStoreStrategy
{
  constructor() {
    super(TodoPageCustomContent.empty(), TodoPageCustomData.empty(), {
      items: [],
    });
  }

  init() {
    this.setIsLoading(true);
    forkJoin([this.initContent(), this.initData()]).subscribe(() => {
      this.setIsLoading(false);
    });
  }

  protected initContent(): Observable<boolean> {
    return from<Promise<boolean>>(
      new Promise((resolve) => {
        setTimeout(() => {
          this.updateContent({
            title: TextElementModel.create('ToDo list', true),
            description: TextElementModel.create('ToBe version', true),
            placeholder: TextElementModel.create('add a new task', true),
            itemsLength: TextElementModel.create('items', true),
            addButton: ButtonElementModel.create('add', true),
            editButton: ButtonElementModel.create('edit', true),
            deleteButton: ButtonElementModel.create('remove', true),
          });
          console.info('[store] en-US content loaded!');
          resolve(true);
        }, 1000);
      }),
    );
  }

  private initData(): Observable<boolean> {
    return from<Promise<boolean>>(
      new Promise((resolve) => {
        setTimeout(() => {
          console.info('[store] data loaded!');
          resolve(true);
        }, 2000);
        // this.updateList({ items: [] });
        // this.updateData(TodoPageCustomData.empty());
      }),
    );
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
    if (trimmed && t) t.title = trimmed;
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
