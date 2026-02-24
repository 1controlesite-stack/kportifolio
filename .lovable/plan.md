

# Hero com Video Sincronizado ao Scroll

## O que muda
Trocar o GIF de fundo por um video MP4 que avanca e retrocede conforme o scroll — quando o usuario desce a pagina, o video avanca; quando sobe, o video volta. Efeito cinematografico e imersivo.

## Como funciona tecnicamente

### Sincronizacao video + scroll
- Usar `useScroll` do framer-motion para obter `scrollYProgress` (valor de 0 a 1)
- Usar `useMotionValueEvent` para escutar mudancas no `scrollYProgress`
- A cada mudanca, setar `videoRef.current.currentTime = scrollYProgress * video.duration`
- Isso faz o video avancar/retroceder proporcionalmente ao scroll
- O video fica com `muted`, `playsInline`, **sem autoplay** — o scroll controla tudo

### Arquivos

1. **Copiar** `user-uploads://giphy.mp4` para `src/assets/hero-bg.mp4`
2. **`src/components/Hero.tsx`** — substituir o `<img>` do GIF por `<video>`:
   - Remover import do GIF
   - Adicionar import do MP4
   - Trocar `<img>` por `<video ref={videoRef} src={heroVideo} muted playsInline preload="auto" />`
   - Adicionar `useRef` para o video element
   - Usar `useMotionValueEvent(scrollYProgress, "change", (v) => { video.currentTime = v * video.duration })`
   - Manter overlay escuro, parallax do conteudo, e todas as animacoes de entrada
3. **Remover** `src/assets/hero-bg.gif` (nao mais necessario)

### O que se mantem
- Overlay `bg-black/60` para WCAG AA
- Logo com bounce, subtitulo, titulo letra por letra, CTA
- Parallax do conteudo (contentY, contentOpacity)
- Zoom sutil do background no scroll (bgScale)
- Scroll indicator

