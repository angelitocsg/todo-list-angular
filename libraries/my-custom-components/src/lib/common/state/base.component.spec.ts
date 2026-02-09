import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from './base.component';

type FakeStoreState = {
  value: string;
};

@Injectable()
class FakeStore {
  private contentSubject = new BehaviorSubject<FakeStoreState>({ value: 'content' });
  private dataSubject = new BehaviorSubject<FakeStoreState>({ value: 'data' });
  private loadingSubject = new BehaviorSubject<boolean>(false);

  content$ = this.contentSubject.asObservable();
  data$ = this.dataSubject.asObservable();
  isLoading$ = this.loadingSubject.asObservable();
}

@Component({
  template: '',
})
class TestComponent extends BaseComponent<FakeStore> {
  constructor() {
    super(FakeStore);
  }
}

@Component({
  template: '',
})
class StrategyComponent extends BaseComponent<FakeStore> {
  constructor(strategies: Record<string, FakeStore>) {
    super(strategies, true);
  }
}

describe('BaseComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeStore],
    });
  });

  it('deve injetar o store corretamente quando não utiliza strategy', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;

    expect(component.store).toBeInstanceOf(FakeStore);
  });

  it('deve expor content$, data$ e isLoading$ do store', (done) => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;

    let checks = 0;

    component.content$.subscribe((v) => {
      expect(v.value).toBe('content');
      checks++;
    });

    component.data$.subscribe((v) => {
      expect(v.value).toBe('data');
      checks++;
    });

    component.isLoading$.subscribe((v) => {
      expect(v).toBe(false);
      checks++;
    });

    if (checks === 3) done();
  });

  it('deve permitir resolver uma strategy válida', () => {
    const storeA = new FakeStore();
    const storeB = new FakeStore();

    const component = new StrategyComponent({
      a: storeA,
      b: storeB,
    });

    component.resolveStrategy('b');

    expect(component.store).toBe(storeB);
  });

  it('deve lançar erro ao tentar resolver strategy sem configuração', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;

    expect(() => component.resolveStrategy('qualquer')).toThrow(
      'No strategy was found or defined in the constructor.',
    );
  });

  it('deve lançar erro ao tentar resolver uma strategy inexistente', () => {
    const storeA = new FakeStore();

    const component = new StrategyComponent({
      a: storeA,
    });

    expect(() => component.resolveStrategy('b')).toThrow('Strategy "b" not found. Strategies: a');
  });
});
