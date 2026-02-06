import { ButtonElementModel, ElementModel } from '../common';

export class TodoPageCustomContent {
  title: ElementModel;
  description: ElementModel;
  placeholder: ElementModel;
  itemsLength: ElementModel;
  addButton: ButtonElementModel;
  editButton: ButtonElementModel;
  deleteButton: ButtonElementModel;

  constructor(init?: Partial<TodoPageCustomContent>) {
    this.title = init?.title ?? ElementModel.empty();
    this.description = init?.description ?? ElementModel.empty();
    this.placeholder = init?.placeholder ?? ElementModel.empty();
    this.itemsLength = init?.itemsLength ?? ElementModel.empty();
    this.addButton = init?.addButton ?? ButtonElementModel.empty();
    this.editButton = init?.addButton ?? ButtonElementModel.empty();
    this.deleteButton = init?.addButton ?? ButtonElementModel.empty();
  }

  static empty() {
    return new TodoPageCustomContent({
      title: ElementModel.empty(),
      description: ElementModel.empty(),
      placeholder: ElementModel.empty(),
      itemsLength: ElementModel.empty(),
      addButton: ButtonElementModel.empty(),
      editButton: ButtonElementModel.empty(),
      deleteButton: ButtonElementModel.empty(),
    });
  }

  static parse(externalData: any) {}
}
