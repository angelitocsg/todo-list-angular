import { TextElement } from './text-element.model';

export class ButtonElement extends TextElement {
  disabled: boolean;

  constructor(init?: Partial<ButtonElement>) {
    super(init);
    this.disabled = init?.disabled ?? false;
  }

  static override create(text: string, show?: boolean) {
    return new ButtonElement({ text, show });
  }

  static override empty() {
    const element = new ButtonElement();
    element.show = false;
    element.text = '';
    element.disabled = false;
    return element;
  }
}
