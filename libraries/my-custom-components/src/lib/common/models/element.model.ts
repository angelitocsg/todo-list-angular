export class ElementModel {
  show: boolean;
  text: string;

  constructor(init?: Partial<ElementModel>) {
    this.show = init?.show ?? false;
    this.text = init?.text ?? '';
  }

  static create(text: string, show: boolean) {
    return new ElementModel({ text, show });
  }

  static empty() {
    const element = new ElementModel();
    element.show = false;
    element.text = '';
    return element;
  }
}
