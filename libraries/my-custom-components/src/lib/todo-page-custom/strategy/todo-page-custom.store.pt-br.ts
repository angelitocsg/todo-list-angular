import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ButtonElement, TextElement } from '../../common';
import { TodoPageCustomEnUsStore } from './todo-page-custom.store-en-us';

@Injectable()
export class TodoPageCustomPtBrStore extends TodoPageCustomEnUsStore {
  protected override initContent(): Observable<boolean> {
    return from<Promise<boolean>>(
      new Promise((resolve) => {
        setTimeout(() => {
          this.updateContent({
            title: TextElement.create('Lista de tarefas', true),
            description: TextElement.create('Versão ideal', true),
            placeholder: TextElement.create('adicione uma nova tarefa', true),
            itemsLength: TextElement.create('itens', true),
            addButton: ButtonElement.create('adicionar', true),
            editButton: ButtonElement.create('editar', true),
            deleteButton: ButtonElement.create('remover', true),
          });
          console.info('[store] pt-BR content loaded');
          resolve(true);
        }, 1000);
      }),
    );
  }
}
