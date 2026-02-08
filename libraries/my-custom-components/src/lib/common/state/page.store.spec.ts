import { TestBed } from '@angular/core/testing';
import { PageStore } from './page.store';
import { StateStore } from './state.store';

describe('PageStore', () => {
  let store: TestPageStore<any, any>;

  class TestPageStore<TContent, TData> extends PageStore<TContent, TData> {}

  beforeEach(() => {
    TestBed.configureTestingModule({});

    store = new TestPageStore({ valor: Math.random() }, { dado: Math.random() });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve expor o observable de conteúdo', () => {
    const resultado = store.content$;

    expect(resultado).toBeInstanceOf(Object);
  });

  it('deve expor o conteúdo atual', () => {
    const resultado = store.content;

    expect(resultado).toEqual(store.content);
  });

  it('deve atualizar o conteúdo através do método público', () => {
    const updateSpy = jest.spyOn(StateStore.prototype, 'update');
    const novoValor = { valor: Math.random() };

    store.updateContent(novoValor);

    expect(updateSpy).toHaveBeenCalledWith(novoValor);
  });

  it('deve expor o observable de dados', () => {
    const resultado = store.data$;

    expect(resultado).toBeInstanceOf(Object);
  });

  it('deve expor os dados atuais', () => {
    const resultado = store.data;

    expect(resultado).toEqual(store.data);
  });

  it('deve atualizar os dados através do método público', () => {
    const updateSpy = jest.spyOn(StateStore.prototype, 'update');
    const novoDado = { dado: Math.random() };

    store.updateData(novoDado);

    expect(updateSpy).toHaveBeenCalledWith(novoDado);
  });

  it('deve iniciar com estado de carregamento falso', () => {
    const resultado = store.isLoading;

    expect(resultado).toBe(false);
  });

  it('deve atualizar o estado de carregamento quando solicitado', () => {
    const updateSpy = jest.spyOn(StateStore.prototype, 'update');

    store.setIsLoading(true);

    expect(updateSpy).toHaveBeenCalledWith(true);
  });

  it('deve expor o observable de carregamento', () => {
    const resultado = store.isLoading$;

    expect(resultado).toBeInstanceOf(Object);
  });
});
