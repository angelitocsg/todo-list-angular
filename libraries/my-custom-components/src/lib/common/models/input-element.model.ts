export abstract class BaseHtmlAttributes {
  ariaLabel?: string;
  description?: string;
  errorMessage?: string;
}

export class InputElement<T> extends BaseHtmlAttributes {
  label: string;
  value: T | null;
  required: boolean;
  disabled: boolean;

  constructor(init?: Partial<InputElement<T>>) {
    super();
    this.label = init?.label ?? '';
    this.value = init?.value ?? null;
    this.required = init?.required ?? false;
    this.disabled = init?.disabled ?? false;
  }
}
