import { TestBed } from '@angular/core/testing';

import { TodoPageCustomService } from './todo-page-custom.service';

describe('TodoPageCustomService', () => {
  let service: TodoPageCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoPageCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
