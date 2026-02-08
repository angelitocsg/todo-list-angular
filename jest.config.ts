import type { Config } from 'jest';

const config: Config = {
  // Fornece transformadores, resolvedores e serializadores corretos para Angular
  preset: 'jest-preset-angular',
  // Inicializa TestBed, Zone.js, polyfills, etc
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Define como Jest compila arquivos antes de executar
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  // Simula um navegador (tem window, document, DOM, etc)
  testEnvironment: 'jsdom',
  // Facilita imports usando síntaxe de alias (@app/*, @models/*, etc)
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'jest-preset-angular/build/null-transform',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest.transform.js',
  },
  // Arquivos a ignorar na busca de testes
  // Sem isso, Jest processa 60k+ arquivos do node_modules (muito lento!)
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>\\.angular/',
  ],
  // Extensões de arquivo que Jest deve processar como módulos
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'html'],
  // Diretórios onde Jest procura por testes e módulos
  roots: ['<rootDir>/src', '<rootDir>/libraries'],
  // Padrões de arquivo considerados testes
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  // Arquivos para coletar coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.spec.ts',
    '!src/**/*.spec.tsx',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environments/**',
    'libraries/my-custom-components/src/lib/**/*.ts',
    '!libraries/my-custom-components/src/**/*.spec.ts',
    '!libraries/my-custom-components/src/**/index.ts',
    '!libraries/my-custom-components/src/**/*.module.ts',
    '!libraries/my-custom-components/src/**/*.content.model.ts',
    '!libraries/my-custom-components/src/**/*.data.model.ts',
  ],
  // Threshold mínimo de cobertura
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/app/': {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    './libraries/my-custom-components/src/lib/': {
      branches: 75,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  // Provider de coverage
  coverageProvider: 'v8',
  // Serializadores para snapshots
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  //impar mocks antes de cada teste
  clearMocks: true,
  // Restaurar mocks antes de cada teste
  restoreMocks: true,
  // Resetar módulos antes de cada teste
  resetModules: true,
  // Padrões de arquivos a ignorar em watch mode
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/coverage/'],
  // Usar Watchman para file watching (mais rápido)
  watchman: true,
  // Indicador se testes são lentos (em segundos)
  slowTestThreshold: 5,
};

export default config;
