

# Correção de Bugs: Z-index dos Filtros e Estado Vazio

## Bug 1: Hover dos cards cobre a barra de filtros/dropdown

O problema: os cards usam `whileHover={{ zIndex: 100 }}` no framer-motion, o que faz o card subir acima do dropdown de categorias "Mais". O container dos filtros precisa de um z-index maior.

### Arquivo: `src/components/PortfolioSection.tsx`

- Adicionar `className="relative z-[110]"` ao `motion.div` que envolve o `PortfolioFilters` (linha 46), garantindo que a barra de filtros e seu dropdown fiquem sempre acima dos cards com hover.

## Bug 2: Pesquisa global nao mostra estado vazio

Pela screenshot, parece que a busca dentro do combobox "Mais" (que e apenas para filtrar categorias) esta sendo confundida com a busca global. O estado vazio ja existe no codigo (linhas 61-96) e deveria funcionar. O problema pode ser que a busca global (input principal) nao esta visivel ou acessivel por causa do z-index.

A correcao do z-index (Bug 1) deve resolver a acessibilidade do input de busca. Tambem vou verificar que o estado vazio esta renderizando corretamente quando `filtered.length === 0`.

## Resumo

| Arquivo | Acao |
|---|---|
| `src/components/PortfolioSection.tsx` | Adicionar `relative z-[110]` ao wrapper dos filtros |

Correcao simples e cirurgica -- apenas o z-index do container de filtros precisa ser elevado acima do `zIndex: 100` dos cards em hover.

