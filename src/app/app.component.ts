import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LibraryStore } from '../../libraries/my-custom-components/src/lib/library.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'todo-list';

  private stateSubscription: Subscription;

  constructor(private libraryStore: LibraryStore) {
    this.stateSubscription = this.libraryStore.current$.subscribe((value) =>
      console.log(`[app] current lang: ${value.lang}`),
    );
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  toggleClick() {
    this.libraryStore.update({ lang: 'enUS' === this.libraryStore.current.lang ? 'ptBR' : 'enUS' });
  }
}
