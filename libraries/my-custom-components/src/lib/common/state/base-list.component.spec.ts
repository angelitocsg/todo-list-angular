import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BaseListComponent } from './base-list.component';

describe('BaseListComponent (com inject)', () => {
  let component: TestComponent;
  let storeMock: TestStore;

  class TestStore {
    content$!: Observable<any>;
    data$!: Observable<any>;
    isLoading$!: Observable<any>;
    list$!: Observable<any>;
  }

  class TestComponent extends BaseListComponent<TestStore> {
    constructor() {
      super(TestStore);
    }
  }

  beforeEach(() => {
    storeMock = {
      content$: of({ valor: Math.random() }),
      data$: of({ valor: Math.random() }),
      isLoading$: of(Math.random() > 0.5),
      list$: of({ items: [{ valor: Math.random() }] }),
    };

    TestBed.configureTestingModule({
      providers: [TestComponent, { provide: TestStore, useValue: storeMock }],
    });

    component = TestBed.inject(TestComponent);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve injetar o store via construtor', () => {
    expect(component.store).toBe(storeMock);
  });

  it('deve expor o observable de conteúdo do store', () => {
    const resultado = component.content$;

    expect(resultado).toBe(storeMock.content$);
  });

  it('deve expor o observable de dados do store', () => {
    const resultado = component.data$;

    expect(resultado).toBe(storeMock.data$);
  });

  it('deve expor o observable de carregamento do store', () => {
    const resultado = component.isLoading$;

    expect(resultado).toBe(storeMock.isLoading$);
  });

  it('deve expor o observable de lista do store', () => {
    const resultado = component.list$;

    expect(resultado).toBe(storeMock.list$);
  });
});
