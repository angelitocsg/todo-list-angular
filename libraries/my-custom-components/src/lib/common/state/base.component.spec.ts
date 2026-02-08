import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: TestComponent;
  let storeMock: any;

  class TestComponent extends BaseComponent<any> {
    setStore(store: any) {
      this.store = store;
    }
  }

  beforeEach(() => {
    storeMock = {
      content$: of({ valor: Math.random() }),
      data$: of({ valor: Math.random() }),
      isLoading$: of(Math.random() > 0.5),
    };

    TestBed.configureTestingModule({
      providers: [TestComponent],
    });

    component = TestBed.inject(TestComponent);
    component.setStore(storeMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
});
