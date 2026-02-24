

# Reforcar Contraste dos Cards do Portfolio

## Problema

O overlay gradiente atual ainda deixa o fundo claro demais, especialmente no centro da imagem onde o `via-background/60` nao cobre o suficiente. No hover, `opacity-95` ajuda mas o gradiente em si precisa ser mais denso.

## Alteracoes

### Arquivo: `src/components/PortfolioCard.tsx`

**Linha 27 -- Overlay gradiente:**
- De: `from-background via-background/60 to-transparent opacity-85 group-hover:opacity-95`
- Para: `from-background via-background/80 to-background/20 opacity-90 group-hover:opacity-100`

Mudancas especificas:
- `via-background/60` para `via-background/80` -- escurece o meio do gradiente significativamente
- `to-transparent` para `to-background/20` -- adiciona uma leve cobertura ate no topo da imagem
- `opacity-85` para `opacity-90` -- base mais escura
- `group-hover:opacity-95` para `group-hover:opacity-100` -- hover totalmente escuro para maximo contraste com o texto

Resultado: o fundo fica consistentemente escuro, o texto branco ganha contraste forte em qualquer imagem (clara ou escura), e no hover a legibilidade e maxima.
