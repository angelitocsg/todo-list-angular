import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { ButtonElement, PageListStore, TextElement } from '../../common';
import { TodoPageCustomContent } from '../todo-page-custom.content.model';
import { TodoPageCustomData } from '../todo-page-custom.data.model';
import { TodoPageStoreStrategy } from './todo-page.store.strategy';

@Injectable()
export class TodoPageCustomEnUsStore
  extends PageListStore<TodoPageCustomContent, TodoPageCustomData, { items: TodoPageCustomData[] }>
  implements TodoPageStoreStrategy
{
  constructor(private router: Router) {
    super(TodoPageCustomContent.empty(), TodoPageCustomData.empty(), {
      items: [],
    });
  }

  init() {
    this.setIsLoading(true);
    forkJoin([this.initContent(), this.initData()]).subscribe({
      next: () => {
        this.setIsLoading(false);
      },
      error: (err) => {
        this.router.navigate(['error-page'], { state: { message: err.message } });
      },
    });
  }

  protected initContent(): Observable<boolean> {
    return from<Promise<boolean>>(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            this.updateContent(
              new TodoPageCustomContent({
                title: TextElement.create('ToDo list'),
                description: TextElement.create('ToBe version'),
                placeholder: TextElement.create('add a new task'),
                itemsLength: TextElement.create('items'),
                addButton: ButtonElement.create('add'),
                editButton: ButtonElement.create('edit'),
                deleteButton: ButtonElement.create('remove'),
              }),
            );
            console.info('[store] en-US content loaded!');
            resolve(true);
          } catch (e) {
            reject(e);
          }
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
