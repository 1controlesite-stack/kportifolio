

# Correcao de Contraste nos Cards do Portfolio

## Problema

O overlay gradiente atual usa `from-background via-background/40 to-transparent` com `opacity-70`, que resulta num contraste fraco -- o texto (titulo, descricao, tags) fica dificil de ler sobre a imagem, especialmente em imagens claras como a screenshot mostra.

## Solucao

### Arquivo: `src/components/PortfolioCard.tsx`

1. **Overlay mais forte no estado normal**: Aumentar a opacidade base do gradiente de `opacity-70` para `opacity-80`, e trocar `via-background/40` por `via-background/60` para cobrir mais area com contraste
2. **Hover ainda mais escuro**: Manter `group-hover:opacity-95` (ja esta bom)
3. **Titulo com mais peso**: Trocar `font-normal` por `font-semibold` e adicionar `drop-shadow-md` para garantir legibilidade mesmo sobre imagens claras
4. **Descricao com mais contraste**: Trocar `text-foreground/70` por `text-foreground/80`
5. **Tags com mais contraste**: Trocar `text-foreground/60` por `text-foreground/70` e `border-border/60` por `border-border/80`
6. **Text shadow sutil no conteudo**: Adicionar um estilo de text-shadow no container do conteudo para garantir legibilidade universal

| Linha | De | Para |
|---|---|---|
| 27 | `via-background/40 opacity-70` | `via-background/60 opacity-85` |
| 36 | `text-foreground/60`, `border-border/60` | `text-foreground/70`, `border-border/80` |
| 44 | `font-normal` | `font-semibold drop-shadow-md` |
| 49 | `text-foreground/70` | `text-foreground/85` |

