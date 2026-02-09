import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ButtonElementModel, TextElementModel } from '../../common';
import { TodoPageCustomEnUsStore } from './todo-page-custom.store-en-us';

@Injectable()
export class TodoPageCustomPtBrStore extends TodoPageCustomEnUsStore {
  protected override initContent(): Observable<boolean> {
    return from<Promise<boolean>>(
      new Promise((resolve) => {
        setTimeout(() => {
          this.updateContent({
            title: TextElementModel.create('Lista de tarefas', true),
            description: TextElementModel.create('Versão ideal', true),
            placeholder: TextElementModel.create('adicione uma nova tarefa', true),
            itemsLength: TextElementModel.create('itens', true),
            addButton: ButtonElementModel.create('adicionar', true),
            editButton: ButtonElementModel.create('editar', true),
            deleteButton: ButtonElementModel.create('remover', true),
          });
          console.info('[store] pt-BR content loaded');
          resolve(true);
        }, 1000);
      }),
    );
  }
}
