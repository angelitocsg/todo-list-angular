import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { BehaviorSubject } from 'rxjs';
import { LibraryStore } from '../../libraries/my-custom-components/src/lib/library.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storeMock: {
    current$: BehaviorSubject<any>;
    current: any;
    update: jest.Mock;
  };

  beforeEach(async () => {
    storeMock = {
      current$: new BehaviorSubject({ lang: 'enUS' }),
      current: { lang: 'enUS' },
      update: jest.fn((value) => {
        storeMock.current = { ...storeMock.current, ...value };
        storeMock.current$.next(storeMock.current);
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: LibraryStore,
          useValue: storeMock,
        },
      ],
    }).compileComponents();

    jest.spyOn(console, 'log').mockImplementation();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve registrar o idioma atual no console ao se inscrever no estado', () => {
    expect(console.log).toHaveBeenCalledWith('[app] current lang: enUS');
  });

  it('deve alternar o idioma para ptBR ao executar toggleClick quando o idioma atual for enUS', () => {
    component.toggleClick();

    expect(storeMock.update).toHaveBeenCalledWith({ lang: 'ptBR' });
    expect(storeMock.current.lang).toBe('ptBR');
  });

  it('deve alternar o idioma para enUS ao executar toggleClick quando o idioma atual for ptBR', () => {
    storeMock.current = { lang: 'ptBR' };
    storeMock.current$.next(storeMock.current);

    component.toggleClick();

    expect(storeMock.update).toHaveBeenCalledWith({ lang: 'enUS' });
    expect(storeMock.current.lang).toBe('enUS');
  });

  it('deve cancelar a inscrição no estado ao destruir o componente', () => {
    const unsubscribeSpy = jest.spyOn((component as any).stateSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('deve renderizar os links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a.default')?.innerHTML).toContain('Default');
    expect(compiled.querySelector('a.tobe')?.innerHTML).toContain('To be');
  });
});
