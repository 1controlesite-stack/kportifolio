

# Corrigir Grid do Portfolio para 3 Colunas Fixas (estilo ToFlow)

## Problema
O grid atual usa `repeat(auto-fill, minmax(280px, 1fr))` que permite 4 ou mais colunas dependendo da largura da tela. O resultado desejado e exatamente 3 colunas, como na referencia ToFlow.

## Mudanca

### Arquivo: `src/components/PortfolioSection.tsx`

**Grid (linhas 64-68):**
- Remover o `style` inline que sobrescreve o grid com `auto-fill`
- Usar apenas as classes Tailwind: `grid-cols-1 md:grid-cols-3`
- Ajustar o gap para permitir leve sobreposicao entre os monitores (gap negativo via margin)
- Manter as margens negativas para o efeito de overlap entre linhas/colunas

**Mudanca especifica:**
```text
Antes:  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))"
Depois: remover o style inline, deixar o Tailwind controlar com md:grid-cols-3
```

Isso garante exatamente 3 colunas no desktop e 1 coluna no mobile, independente da largura.
