import { TestBed } from '@angular/core/testing';

import { MyCustomComponentsService } from './todo-page-custom.service';

describe('MyCustomComponentsService', () => {
  let service: MyCustomComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCustomComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
