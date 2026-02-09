import { Injectable } from '@angular/core';
import { StateStore } from './common';

export type LibraryState = {
  lang: 'ptBR' | 'enUS';
};

@Injectable({ providedIn: 'root' })
export class LibraryStore extends StateStore<LibraryState> {
  constructor() {
    super({ lang: 'enUS' });
  }
}
