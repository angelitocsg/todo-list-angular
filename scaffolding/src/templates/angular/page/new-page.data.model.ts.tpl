export class {{ComponentName}}Data {
  title: string;
  done: boolean;

  constructor(init?: Partial<{{ComponentName}}Data>) {
    this.title = init?.title ?? '';
    this.done = init?.done ?? false;
  }

  static empty() {
    const element = new {{ComponentName}}Data();
    element.title = '...';
    element.done = false;
    return element;
  }
}
