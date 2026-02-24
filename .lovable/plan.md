
# Transicao Dark-to-Light entre Hero e Projetos

## Conceito

Criar uma transicao elegante do fundo escuro (hero) para uma secao de projetos com fundo claro, dando respiro visual e destaque aos cards do portfolio.

## Mudancas

### 1. `src/components/PortfolioSection.tsx`
- Trocar `bg-background` por um fundo claro: `bg-white` ou cinza muito claro
- Adicionar um gradiente de transicao no topo da secao (dark -> light) usando um `div` absoluto com gradiente
- Ajustar cores do texto: titulo continua `gradient-text`, subtitulo passa a cinza escuro

### 2. `src/components/PortfolioFilters.tsx`
- Ajustar cores dos inputs e chips para funcionar no fundo claro:
  - Search input: fundo `bg-gray-100`, borda `border-gray-200`, texto escuro
  - Chips inativos: `bg-gray-100 text-gray-600 border-gray-200`
  - Chips ativos: mantém `gradient-bg text-white`

### 3. `src/components/PortfolioCard.tsx`
- Ajustar overlay do hover: `from-background` passa a `from-gray-900` (ou valor escuro fixo) para manter contraste no hover
- Tags, titulo e descricao no hover: manter textos claros pois o overlay escuro continua
- Borda do card: ajustar para funcionar em fundo claro

### 4. `src/index.css`
- Adicionar classe utilitaria `.section-light` com variaveis de cor para a secao clara
- Manter `.gradient-border-animated` funcional em fundo claro

### 5. `src/components/ContactFooter.tsx`
- Adicionar transicao gradiente no topo: light -> dark, retornando ao tema escuro
- Manter fundo escuro atual do footer

## Paleta da secao clara

```text
Fundo: #F8F9FC (cinza azulado bem claro)
Texto principal: #1A1A2E (quase preto)
Texto secundario: #6B7280 (cinza medio)
Bordas: #E5E7EB (cinza claro)
Inputs: #F3F4F6 (cinza muito claro)
```

## Transicoes entre secoes

```text
[Hero - dark] 
    |  gradiente ja existente (bottom gradient do hero)
    v
[PortfolioSection - claro #F8F9FC]
    |  gradiente no bottom da secao (claro -> escuro)
    v
[ContactFooter - dark]
```

## Detalhes tecnicos

- O gradiente de transicao hero->projetos ja existe parcialmente (o `div` com gradient no Hero). Vamos garantir que ele faz fade para a cor clara `#F8F9FC` em vez de `hsl(var(--background))`
- No bottom do PortfolioSection, adicionar um `div` absoluto com gradiente de `#F8F9FC` para `hsl(var(--background))` para suavizar a volta ao dark
- Os cards mantem seu comportamento atual de hover (overlay escuro com texto claro)
- O empty state (nenhum projeto) tambem precisa de ajuste de cores
