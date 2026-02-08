/**
 * Jest Setup - Configuração do ambiente de testes
 *
 * Este arquivo é executado ANTES de cada suite de testes.
 * Responsável por:
 * - Inicializar jest-preset-angular
 * - Configurar Zone.js para testes
 * - Simular objetos globais do browser
 *
 * Referência: https://github.com/thymikee/jest-preset-angular
 */

// Já é feito por jest-preset-angular, mas incluímos para clareza
import 'zone.js';
import 'zone.js/testing';

// Simular objetos globais que aplicação pode usar
Object.defineProperty(window, 'CSS', { value: null, writable: true });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return { display: 'none', appearance: ['-webkit-appearance'] };
  },
});
Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>' });
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return { enumerable: true, configurable: true };
  },
  configurable: true,
});

// Angular TestBed Configuration
// Remove avisos de deprecação durante testes

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

/**
 * Suppress console errors/warnings se necessário
 * Descomente conforme necessidade do projeto
 */
// const originalError = console.error;
// beforeAll(() => {
//   console.error = (...args: any[]) => {
//     if (
//       typeof args[0] === 'string' &&
//       args[0].includes('NG0100: ExpressionChangedAfterItHasBeenChecked')
//     ) {
//       return;
//     }
//     originalError.call(console, ...args);
//   };
// });

// afterAll(() => {
//   console.error = originalError;
// });
