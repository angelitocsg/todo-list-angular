export class BaseElement {
  show: boolean;
  text: string;

  constructor(init?: Partial<BaseElement>) {
    this.show = init?.show ?? false;
    this.text = init?.text ?? '';
  }

  static create(text: string, show: boolean) {
    return new BaseElement({ text, show });
  }

  static empty() {
    const element = new BaseElement();
    element.show = false;
    element.text = '';
    return element;
  }
}
