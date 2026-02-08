import { TestBed } from '@angular/core/testing';

import { TodoPageCustomService } from './todo-page-custom.service';

describe('TodoPageCustomService', () => {
  let service: TodoPageCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoPageCustomService],
    });
    service = TestBed.inject(TodoPageCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be an instance of TodoPageCustomService', () => {
    expect(service instanceof TodoPageCustomService).toBe(true);
  });
});

