<ng-container
  *ngIf="{
    list: list$ | async,
    data: data$ | async,
    content: content$ | async,
  } as vm"
>
  <div class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
    <header class="flex items-center justify-between mb-4">
      <h1 *ngIf="vm.content.title.show" class="text-2xl font-semibold">
        {{ vm.content.title.text }}
      </h1>
      <span *ngIf="vm.content.description.show" class="text-sm text-gray-500">
        {{ vm.content.description.text }}
      </span>
    </header>

    <form
      [formGroup]="form"
      class="flex gap-2"
      (submit)="submitAddTodo(); $event.preventDefault()"
    >
      <input
        type="text"
        formControlName="itemTitle"
        [placeholder]="vm.content.placeholder.text"
        class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {{ vm.content.button.text }}
      </button>
    </form>

    <ul class="mt-4 divide-y">
      <li
        *ngFor="let todo of vm.list.items; let i = index"
        class="py-3 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            [checked]="todo.done"
            (change)="toggleDone(i)"
            class="w-5 h-5 text-indigo-600"
          />
          <span [class.line-through]="todo.done" class="text-gray-800">{{
            todo.title
          }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            (click)="editTodo(i)"
            class="text-sm text-indigo-600 hover:underline"
          >
            Edit
          </button>
          <button
            (click)="removeTodo(i)"
            class="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <footer class="mt-4 text-sm text-gray-500">
      <span>{{ vm.list.items.length }} items</span>
    </footer>
  </div>
</ng-container>
