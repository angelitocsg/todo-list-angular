/**
 * Jest Transform - Processador de assets (imagens, fontes, etc)
 *
 * Transforma imports de arquivos estáticos em strings vazias
 * para evitar erros em testes que tentam processar binários.
 *
 * Usado pelo moduleNameMapper em jest.config.ts
 */

module.exports = {
  process() {
    return {
      code: "module.exports = {};",
    };
  },
  getCacheKey() {
    return "jest-asset-transform";
  },
};
