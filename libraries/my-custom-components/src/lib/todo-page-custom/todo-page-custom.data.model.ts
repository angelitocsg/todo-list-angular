export class TodoPageCustomData {
  title: string;
  done: boolean;

  constructor(init?: Partial<TodoPageCustomData>) {
    this.title = init?.title ?? '';
    this.done = init?.done ?? false;
  }

  static empty() {
    const element = new TodoPageCustomData();
    element.title = '...';
    element.done = false;
    return element;
  }
}
