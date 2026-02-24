

# Hero — Reestrutura com Novo Video

## Resumo
Substituir o video atual por `BgV.mp4` e aplicar o plano ja aprovado: reestruturar o Hero para ser minimalista com scroll longo e video perceptivel.

## Mudancas

### 1. Asset
- Copiar `user-uploads://BgV.mp4` para `src/assets/hero-bg.mp4` (substitui o atual)

### 2. `src/components/Hero.tsx` — reescrita completa
- **Secao**: `h-[300vh]` com wrapper interno `sticky top-0 h-screen` — 3x mais espaco de scroll para o video progredir visivelmente
- **Video**: sync com `useMotionValueEvent` + `scrollYProgress` (mesmo mecanismo, mas agora com range 3x maior)
- **Overlay**: `bg-black/40` (mais leve, video mais visivel)
- **Tipografia minimalista**:
  - Titulo "Kenkya": `font-light`, `text-6xl md:text-8xl lg:text-9xl`, branco puro (sem gradient-text, sem extrabold, sem stroke)
  - Subtitulo: `font-light`, `tracking-[0.4em]`, `text-xs md:text-sm`, uppercase
  - Sem animacao letra por letra — fade-in simples
- **Logo**: menor, sem glow exagerado
- **CTA**: estilo outline (`border border-white/30`, sem gradient-bg)
- **Conteudo**: fade-out nos ultimos 30% do scroll (`useTransform(scrollYProgress, [0.7, 1], [1, 0])`)

