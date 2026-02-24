

# Hero — Video Fluido + Transicao Suave

## Problemas Identificados

### 1. Video flickando/travando
O problema e que `useMotionValueEvent` dispara a cada micro-mudanca do scroll, setando `video.currentTime` dezenas de vezes por segundo sem throttle. Browsers nao conseguem fazer seek instantaneo — cada seek forca o video a decodificar um novo frame, causando flicker.

### 2. Sem transicao entre Hero e Projetos
A secao Hero termina abruptamente e a secao de Projetos comeca sem nenhum fade ou gradiente de transicao.

## Solucao

### Video fluido com `requestAnimationFrame`
- Usar `requestAnimationFrame` para throttle do seek — garantir no maximo 1 seek por frame (60fps)
- Guardar o ultimo valor de `scrollYProgress` e aplicar no proximo rAF
- Isso elimina o flicker porque o browser so processa 1 seek por frame de renderizacao

### Transicao suave Hero -> Projetos
- Adicionar um `div` gradiente no final da secao sticky do Hero: gradiente de `transparent` para `bg-background`
- Controlado por `scrollYProgress` — aparece nos ultimos 20% do scroll do Hero
- Cria um fade visual suave entre o video escuro e o fundo da secao de Projetos

## Mudancas Tecnicas

### `src/components/Hero.tsx`
1. **Substituir `useMotionValueEvent`** por um combo de `useMotionValueEvent` + `requestAnimationFrame`:
   - Guardar o valor do scroll em uma ref (`scrollValueRef`)
   - Usar um rAF loop que le a ref e aplica ao `video.currentTime`
   - O rAF so roda quando ha mudanca (flag `needsUpdate`)
2. **Adicionar div de transicao** no final do sticky container:
   - `div` com `background: linear-gradient(to bottom, transparent, var(--background))`
   - Opacity controlada por `useTransform(scrollYProgress, [0.8, 1], [0, 1])` — aparece nos ultimos 20%
   - Posicionado `absolute bottom-0` com altura de ~30vh

### Nenhum outro arquivo muda.

