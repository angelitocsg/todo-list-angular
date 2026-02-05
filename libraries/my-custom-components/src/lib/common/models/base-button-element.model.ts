import { BaseElement } from './base.element.model';

export class BaseButtonElement extends BaseElement {
  action: string;
  event: () => void;
  disabled: boolean;

  constructor(init?: Partial<BaseButtonElement>) {
    super(init);
    this.action = init?.action ?? '';
    this.disabled = init?.disabled ?? false;
    this.event = init?.event ?? (() => {});
  }

  static override create(text: string, show: boolean) {
    return new BaseButtonElement({ text, show });
  }

  static override empty() {
    const element = new BaseButtonElement();
    element.show = false;
    element.text = '';
    element.action = '';
    element.disabled = false;
    return element;
  }
}
