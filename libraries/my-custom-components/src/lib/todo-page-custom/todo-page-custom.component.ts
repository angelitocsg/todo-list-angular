import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../common';
import { TodoPageCustomStore } from './todo-page-custom.store';

@Component({
  standalone: true,
  selector: 'lib-todo-page-custom',
  templateUrl: 'todo-page-custom.component.html',
  styleUrls: ['todo-page-custom.component.scss'],
  imports: [CommonModule, FormsModule, JsonPipe, ReactiveFormsModule],
  providers: [TodoPageCustomStore],
})
export class TodoPageCustomComponent
  extends BaseComponent<TodoPageCustomStore>
  implements OnInit
{
  // todos: { title: string; done: boolean }[] = [];
  // newTitle = '';
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
    this.form.statusChanges.subscribe((value) => {
      console.log('statusChanged', value);
    });
  }

  submitAddTodo(): void {
    const title = this.form.controls['itemTitle'].value.trim();
    if (!title) return;
    this.store.addTodo({ title });
    this.store.new();
  }

  toggleDone(index: number): void {
    const t = this.store.list.items[index];
    if (t) t.done = !t.done;
  }

  editTodo(index: number): void {
    const t = this.store.list.items[index];
    if (!t) return;
    const updated = window.prompt('Edit task title', t.title);
    if (updated === null) return;
    const trimmed = updated.trim();
    if (trimmed) t.title = trimmed;
  }

  removeTodo(index: number): void {
    if (index >= 0 && index < this.store.list.items.length) {
      this.store.list.items.splice(index, 1);
    }
  }
}
