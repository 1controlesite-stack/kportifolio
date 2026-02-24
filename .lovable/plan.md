

# Corrigir tamanho da coluna 1 -- abordagem correta

## Problema real

O `transform: scale()` nao resolve o problema porque o `scale` e puramente visual -- ele nao altera o espaco que o elemento ocupa no grid. O grid continua alocando a mesma largura para a coluna 1, entao o card fica "ampliado" mas transborda ou nao se alinha corretamente.

O problema real: colunas 2, 3 e 4 tem `marginLeft: -1.5rem`, o que faz com que elas "invadam" 1.5rem para a esquerda, ganhando largura visual extra. A coluna 1 nao tem essa compensacao.

## Solucao correta

Em vez de `scale`, aplicar `marginRight: -1.5rem` nos cards da coluna 1. Isso faz o card da coluna 1 se estender 1.5rem para a direita, ganhando exatamente a mesma largura visual extra que as outras colunas ganham ao se estender para a esquerda.

### Arquivo: `src/components/PortfolioSection.tsx`

- Remover o `transform: "scale(1.2)"` e `transformOrigin` da coluna 0
- Adicionar `marginRight: "-1.5rem"` quando `col === 0`
- Manter `marginLeft: "-1.5rem"` para `col !== 0`

Resultado: todas as 4 colunas ocupam visualmente a mesma largura, sem distorcao de escala.

```text
Antes (scale):  Card 1 ampliado mas grid aloca mesma largura = transborda/desalinha
Depois (margin): Card 1 se estende 1.5rem pra direita = mesma largura visual das outras
```

