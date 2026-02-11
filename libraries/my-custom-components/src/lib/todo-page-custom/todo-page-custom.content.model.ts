import { ButtonElement, TextElement } from '../common';

export class TodoPageCustomContent {
  title: TextElement;
  description: TextElement;
  placeholder: TextElement;
  itemsLength: TextElement;
  addButton: ButtonElement;
  editButton: ButtonElement;
  deleteButton: ButtonElement;

  constructor(init?: Partial<TodoPageCustomContent>) {
    this.title = init?.title ?? TextElement.empty();
    this.description = init?.description ?? TextElement.empty();
    this.placeholder = init?.placeholder ?? TextElement.empty();
    this.itemsLength = init?.itemsLength ?? TextElement.empty();
    this.addButton = init?.addButton ?? ButtonElement.empty();
    this.editButton = init?.addButton ?? ButtonElement.empty();
    this.deleteButton = init?.addButton ?? ButtonElement.empty();
  }

  static empty() {
    return new TodoPageCustomContent({
      title: TextElement.empty(),
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
