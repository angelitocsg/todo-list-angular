import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TodoPageComponent {
  todos: { title: string; done: boolean }[] = [];
  newTitle = '';

  addTodo(): void {
    const title = (this.newTitle || '').trim();
    if (!title) return;
    this.todos.push({ title, done: false });
    this.newTitle = '';
  }

  toggleDone(index: number): void {
    const t = this.todos[index];
    if (t) t.done = !t.done;
  }

  editTodo(index: number): void {
    const t = this.todos[index];
    if (!t) return;
    const updated = window.prompt('Edit task title', t.title);
    if (updated === null) return;
    const trimmed = updated.trim();
    if (trimmed) t.title = trimmed;
  }

  removeTodo(index: number): void {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
  }
}
