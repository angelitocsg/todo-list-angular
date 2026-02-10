import { ButtonElementModel } from './button-element.model';

describe('ButtonElementModel', () => {
  it('deve criar uma instância com valores padrão quando não recebe init', () => {
    const model = new ButtonElementModel();

    expect(model.text).toBe('');
    expect(model.show).toBeFalsy();
    expect(model.disabled).toBe(false);
  });

  it('deve inicializar corretamente as propriedades quando recebe init', () => {
    const model = new ButtonElementModel({
      text: 'Salvar',
      show: true,
      disabled: true,
    });

    expect(model.text).toBe('Salvar');
    expect(model.show).toBe(true);
    expect(model.disabled).toBe(true);
  });

  it('deve assumir disabled como false quando não informado no init', () => {
    const model = new ButtonElementModel({
      text: 'Cancelar',
      show: true,
    });

    expect(model.disabled).toBe(false);
  });

  it('create deve retornar uma instância de ButtonElementModel com text e show definidos', () => {
    const model = ButtonElementModel.create('Confirmar', true);

    expect(model).toBeInstanceOf(ButtonElementModel);
    expect(model.text).toBe('Confirmar');
    expect(model.show).toBe(true);
    expect(model.disabled).toBe(false);
  });

  it('empty deve retornar uma instância vazia e invisível', () => {
    const model = ButtonElementModel.empty();

    expect(model).toBeInstanceOf(ButtonElementModel);
    expect(model.text).toBe('');
    expect(model.show).toBe(false);
    expect(model.disabled).toBe(false);
  });

  it('empty deve sempre sobrescrever valores herdados', () => {
    const model = ButtonElementModel.empty();

    model.text = 'Qualquer';
    model.show = true;
    model.disabled = true;

    const empty = ButtonElementModel.empty();

    expect(empty.text).toBe('');
    expect(empty.show).toBe(false);
    expect(empty.disabled).toBe(false);
  });
});
