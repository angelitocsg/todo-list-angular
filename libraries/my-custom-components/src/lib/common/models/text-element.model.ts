export class TextElementModel {
  show: boolean;
  text: string;

  constructor(init?: Partial<TextElementModel>) {
    this.show = init?.show ?? false;
    this.text = init?.text ?? '';
  }

  static create(text: string, show: boolean) {
    return new TextElementModel({ text, show });
  }

  static empty() {
    const element = new TextElementModel();
    element.show = false;
    element.text = '';
    return element;
  }
}
