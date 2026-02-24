

# Melhorias na Barra de Filtros do Portfolio

## Problemas identificados (pela screenshot)

1. **Barra de filtros nao ocupa 100% da largura** -- o `max-w-sm` na caixa de busca limita o tamanho, e o layout nao se espalha
2. **Caixa de pesquisa pequena** -- altura `h-9` e `max-w-sm` deixam o input apertado
3. **"Nenhuma encontrada" mal cabe** -- o `CommandEmpty` com `text-xs` e o popover com `w-48` sao muito estreitos

## Alteracoes

### Arquivo: `src/components/PortfolioFilters.tsx`

1. **Layout full-width**: Trocar `justify-center` por `justify-between` no container principal, e remover `max-w-sm` do input de busca para que o `flex-1` ocupe todo o espaco disponivel
2. **Input maior**: Aumentar altura de `h-9` para `h-11`, e aumentar o tamanho do texto de `text-sm` para `text-base`
3. **Popover mais largo**: Aumentar `w-48` para `w-56` no `PopoverContent` para que "Nenhuma encontrada." caiba confortavelmente
4. **Texto do empty state**: Aumentar de `text-xs` para `text-sm` no `CommandEmpty`

| Linha | Mudanca |
|---|---|
| 36 | `justify-center` -> `justify-between` |
| 38 | Remover `max-w-sm` |
| 45 | `h-9` -> `h-11`, `text-sm` -> `text-base` |
| 99 | `w-48` -> `w-56` |
| 103 | `CommandEmpty` text `text-xs` -> `text-sm` |

