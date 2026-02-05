import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageCustomComponent } from './todo-page-custom.component';

describe('TodoPageCustomComponent', () => {
  let component: TodoPageCustomComponent;
  let fixture: ComponentFixture<TodoPageCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoPageCustomComponent],
    });
    fixture = TestBed.createComponent(TodoPageCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
