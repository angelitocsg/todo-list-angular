import { TextElementModel } from './text-element.model';

export class ButtonElementModel extends TextElementModel {
  action: string;
  event: () => void;
  disabled: boolean;

  constructor(init?: Partial<ButtonElementModel>) {
    super(init);
    this.action = init?.action ?? '';
    this.disabled = init?.disabled ?? false;
    this.event = init?.event ?? (() => {});
  }

  static override create(text: string, show: boolean) {
    return new ButtonElementModel({ text, show });
  }

  static override empty() {
    const element = new ButtonElementModel();
    element.show = false;
    element.text = '';
    element.action = '';
    element.disabled = false;
    return element;
  }
}
