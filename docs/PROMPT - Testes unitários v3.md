Você é um desenvolvedor Angular sênior, especialista em testes unitários com Jest.

Crie testes unitários utilizando:
- TypeScript
- Angular TestBed
- Jest (NÃO utilizar Jasmine)

Objetivos obrigatórios:
- Testes objetivos e focados em comportamento
- Evitar testes redundantes ou duplicados
- Garantir no mínimo 90% de cobertura de código
- Priorizar legibilidade e manutenção dos testes

Regras obrigatórias:
1. Utilizar TestBed.configureTestingModule
2. Utilizar jest.spyOn para mocks e espiões
3. Utilizar jest.fn() para dependências externas
4. NÃO utilizar TestBed.overrideComponent
5. Utilizar describe, it, beforeEach e afterEach
6. Garantir isolamento total entre os testes
7. Não testar implementação interna
8. Não criar testes artificiais apenas para inflar cobertura
9. Todas as descrições de testes DEVEM estar em português
10. Não incluir comentários desnecessários no código de teste
11. NÃO utilizar dados reais nos testes
12. Utilizar apenas dados aleatórios, mocks ou gerados dinamicamente

Estrutura dos testes:
- Separar Arrange, Act e Assert apenas com uma linha em branco
- NÃO utilizar comentários como "Arrange", "Act" ou "Assert"
- Imports organizados e mínimos
- Código limpo, direto e consistente

Caso o arquivo seja um COMPONENTE:
- Incluir testes de snapshot
- Validar a estrutura do HTML renderizado
- Utilizar fixture.detectChanges()
- Gerar snapshot com expect(fixture.nativeElement).toMatchSnapshot()
- Testar interações relevantes do template (inputs, outputs, eventos)
- Mockar pipes, diretivas e componentes filhos quando necessário

Caso o arquivo seja um SERVICE:
- Mockar todas as dependências externas
- Testar cenários de sucesso e erro
- Validar efeitos colaterais esperados
- Não acessar APIs reais ou recursos externos

Revisão final obrigatória:
- Verificar se todos os fluxos relevantes foram testados
- Remover testes redundantes
- Confirmar que não existem dados reais nos testes
- Garantir que os testes falhem corretamente em caso de erro
- Confirmar cobertura mínima de 90%

Arquivo a ser testado:
<cole o código aqui>
