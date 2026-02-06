import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseComponent, debounce } from '../common';
import { TodoPageCustomStore } from './todo-page-custom.store';

@Component({
  standalone: true,
  selector: 'lib-todo-page-custom',
  templateUrl: 'todo-page-custom.component.html',
  styleUrls: ['todo-page-custom.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [TodoPageCustomStore],
})
export class TodoPageCustomComponent
  extends BaseComponent<TodoPageCustomStore>
  implements OnInit
{
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super(TodoPageCustomStore);
  }

  ngOnInit(): void {
    this.store.init();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      itemTitle: [this.store.data.title, [Validators.required]],
    });
    this.form.valueChanges.subscribe((value) => {
      debounce(() => {
        this.store.updateData({ title: value.itemTitle });
      });
    });
  }

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
