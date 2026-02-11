export class TextElement {
  show: boolean;
  text: string;

  constructor(init?: Partial<TextElement>) {
    this.show = init?.show ?? false;
    this.text = init?.text ?? '';
  }

  static create(text: string, show?: boolean) {
    return new TextElement({
      text,
      show: !!show || (show === undefined && typeof text === 'string' && text.length > 0),
    });
  }

  static empty() {
    const element = new TextElement();
    element.show = false;
    element.text = '';
    return element;
  }
}
