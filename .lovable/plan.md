

# Corrigir flickering na filtragem de categorias

## Causa raiz

Cada card do grid usa `motion.div` com `initial={{ opacity: 0, y: 30 }}` e `whileInView`. Quando a categoria muda, os cards que saem e entram sao remontados do zero, cada um comecando invisivel (opacity 0) e animando para visivel. Isso causa o "flick" visual.

## Solucao

Usar `AnimatePresence` do Framer Motion para animar a saida e entrada dos cards de forma suave, com `layout` para transicoes de posicao.

### Mudancas em `src/components/PortfolioSection.tsx`

1. Importar `AnimatePresence` do framer-motion
2. Envolver o grid com `<AnimatePresence mode="popLayout">`
3. Trocar as props de animacao dos cards:
   - Remover `whileInView` e `viewport`
   - Usar `initial={{ opacity: 0, scale: 0.95 }}` (mais sutil)
   - Usar `animate={{ opacity: 1, scale: 1 }}`
   - Usar `exit={{ opacity: 0, scale: 0.95 }}`
   - Transicao curta: `duration: 0.3`
   - Remover o `delay: i * 0.08` stagger (causa lentidao na filtragem) ou reduzir para `i * 0.03` maximo
   - Adicionar `layout` prop para animar reposicionamento suave
4. Manter `whileHover={{ scale: 1.03 }}` como esta

### Resultado

- Ao trocar categoria, cards saem com fade rapido e os novos entram com fade suave
- Sem flicker porque `AnimatePresence` coordena saida/entrada
- Transicao mais rapida e fluida

