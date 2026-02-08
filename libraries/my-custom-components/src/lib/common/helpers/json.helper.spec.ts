import { jsonCastTo } from './json.helper';

describe('jsonCastTo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve retornar uma cópia profunda de um objeto serializável', () => {
    const valorAleatorio = Math.random();
    const objeto = {
      chave: valorAleatorio,
      aninhado: {
        outroValor: Math.random(),
      },
    };

    const resultado = jsonCastTo<typeof objeto>(objeto);

    expect(resultado).toEqual(objeto);
    expect(resultado).not.toBe(objeto);
    expect(resultado.aninhado).not.toBe(objeto.aninhado);
  });

  it('deve preservar corretamente um valor primitivo', () => {
    const numero = Math.floor(Math.random() * 1000);

    const resultado = jsonCastTo<number>(numero);

    expect(resultado).toBe(numero);
  });

  it('deve lançar erro quando a serialização falhar', () => {
    jest.spyOn(JSON, 'stringify').mockImplementation(() => {
      throw new Error('erro de serialização');
    });

    const valor = { qualquer: Math.random() };

    expect(() => jsonCastTo(valor)).toThrow();
  });
});
