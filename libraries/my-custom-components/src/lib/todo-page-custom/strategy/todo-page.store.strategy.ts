import { InjectionToken, Provider } from '@angular/core';

import { Observable } from 'rxjs';
import { TodoPageCustomData } from '../todo-page-custom.data.model';
import { TodoPageCustomEnUsStore } from './todo-page-custom.store-en-us';
import { TodoPageCustomPtBrStore } from './todo-page-custom.store.pt-br';

export interface TodoPageStoreStrategy {
  content$: Observable<any>;
  data$: Observable<any>;
  data: any;
  updateData(data: Partial<TodoPageCustomData>): void;
  list$: Observable<any>;
  isLoading$: Observable<any>;
  init(): void;
  addTodo(input: { title: string }): void;
  getTodo(index: number): TodoPageCustomData | undefined;
  updateTitle(index: number, updated: TodoPageCustomData): void;
  toggleDone(index: number): void;
  newItem(): void;
  remove(index: number): void;
}

export const TODO_STRATEGIES = new InjectionToken<Record<string, TodoPageStoreStrategy>>(
  'TODO_STORE_STRATEGIES',
);

export const TodoStrategyProvider: Provider = {
  provide: TODO_STRATEGIES,
  useFactory: (ptBR: TodoPageCustomPtBrStore, enUS: TodoPageCustomEnUsStore) => ({
    ptBR,
    enUS,
  }),
  deps: [TodoPageCustomPtBrStore, TodoPageCustomEnUsStore],
};
