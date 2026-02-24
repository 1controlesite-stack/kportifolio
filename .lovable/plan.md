

# Corrigir z-index no Hover dos Cards Sobrepostos

## Problema

Os cards usam `whileHover={{ zIndex: 100, scale: 1.03 }}` do Framer Motion (linha 118 do `PortfolioSection.tsx`). O Framer Motion **interpola numericamente** o `zIndex` (ex: de 1 para 2, 3, 4... ate 100), o que faz o card demorar para aparecer acima dos vizinhos sobrepostos. O scale tambem anima gradualmente, criando a sensacao de "passos".

## Solucao

### Arquivo: `src/components/PortfolioSection.tsx` (linha 105-121)

1. **Remover `zIndex` do `whileHover`** do Framer Motion -- ele nao deve ser animado gradualmente
2. **Adicionar classes CSS** no `motion.div` para controlar o z-index instantaneamente via `hover:z-[100]`
3. **Manter `scale: 1.03`** no `whileHover` mas com `transition` rapida e sem spring
4. Adicionar `transition-[z-index] duration-0` via CSS para garantir mudanca instantanea

Resultado: o z-index muda imediatamente no hover (CSS), enquanto o scale anima suavemente (Framer Motion). O card sobreposto aparece por cima dos vizinhos sem atraso.

