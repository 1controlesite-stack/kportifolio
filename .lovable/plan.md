

# Hero Kenkya — Redesign Bold

## O Problema
O hero atual e generico e fraco — formas geometricas com 5% de opacidade, texto centralizado padrao. Nao causa impacto nenhum.

## A Solucao

### GIF como background imersivo
- Usar o GIF cyberpunk/tech como **background fullscreen** do hero
- Aplicar `useScroll` + `useTransform` do framer-motion para **sincronizar com scroll**:
  - Conforme o usuario rola, o GIF faz zoom-in sutil e a opacidade diminui, criando transicao para a secao de projetos
  - O conteudo de texto sobe com parallax (velocidade diferente do fundo)
- Overlay escuro semi-transparente por cima do GIF para garantir contraste WCAG AA

### Hierarquia visual com contraste WCAG
- **Subtitulo** primeiro (menor, em cima): "Design & Desenvolvimento Web" — branco puro (`#FFFFFF`) sobre overlay escuro
- **"Kenkya"** grande e bold embaixo — usar `gradient-text` mas com fallback branco para garantir contraste. Tamanho: `text-7xl md:text-9xl lg:text-[12rem]`
- **Logo** posicionada acima do subtitulo, com glow sutil nas cores da marca (drop-shadow)
- Overlay com `bg-black/60` minimo para garantir ratio de contraste >= 4.5:1

### Animacoes de entrada
- Logo: scale de 0 para 1 com bounce
- Subtitulo: fade-in de cima
- "Kenkya": reveal letra por letra ou slide-up dramatico
- CTA: fade-in por ultimo
- Scroll indicator com animacao pulsante

## Mudancas Tecnicas

### Arquivos modificados
1. **Copiar GIF** para `src/assets/hero-bg.gif`
2. **`src/components/Hero.tsx`** — reescrever completamente:
   - GIF como `<img>` background com `object-cover` fullscreen
   - `useScroll` + `useTransform` para parallax e fade do background no scroll
   - Overlay escuro para WCAG
   - Nova hierarquia: Logo > Subtitulo > Titulo > CTA
   - Tipografia muito maior e mais bold
3. **`src/components/AnimatedShapes.tsx`** — remover ou simplificar (o GIF substitui as formas fracas)

### Acessibilidade (WCAG AA)
- Overlay `bg-black/60` sobre o GIF garante contraste minimo de 4.5:1 para texto branco
- Texto do titulo em branco puro ou gradiente com fallback
- `alt` e `aria-label` corretos
- Subtitulo com `text-white/90` para contraste alto

