

# Portfólio Kenkya — Plano Simplificado

## Filosofia
Mínimo de seções. Máximo de experiência. O portfólio é sobre os **projetos** — todo o resto é suporte.

## Estrutura Final (apenas 3 seções na home)

### 1. Hero
- Logo Kenkya animada (scale + fade) + "Kenkya" em gradiente + tagline curta
- Background escuro com formas geométricas animadas (framer-motion)
- Cursor interativo com partículas nas cores da marca
- Scroll indicator sutil

### 2. Projetos (seção principal)
- Grid de 3-5 cards com preview visual e hover zoom
- Cada card leva a uma rota `/projeto/:slug` com storytelling completo:
  - Desafio, Processo, Solucao, Resultado
  - Preview ao vivo (iframe) + link externo
  - Navegacao anterior/proximo

### 3. Contato (footer bold)
- Gradiente da marca + links diretos (WhatsApp, Email, LinkedIn, GitHub)
- Sem formulario — apenas icones com hover animations

**Sem** secao "Sobre" separada. Se necessario, uma frase curta no Hero basta.

---

## Correcoes Tecnicas

### 1. Fix do build error
O CSS usa `font-body` e `font-display` mas o `tailwind.config.ts` nao define essas fontes. Vamos adicionar:

```
fontFamily: {
  display: ['Syne', 'sans-serif'],
  body: ['Space Grotesk', 'sans-serif'],
}
```

### 2. Atualizar `index.html`
- Titulo: "Kenkya -- Design & Desenvolvimento Web"
- Favicon apontando para `/favicon.png`
- Meta tags atualizadas

### 3. Atualizar `tailwind.config.ts`
- Adicionar fontFamily (display/body)
- Adicionar cores Kenkya (purple, blue, cyan)
- Adicionar keyframes customizados para animacoes

### 4. Criar componentes
- `src/components/Hero.tsx` — hero section com animacoes framer-motion
- `src/components/ProjectCard.tsx` — card de projeto com hover effects
- `src/components/ProjectsSection.tsx` — grid de projetos
- `src/components/ContactFooter.tsx` — footer com links
- `src/components/CursorEffect.tsx` — cursor interativo com particulas
- `src/components/AnimatedShapes.tsx` — formas geometricas do background

### 5. Criar pagina de detalhe
- `src/pages/ProjectDetail.tsx` — storytelling completo do projeto

### 6. Dados dos projetos
- `src/data/projects.ts` — array hardcoded com titulo, descricao, slug, imagens placeholder, desafio/processo/solucao/resultado, link externo

### 7. Atualizar `App.tsx`
- Adicionar rota `/projeto/:slug`

### 8. Reescrever `src/pages/Index.tsx`
- Montar: Hero + ProjectsSection + ContactFooter
- Scroll animations com framer-motion (useInView)

## Ordem de Execucao
1. Fix build: `tailwind.config.ts` + `index.html`
2. Dados: `projects.ts`
3. Componentes: CursorEffect, AnimatedShapes, Hero, ProjectCard, ProjectsSection, ContactFooter
4. Paginas: Index, ProjectDetail
5. Rotas: App.tsx
