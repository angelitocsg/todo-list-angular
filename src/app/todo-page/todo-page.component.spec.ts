import { TestBed, ComponentFixture } from "@angular/core/testing";
import { TodoPageComponent } from "./todo-page.component";

describe("TodoPageComponent", () => {
  let fixture: ComponentFixture<TodoPageComponent>;
  let component: TodoPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("deve renderizar corretamente o template inicial", () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it("deve adicionar um todo quando o título for válido", () => {
    const titulo = `tarefa-${Math.random()}`;
    component.newTitle = `  ${titulo}  `;

    component.addTodo();

    expect(component.todos.length).toBe(1);
    expect(component.todos[0]).toEqual({ title: titulo, done: false });
    expect(component.newTitle).toBe("");
  });

  it("não deve adicionar um todo quando o título for vazio ou inválido", () => {
    component.newTitle = "   ";

    component.addTodo();

    expect(component.todos.length).toBe(0);
  });

  it("deve alternar o estado de conclusão de um todo existente", () => {
    component.todos = [{ title: `tarefa-${Math.random()}`, done: false }];

    component.toggleDone(0);

    expect(component.todos[0].done).toBe(true);
  });

  it("não deve falhar ao tentar alternar um índice inexistente", () => {
    component.toggleDone(999);

    expect(component.todos.length).toBe(0);
  });

  it("deve editar o título do todo quando o prompt retornar valor válido", () => {
    const tituloInicial = `tarefa-${Math.random()}`;
    const tituloAtualizado = `editado-${Math.random()}`;

    component.todos = [{ title: tituloInicial, done: false }];

    jest.spyOn(window, "prompt").mockReturnValue(` ${tituloAtualizado} `);

    component.editTodo(0);

    expect(component.todos[0].title).toBe(tituloAtualizado);
  });

  it("não deve alterar o título quando o prompt for cancelado", () => {
    const titulo = `tarefa-${Math.random()}`;
    component.todos = [{ title: titulo, done: false }];

    jest.spyOn(window, "prompt").mockReturnValue(null);

    component.editTodo(0);

    expect(component.todos[0].title).toBe(titulo);
  });

  it("deve remover um todo quando o índice for válido", () => {
    component.todos = [
      { title: `tarefa-${Math.random()}`, done: false },
      { title: `tarefa-${Math.random()}`, done: false },
    ];

    component.removeTodo(0);

    expect(component.todos.length).toBe(1);
  });

  it("não deve remover nada quando o índice for inválido", () => {
    component.todos = [{ title: `tarefa-${Math.random()}`, done: false }];

    component.removeTodo(5);

    expect(component.todos.length).toBe(1);
  });
});
