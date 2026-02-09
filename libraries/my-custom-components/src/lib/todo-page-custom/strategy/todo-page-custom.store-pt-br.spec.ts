import { TestBed } from '@angular/core/testing';
import { TodoPageCustomData } from '../todo-page-custom.data.model';
import { TodoPageCustomPtBrStore } from './todo-page-custom.store.pt-br';

describe('TodoPageCustomStore', () => {
  let store: TodoPageCustomPtBrStore;

  beforeEach(() => {
    jest.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [TodoPageCustomPtBrStore],
    });

    store = TestBed.inject(TodoPageCustomPtBrStore);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('deve iniciar o carregamento e finalizar após inicializar conteúdo e dados', async () => {
    const setIsLoadingSpy = jest.spyOn(store as any, 'setIsLoading');

    store.init();

    expect(setIsLoadingSpy).toHaveBeenCalledWith(true);

    jest.runAllTimers();

    await Promise.resolve();

    expect(setIsLoadingSpy).toHaveBeenLastCalledWith(false);
  });

  it('deve adicionar um novo item à lista', () => {
    const titulo = `titulo-${Math.random()}`;

    store.addTodo({ title: titulo });

    expect(store.list.items.length).toBe(1);
    expect(store.list.items[0].title).toBe(titulo);
  });

  it('deve retornar um item existente pelo índice', () => {
    const titulo = `titulo-${Math.random()}`;
    store.addTodo({ title: titulo });

    const resultado = store.getTodo(0);

    expect(resultado?.title).toBe(titulo);
  });

  it('deve retornar undefined ao buscar um índice inexistente', () => {
    const resultado = store.getTodo(999);

    expect(resultado).toBeUndefined();
  });

  it('deve atualizar o título quando o valor for válido', () => {
    const tituloInicial = `titulo-${Math.random()}`;
    const tituloAtualizado = `novo-${Math.random()}`;

    store.addTodo({ title: tituloInicial });

    store.updateTitle(0, new TodoPageCustomData({ title: ` ${tituloAtualizado} ` }));

    expect(store.list.items[0].title).toBe(tituloAtualizado);
  });

  it('não deve atualizar o título quando o valor for vazio', () => {
    const tituloInicial = `titulo-${Math.random()}`;

    store.addTodo({ title: tituloInicial });

    store.updateTitle(0, new TodoPageCustomData({ title: '   ' }));

    expect(store.list.items[0].title).toBe(tituloInicial);
  });

  it('deve alternar o estado de conclusão do item', () => {
    store.addTodo({ title: `titulo-${Math.random()}` });

    store.toggleDone(0);

    expect(store.list.items[0].done).toBe(true);
  });

  it('não deve falhar ao alternar um índice inexistente', () => {
    expect(() => store.toggleDone(5)).not.toThrow();
  });

  it('deve resetar o dado atual ao criar um novo item', () => {
    const updateDataSpy = jest.spyOn(store as any, 'updateData');

    store.newItem();

    expect(updateDataSpy).toHaveBeenCalled();
  });

  it('deve remover um item quando o índice for válido', () => {
    store.addTodo({ title: `a-${Math.random()}` });
    store.addTodo({ title: `b-${Math.random()}` });

    store.remove(0);

    expect(store.list.items.length).toBe(1);
  });

  it('não deve remover itens quando o índice for inválido', () => {
    store.addTodo({ title: `a-${Math.random()}` });

    store.remove(10);

    expect(store.list.items.length).toBe(1);
  });
});
