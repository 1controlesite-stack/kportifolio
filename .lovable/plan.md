

# Portfólio Kenkya — Web Design & Desenvolvimento

## Branding
- **Nome**: Kenkya (kenkya.com.br)
- **Logo**: O "K" geométrico com gradiente roxo → azul → ciano (será usada no header, hero, favicon e como elemento decorativo)
- **Paleta de cores derivada da logo**: roxo (#8B5CF6), azul (#3B82F6), ciano (#06B6D4) — gradientes vibrantes como identidade visual do site inteiro

---

## Seções

### 1. Hero Section
- **Logo Kenkya** animada na entrada (scale + fade) como elemento central
- Nome "Kenkya" com tipografia bold + tagline (ex: "Design & Desenvolvimento Web")
- Background escuro com gradiente sutil roxo-azul-ciano inspirado na logo
- Formas geométricas animadas no fundo (triângulos/setas remetendo à forma da logo)
- Efeito de cursor interativo com partículas nas cores da marca
- CTA para rolar até os projetos

### 2. Sobre / A Kenkya
- Layout assimétrico com a logo como elemento visual
- Quem é a Kenkya, o que faz, qual a missão
- Stack tecnológica com ícones animados
- Animação de entrada no scroll

### 3. Projetos (3-5 cases)
Cada projeto com storytelling na jornada do herói:
- **Cards com preview visual** — screenshot/mockup com hover zoom
- Página de detalhe por projeto:
  - O Desafio → O Processo → A Solução → O Resultado
  - Preview ao vivo do site (iframe embed quando possível)
  - Botão para acessar o site/sistema real
- Transições suaves com scroll animations
- Navegação entre projetos (anterior/próximo)

### 4. Contato
- Design bold com gradiente da marca
- Links diretos: WhatsApp, Email, LinkedIn, GitHub
- Ícones com hover animations nas cores da Kenkya

---

## Interatividade & Dinamismo
- Scroll animations em todas as seções (fade, slide, parallax)
- Cursor personalizado com efeitos de hover
- Hover states elaborados nos cards e botões
- Preview ao vivo dos sites em mockups de dispositivo
- Transições de página suaves

## Assets
- Copiar logo (`user-uploads://logo1.png`) para `src/assets/logo.png` e `public/favicon.png`
- Usar a logo como favicon do site
- Título do site: "Kenkya — Design & Desenvolvimento Web"

## Estrutura
- Página principal: Hero + Sobre + Projetos + Contato
- Páginas de detalhe: Uma rota por projeto com storytelling completo
- Sem backend — dados hardcoded, links diretos para contato

