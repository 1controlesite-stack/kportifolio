
# Auditoria de Contraste -- Todos os Botoes e Elementos Clicaveis

## Problema Central

Os componentes de UI (pagination, buttons) usam variaveis do tema escuro (`--accent`, `--border`, `--muted-foreground`, etc.) que foram feitas para fundo escuro. Quando esses elementos aparecem dentro de `section-light` (fundo claro), o contraste desaparece -- texto cinza claro sobre fundo cinza claro.

## Elementos com Problema de Contraste

### 1. Paginacao (Anterior / Proximo / numeros) -- O PRINT
- **Arquivo:** `src/components/PortfolioSection.tsx` (linhas 140-164)
- **Causa:** `PaginationLink` usa `buttonVariants({ variant: "ghost" })` que aplica `hover:bg-accent hover:text-accent-foreground`. No tema escuro `accent` e um cinza escuro -- sobre fundo claro fica invisivel.
- **Correcao:** Passar classes explicitas de cor no `className` dos componentes de paginacao para forcar contraste adequado no contexto section-light: `text-[hsl(var(--sl-fg))]` para texto, `hover:bg-[hsl(var(--sl-border))]` para hover.

### 2. Botao "X" limpar busca nos filtros
- **Arquivo:** `src/components/PortfolioFilters.tsx` (linha 37)
- **Causa:** Usa `text-muted-foreground` (variavel escura) sobre fundo claro.
- **Correcao:** Trocar para `text-[hsl(var(--sl-muted))] hover:text-[hsl(var(--sl-fg))]`.

### 3. Icone de busca nos filtros
- **Arquivo:** `src/components/PortfolioFilters.tsx` (linha 30)
- **Causa:** `text-muted-foreground` sobre fundo claro.
- **Correcao:** Trocar para `text-[hsl(var(--sl-muted))]`.

### 4. Navegacao prev/next no ProjectDetail
- **Arquivo:** `src/pages/ProjectDetail.tsx` (linhas 134, 139)
- **Status:** Ja usa `text-[hsl(var(--sl-muted))]` -- OK, mas o hover pode ser mais forte.
- **Correcao:** Adicionar `font-medium` ao hover state para melhor destaque.

### 5. Botao "Ver mais / Ver menos" na descricao
- **Arquivo:** `src/pages/ProjectDetail.tsx` (linha 16)
- **Status:** Usa `text-primary` que e roxo -- funciona OK no claro. Sem mudanca necessaria.

### 6. Botao "Voltar" no header do ProjectDetail
- **Arquivo:** `src/pages/ProjectDetail.tsx` (linha 62)
- **Status:** Ja usa `text-[hsl(var(--sl-muted))]` -- OK.

### 7. Botao "Ver ao vivo" no header do ProjectDetail
- **Arquivo:** `src/pages/ProjectDetail.tsx` (linha 67)
- **Status:** Usa `gradient-bg text-primary-foreground` -- OK, alto contraste.

### 8. Pagina 404
- **Arquivo:** `src/pages/NotFound.tsx`
- **Causa:** Usa `bg-muted` (cinza escuro do tema) como fundo e `text-muted-foreground` -- fica tudo escuro/ilegivel.
- **Correcao:** Aplicar `section-light` como fundo e ajustar as cores dos textos.

---

## Detalhes Tecnicos das Correcoes

### `src/components/PortfolioSection.tsx`
Nas linhas da paginacao, adicionar classes de cor explicitas:
- `PaginationPrevious` e `PaginationNext`: adicionar `text-[hsl(var(--sl-fg))] hover:bg-[hsl(var(--sl-border))]`
- `PaginationLink`: adicionar `text-[hsl(var(--sl-fg))] hover:bg-[hsl(var(--sl-border))]`, e quando `isActive` usar `border-[hsl(var(--sl-fg))] text-[hsl(var(--sl-fg))]`
- `PaginationEllipsis`: fica no mesmo contexto, adicionar `text-[hsl(var(--sl-muted))]`

### `src/components/PortfolioFilters.tsx`
- Linha 30 (Search icon): `text-muted-foreground` -> `text-[hsl(var(--sl-muted))]`
- Linha 37 (X button): `text-muted-foreground hover:text-foreground` -> `text-[hsl(var(--sl-muted))] hover:text-[hsl(var(--sl-fg))]`

### `src/pages/NotFound.tsx`
- `bg-muted` -> `section-light`
- Textos: usar variaveis `--sl-fg` e `--sl-muted`
- Link "Return to Home": manter `text-primary` (funciona em ambos fundos)

## Resumo

| Arquivo | Mudanca |
|---|---|
| `PortfolioSection.tsx` | Classes de cor explicitas na paginacao (prev, next, numeros, ellipsis) |
| `PortfolioFilters.tsx` | Icone de busca e botao X com cores section-light |
| `NotFound.tsx` | Fundo section-light + cores de texto ajustadas |
| `ProjectDetail.tsx` | Hover mais forte nos links de navegacao |
