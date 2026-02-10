import { TextElementModel } from './text-element.model';

export class ButtonElementModel extends TextElementModel {
  disabled: boolean;

  constructor(init?: Partial<ButtonElementModel>) {
    super(init);
    this.disabled = init?.disabled ?? false;
  }

  static override create(text: string, show: boolean) {
    return new ButtonElementModel({ text, show });
  }

  static override empty() {
    const element = new ButtonElementModel();
    element.show = false;
    element.text = '';
    element.disabled = false;
    return element;
  }
}
