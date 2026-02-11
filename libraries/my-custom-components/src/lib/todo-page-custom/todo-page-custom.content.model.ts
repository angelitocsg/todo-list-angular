import { ButtonElement, TextElement } from '../common';

export class TodoPageCustomContent {
  title: TextElement;
  description: TextElement;
  placeholder: TextElement;
  itemsLength: TextElement;
  addButton: ButtonElement;
  editButton: ButtonElement;
  deleteButton: ButtonElement;

  constructor(value?: Partial<TodoPageCustomContent>) {
    this.title = value?.title ?? TextElement.empty();
    this.description = value?.description ?? TextElement.empty();
    this.placeholder = value?.placeholder ?? TextElement.empty();
    this.itemsLength = value?.itemsLength ?? TextElement.empty();
    this.addButton = value?.addButton ?? ButtonElement.empty();
    this.editButton = value?.addButton ?? ButtonElement.empty();
    this.deleteButton = value?.addButton ?? ButtonElement.empty();
    this.validate(this);
  }

  validate(value?: Partial<TodoPageCustomContent>): TodoPageCustomContent {
    if (!value?.title || !value?.title.text) {
      throw new Error('Title is required');
    }
    this.title = value?.title ?? TextElement.empty();
    this.description = value?.description ?? TextElement.empty();
    this.placeholder = value?.placeholder ?? TextElement.empty();
    this.itemsLength = value?.itemsLength ?? TextElement.empty();
    this.addButton = value?.addButton ?? ButtonElement.empty();
    this.editButton = value?.addButton ?? ButtonElement.empty();
    this.deleteButton = value?.addButton ?? ButtonElement.empty();
    return this;
  }

  static empty() {
    return new TodoPageCustomContent({
      title: TextElement.create('Title'),
      description: TextElement.empty(),
      placeholder: TextElement.empty(),
      itemsLength: TextElement.empty(),
      addButton: ButtonElement.empty(),
      editButton: ButtonElement.empty(),
      deleteButton: ButtonElement.empty(),
    });
  }

  static parse(externalData: any) {}
}
