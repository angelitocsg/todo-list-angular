import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoPageCustomEnUsStore } from './strategy/todo-page-custom.store-en-us';
import { TodoPageCustomComponent } from './todo-page-custom.component';
import { TodoPageCustomData } from './todo-page-custom.data.model';

describe('TodoPageCustomComponent', () => {
  let component: TodoPageCustomComponent;
  let fixture: ComponentFixture<TodoPageCustomComponent>;
  let store: TodoPageCustomEnUsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPageCustomComponent);
    component = fixture.componentInstance;
    store = (component as any).store;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize store and create form on ngOnInit', () => {
    fixture.detectChanges();
    expect(store).toBeDefined();
    expect(component.form).toBeDefined();
    expect(component.form.get('itemTitle')).toBeDefined();
  });

  it('should create form with itemTitle control', () => {
    store.init();
    component.createForm();
    expect(component.form.get('itemTitle')).toBeDefined();
  });

  it('should validate itemTitle as required', () => {
    store.init();
    component.createForm();
    const control = component.form.get('itemTitle');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTruthy();
    control?.setValue('Valid Title');
    expect(control?.hasError('required')).toBeFalsy();
  });

  it('should call store.updateData on form value changes', () => {
    jest.useFakeTimers();
    const updateDataSpy = jest.spyOn(store, 'updateData');
    const control = component.form.get('itemTitle');
    control?.setValue('New Title');
    jest.runAllTimers();
    expect(updateDataSpy).toHaveBeenCalledWith({
      title: 'New Title',
    } as TodoPageCustomData);
    updateDataSpy.mockRestore();
    jest.useRealTimers();
  });

  it('should add todo with valid title', () => {
    const addTodoSpy = jest.spyOn(store, 'addTodo');
    const newItemSpy = jest.spyOn(store, 'newItem');
    const control = component.form.get('itemTitle');
    control?.setValue('  Test Todo  ');
    component.addTodoAction();
    expect(addTodoSpy).toHaveBeenCalledWith({ title: 'Test Todo' });
    expect(newItemSpy).toHaveBeenCalled();
    expect(component.form.get('itemTitle')?.value).toBeNull();
    addTodoSpy.mockRestore();
    newItemSpy.mockRestore();
  });

  it('should not add todo with empty or whitespace title', () => {
    const addTodoSpy = jest.spyOn(store, 'addTodo');
    const control = component.form.get('itemTitle');
    control?.setValue('   ');
    component.addTodoAction();
    expect(addTodoSpy).not.toHaveBeenCalled();
    addTodoSpy.mockRestore();
  });

  it('should toggle done status for todo at index', () => {
    const toggleDoneSpy = jest.spyOn(store, 'toggleDone');
    component.toggleDoneClick(0);
    expect(toggleDoneSpy).toHaveBeenCalledWith(0);
    toggleDoneSpy.mockRestore();
  });

  it('should edit todo title with user input', () => {
    const mockTodo = new TodoPageCustomData({ title: 'Old Title' });
    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('Updated Title');
    const getTodoSpy = jest.spyOn(store, 'getTodo').mockReturnValue(mockTodo);
    const updateTitleSpy = jest.spyOn(store, 'updateTitle').mockImplementation(() => {
      // Mock implementation to avoid accessing undefined list
    });
    component.editTodoClick(0);
    expect(updateTitleSpy).toHaveBeenCalled();
    promptSpy.mockRestore();
    getTodoSpy.mockRestore();
    updateTitleSpy.mockRestore();
  });

  it('should not edit todo when prompt is cancelled', () => {
    const mockTodo = new TodoPageCustomData({ title: 'Old Title' });
    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue(null);
    const getTodoSpy = jest.spyOn(store, 'getTodo').mockReturnValue(mockTodo);
    const updateTitleSpy = jest.spyOn(store, 'updateTitle');
    component.editTodoClick(0);
    expect(updateTitleSpy).not.toHaveBeenCalled();
    promptSpy.mockRestore();
    getTodoSpy.mockRestore();
    updateTitleSpy.mockRestore();
  });

  it('should not edit todo when getTodo returns undefined', () => {
    const getTodoSpy = jest.spyOn(store, 'getTodo').mockReturnValue(undefined);
    const updateTitleSpy = jest.spyOn(store, 'updateTitle');
    component.editTodoClick(0);
    expect(updateTitleSpy).not.toHaveBeenCalled();
    getTodoSpy.mockRestore();
    updateTitleSpy.mockRestore();
  });

  it('should remove todo at index', () => {
    const removeSpy = jest.spyOn(store, 'remove');
    component.removeTodoClick(0);
    expect(removeSpy).toHaveBeenCalledWith(0);
    removeSpy.mockRestore();
  });
});
