import { BaseButtonElement, BaseElement } from '../common';

export class {{ComponentName}}Content {
  title: BaseElement;
  description: BaseElement;
  placeholder: BaseElement;
  counter: BaseElement;
  button: BaseButtonElement;

  constructor(init?: Partial<{{ComponentName}}Content>) {
    this.title = init?.title ?? BaseElement.empty();
    this.description = init?.description ?? BaseElement.empty();
    this.placeholder = init?.placeholder ?? BaseElement.empty();
    this.counter = init?.counter ?? BaseElement.empty();
    this.button = init?.button ?? BaseButtonElement.empty();
  }

  static empty() {
    return new {{ComponentName}}Content({
      title: BaseElement.empty(),
      description: BaseElement.empty(),
      placeholder: BaseElement.empty(),
      counter: BaseElement.empty(),
      button: BaseButtonElement.empty(),
    });
  }

  static parse(externalData: any) {}
}
