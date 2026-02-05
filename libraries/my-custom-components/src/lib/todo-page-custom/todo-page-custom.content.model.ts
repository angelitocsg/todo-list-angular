import { BaseButtonElement, BaseElement } from '../common';

export class TodoPageCustomContent {
  title: BaseElement;
  description: BaseElement;
  placeholder: BaseElement;
  counter: BaseElement;
  button: BaseButtonElement;

  constructor(init?: Partial<TodoPageCustomContent>) {
    this.title = init?.title ?? BaseElement.empty();
    this.description = init?.description ?? BaseElement.empty();
    this.placeholder = init?.placeholder ?? BaseElement.empty();
    this.counter = init?.counter ?? BaseElement.empty();
    this.button = init?.button ?? BaseButtonElement.empty();
  }

  static empty() {
    return new TodoPageCustomContent({
      title: BaseElement.empty(),
      description: BaseElement.empty(),
      placeholder: BaseElement.empty(),
      counter: BaseElement.empty(),
      button: BaseButtonElement.empty(),
    });
  }

  static parse(externalData: any) {}
}
