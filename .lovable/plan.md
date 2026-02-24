

# Portfolio -- Carrossel de Monitores (estilo ToFlow)

## O que muda

Remover o conceito de notebook/smartphone com grid interno. Em vez disso, criar um **carrossel horizontal** de **mockups de monitor** (cada projeto dentro de um monitor CSS puro), com uma **aba lateral colorida** mostrando o nome do projeto na vertical -- exatamente como na referencia ToFlow.

## Layout Visual

```text
   ____________________      ____________________      ____________________
  |  _________________  |   |  _________________  |   |  _________________  |
  | |                 | |   | |                 | |   | |                 | |
  | |   Screenshot    | |   | |   Screenshot    | |   | |   Screenshot    | |
  | |   do projeto    | |   | |   do projeto    | |   | |   do projeto    | |
  | |_________________| |   | |_________________| |   | |_________________| |
  |_____________________|   |_____________________|   |_____________________|
        |_________|               |_________|               |_________|
  [ABA VERTICAL]           [ABA VERTICAL]            [ABA VERTICAL]
```

Cada monitor tem:
- Frame com borda arredondada no topo, fundo escuro
- Imagem/screenshot do projeto ocupando a tela
- Base/pedestal do monitor (retangulo fino + pe)
- Aba lateral colorida (gradient) com nome do projeto escrito na vertical (rotacionado 90 graus)
- Hover: leve scale-up + sombra mais intensa + botao "Visualizar" aparece

## Arquivos

### 1. Reescrever: `src/components/PortfolioSection.tsx`
- Titulo + subtitulo (manter)
- Carrossel horizontal usando **Embla Carousel** (ja instalado: `embla-carousel-react`)
- Cada slide e um `<MonitorMockup>` com o projeto
- Setas de navegacao opcionais (dots ou arrows)
- No mobile: carrossel com 1 item visivel, scroll horizontal

### 2. Reescrever: `src/components/DeviceMockup.tsx` (renomear para `MonitorMockup.tsx`)
- Novo componente `MonitorMockup` que renderiza um monitor de desktop em CSS puro
- Props: `image`, `title`, `slug`, `color` (cor da aba lateral)

**Estrutura CSS do monitor:**
```text
Monitor frame:
  - rounded-t-lg, border border-border/30
  - bg-[hsl(240,15%,8%)]
  - Borda inferior reta (bottom da tela)

Tela (interna):
  - Imagem do projeto em aspect-video, object-cover
  - Overlay no hover com botao "Ver projeto"

Base:
  - Trapezio/retangulo fino centralizado abaixo da tela
  - Pedestal: retangulo menor embaixo

Aba lateral:
  - Posicionada no lado direito do monitor
  - gradient-bg com altura total da tela
  - Texto rotacionado 90deg (writing-mode: vertical-rl)
  - Largura ~40px
  - Nome do projeto em uppercase, font-display, bold
```

### 3. Remover: `src/components/PortfolioGrid.tsx`
- Nao sera mais necessario (busca e filtros removidos nesta versao)

### 4. Remover referencia ao `DeviceMockup.tsx` antigo
- Substituido pelo `MonitorMockup`

## Carrossel (Embla)

- Desktop: mostrar 3 monitores parcialmente visiveis (o central maior, laterais cortados como na referencia)
- Mobile: 1 monitor visivel, swipe horizontal
- Loop infinito
- Autoplay opcional (desligado por padrao)
- Dots indicadores embaixo

## Interacoes

- **Hover no monitor**: leve `scale(1.03)`, sombra gradient mais intensa, overlay com botao "Ver projeto"
- **Click**: navega para `/projeto/:slug`
- **Aba lateral**: sempre visivel, serve como label visual

## Cores das abas laterais

Cada projeto recebe uma cor da paleta (ciclica):
- Projeto 1: `kenkya-purple`
- Projeto 2: `kenkya-blue`
- Projeto 3: `kenkya-cyan`
- Projeto 4: `kenkya-purple` (repete)

## Detalhes Tecnicos

- Usar `useEmblaCarousel` do pacote ja instalado
- Framer Motion para entrada da secao (viewport-triggered)
- CSS transitions para hover effects
- `writing-mode: vertical-rl` + `transform: rotate(180deg)` para texto vertical da aba
- Responsivo: `slidesToScroll: 1`, `align: 'center'` no Embla

## Resultado esperado

Uma secao que parece uma vitrine de monitores exibindo os projetos, com abas coloridas laterais identificando cada um. Efeito visual premium e coerente com a identidade de web designer. Scroll horizontal no carrossel, hover interativo, navegacao para detalhes do projeto.

