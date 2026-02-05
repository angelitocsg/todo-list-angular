export class BaseHtmlAttributes {
  ariaLabel?: string;
  description?: string;
  errorMessage?: string;
}

export class BaseField<T> extends BaseHtmlAttributes {
  label: string;
  value: T | null;

  constructor(init?: Partial<BaseField<T>>) {
    super();
    this.label = init?.label ?? '';
    this.value = init?.value ?? null;
  }
}
