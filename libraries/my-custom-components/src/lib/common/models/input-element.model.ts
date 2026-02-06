export abstract class BaseHtmlAttributes {
  ariaLabel?: string;
  description?: string;
  errorMessage?: string;
}

export class InputElementModel<T> extends BaseHtmlAttributes {
  label: string;
  value: T | null;
  required: boolean;

  constructor(init?: Partial<InputElementModel<T>>) {
    super();
    this.label = init?.label ?? '';
    this.value = init?.value ?? null;
    this.required = init?.required ?? false;
  }
}
