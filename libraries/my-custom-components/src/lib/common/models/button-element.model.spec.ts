import { ButtonElement } from './button-element.model';

describe('ButtonElementModel', () => {
  it('deve criar uma instância com valores padrão quando não recebe init', () => {
    const model = new ButtonElement();

    expect(model.text).toBe('');
    expect(model.show).toBeFalsy();
    expect(model.disabled).toBe(false);
  });

  it('deve inicializar corretamente as propriedades quando recebe init', () => {
    const model = new ButtonElement({
      text: 'Salvar',
      show: true,
      disabled: true,
    });

    expect(model.text).toBe('Salvar');
    expect(model.show).toBe(true);
    expect(model.disabled).toBe(true);
  });

  it('deve assumir disabled como false quando não informado no init', () => {
    const model = new ButtonElement({
      text: 'Cancelar',
      show: true,
    });

    expect(model.disabled).toBe(false);
  });

  it('create deve retornar uma instância de ButtonElementModel com text e show definidos', () => {
    const model = ButtonElement.create('Confirmar', true);

    expect(model).toBeInstanceOf(ButtonElement);
    expect(model.text).toBe('Confirmar');
    expect(model.show).toBe(true);
    expect(model.disabled).toBe(false);
  });

  it('empty deve retornar uma instância vazia e invisível', () => {
    const model = ButtonElement.empty();

    expect(model).toBeInstanceOf(ButtonElement);
    expect(model.text).toBe('');
    expect(model.show).toBe(false);
    expect(model.disabled).toBe(false);
  });

  it('empty deve sempre sobrescrever valores herdados', () => {
    const model = ButtonElement.empty();

    model.text = 'Qualquer';
    model.show = true;
    model.disabled = true;

    const empty = ButtonElement.empty();

    expect(empty.text).toBe('');
    expect(empty.show).toBe(false);
    expect(empty.disabled).toBe(false);
  });
});
