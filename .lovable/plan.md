

# Vídeo do Hero: loop automático sem sync com scroll

## Problema atual
O vídeo de 8 segundos está sincronizado ao scroll (scrub), o que obriga o usuário a rolar por `300vh` inteiros para o vídeo terminar -- travando a experiência de navegação.

## Solução
Remover toda a lógica de scrub/seek e deixar o vídeo rodando em **loop automático** como fundo cinematográfico. O scroll continua livre e fluido.

## Mudanças em `src/components/Hero.tsx`

### Remover
- Constante `SEEK_EPSILON`
- Refs: `rafRef`, `pendingProgressRef`, `videoReadyRef`, `lastSeekedTimeRef`
- `useEffect` do gate de metadata
- Função `scheduleSeek` e `useCallback`
- `useEffect` de cleanup do rAF
- `useMotionValueEvent` do scrub
- Import de `useCallback`

### Alterar
- Reduzir a altura da seção de `h-[300vh]` para `h-screen` (uma tela, sem scroll estendido)
- Remover `sticky top-0` do container interno (desnecessário com `h-screen`)
- Adicionar `autoPlay`, `loop` e `muted` no `<video>` para rodar continuamente
- Remover a `ref` do vídeo (não é mais necessária)
- Remover `useMotionValueEvent` do import do framer-motion
- Remover transforms que dependiam do scroll longo (`bgScale`, `contentY`, `contentOpacity`) ou simplifica-los para animacoes de entrada
- Manter o gradiente de transicao inferior como elemento estatico (sem motion transform)

### Resultado
- Video roda em loop infinito como background
- Seção ocupa exatamente 1 viewport (`100vh`)
- Scroll flui naturalmente para a próxima seção
- Zero lógica de seek/rAF -- componente muito mais simples

