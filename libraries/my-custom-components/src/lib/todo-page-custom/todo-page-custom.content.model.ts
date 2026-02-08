import { ButtonElementModel, TextElementModel } from '../common';

export class TodoPageCustomContent {
  title: TextElementModel;
  description: TextElementModel;
  placeholder: TextElementModel;
  itemsLength: TextElementModel;
  addButton: ButtonElementModel;
  editButton: ButtonElementModel;
  deleteButton: ButtonElementModel;

  constructor(init?: Partial<TodoPageCustomContent>) {
    this.title = init?.title ?? TextElementModel.empty();
    this.description = init?.description ?? TextElementModel.empty();
    this.placeholder = init?.placeholder ?? TextElementModel.empty();
    this.itemsLength = init?.itemsLength ?? TextElementModel.empty();
    this.addButton = init?.addButton ?? ButtonElementModel.empty();
    this.editButton = init?.addButton ?? ButtonElementModel.empty();
    this.deleteButton = init?.addButton ?? ButtonElementModel.empty();
  }

  static empty() {
    return new TodoPageCustomContent({
      title: TextElementModel.empty(),
      description: TextElementModel.empty(),
      placeholder: TextElementModel.empty(),
      itemsLength: TextElementModel.empty(),
      addButton: ButtonElementModel.empty(),
      editButton: ButtonElementModel.empty(),
      deleteButton: ButtonElementModel.empty(),
    });
  }

  static parse(externalData: any) {}
}
