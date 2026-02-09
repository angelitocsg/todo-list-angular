import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounce } from '../common';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { BaseListComponent } from '../common/state/base-list.component';
import { LibraryStore } from '../library.store';
import { TodoPageCustomEnUsStore } from './strategy/todo-page-custom.store-en-us';
import { TodoPageCustomPtBrStore } from './strategy/todo-page-custom.store.pt-br';
import {
  TODO_STRATEGIES,
  TodoPageStoreStrategy,
  TodoStrategyProvider,
} from './strategy/todo-page.store.strategy';

@Component({
  standalone: true,
  selector: 'lib-todo-page-custom',
  templateUrl: 'todo-page-custom.component.html',
  styleUrls: ['todo-page-custom.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  providers: [TodoPageCustomEnUsStore, TodoPageCustomPtBrStore, TodoStrategyProvider],
})
export class TodoPageCustomComponent
  extends BaseListComponent<TodoPageStoreStrategy>
  implements OnInit
{
  form!: FormGroup;

  constructor(
    @Inject(TODO_STRATEGIES) strategies: Record<string, TodoPageStoreStrategy>,
    private libraryStore: LibraryStore,
    private formBuilder: FormBuilder,
  ) {
    super(strategies as Record<string, TodoPageCustomEnUsStore>, true);
    this.resolveStrategy(this.libraryStore.current.lang);
  }

  ngOnInit(): void {
    this.store.init();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      itemTitle: [this.store.data.title, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.debouncedUpdate();
    });
  }

  private debouncedUpdate = debounce(() => {
    this.store.updateData({ title: this.form.value.itemTitle });
  });

  // ## EVENTS ######################################################

  addTodoAction(): void {
    const title = this.form.controls['itemTitle'].value?.trim();
    if (!title) return;
    this.store.addTodo({ title });
    this.store.newItem();
    this.form.reset();
  }

  toggleDoneClick(index: number): void {
    this.store.toggleDone(index);
  }

  editTodoClick(index: number): void {
    const t = this.store.getTodo(index);
    if (!t) return;
    const updated = window.prompt('Edit task title', t.title);
    if (updated === null) return;
    this.store.updateTitle(index, { ...t, title: updated });
  }

  removeTodoClick(index: number): void {
    this.store.remove(index);
  }
}
