

# Portfolio -- Mockup de Notebook (Desktop) e Smartphone (Mobile)

## Conceito
Substituir a seção de projetos atual por uma experiência imersiva: no desktop, os projetos aparecem dentro de um notebook CSS puro; no mobile, dentro de um smartphone CSS puro. Ambos com barra de busca, filtros por categoria e grid de projetos com hover interativo.

## Arquivos a criar/modificar

### 1. Novo: `src/components/PortfolioSection.tsx`
Componente principal que substitui `ProjectsSection` na `Index.tsx`.

**Estrutura:**
- Titulo + subtitulo da secao (acima do mockup)
- Componente `<DeviceMockup>` que renderiza notebook ou smartphone baseado no breakpoint
- Dentro do mockup: barra de busca + chips de categoria + grid de projetos

### 2. Novo: `src/components/DeviceMockup.tsx`
Renderiza o frame do dispositivo em CSS puro.

**Desktop -- Notebook:**
- Tela com borda arredondada top, fundo escuro (`bg-card`)
- Barra superior estilo macOS: 3 bolinhas (vermelho, amarelo, verde) + titulo "Portfolio"
- Area de conteudo interna com scroll se necessario
- Base/hinge do notebook: retangulo fino abaixo da tela com gradiente sutil

**Mobile -- Smartphone:**
- Frame retangular com bordas bem arredondadas (border-radius ~40px)
- Notch ou dynamic island no topo (pill shape central)
- Home indicator na base (barrinha fina)
- Mesma area de conteudo interna

**Responsividade:**
- `useIsMobile()` hook existente para alternar entre os dois frames
- Notebook ocupa ~90% da largura da secao (max-width ~1100px)
- Smartphone ocupa ~320px de largura, centralizado

### 3. Novo: `src/components/PortfolioGrid.tsx`
Conteudo interno do mockup (igual para ambos os devices).

**Header interno:**
- Input de busca com icone de lupa (filtra por titulo/descricao)
- Chips de categoria extraidos dinamicamente das tags dos projetos: [Todos] [E-commerce] [SaaS] [Fintech] [EdTech] etc.
- Chip ativo tem `gradient-bg`, inativos tem `bg-muted`

**Grid de projetos:**
- Desktop: 3 colunas (33/33/33) com gap
- Mobile (dentro do smartphone): 1 coluna
- Cada item e uma thumbnail (imagem do projeto em `aspect-video`)
- **Hover effect**: overlay escuro com fade-in mostrando:
  - Titulo do projeto (bold, branco)
  - Descricao curta (1 linha, muted)
  - Tags como badges pequenos
  - Icone de seta (ArrowUpRight) no canto
- Click leva para `/projeto/:slug` (mesmo comportamento atual)

### 4. Modificar: `src/pages/Index.tsx`
- Trocar `<ProjectsSection />` por `<PortfolioSection />`

### 5. Modificar: `src/index.css`
- Adicionar animacao sutil de entrada para o mockup (fade-in + leve translate-y)

## Detalhes Tecnicos

**CSS do Notebook (desktop):**
```text
Tela:
  - rounded-t-xl, border border-border/50
  - bg-[hsl(240,15%,6%)] (mais escuro que o card, simular tela)
  - shadow-2xl com sombra purple sutil
  - aspect-ratio ~16/10

Barra superior (dentro da tela):
  - h-8, bg-muted/50, flex items-center, px-3
  - 3 divs circulares (w-3 h-3 rounded-full) com cores red, yellow, green

Base/hinge:
  - w-[110%] centralizado, h-3, rounded-b-xl
  - gradient-bg com opacity baixa
```

**CSS do Smartphone (mobile):**
```text
Frame:
  - rounded-[40px], border-[3px] border-muted
  - bg-[hsl(240,15%,6%)]
  - shadow-2xl
  - p-2 (espaco interno entre frame e tela)

Notch:
  - div centralizado no topo, w-24 h-5, rounded-full, bg-muted

Home indicator:
  - div centralizado na base, w-32 h-1, rounded-full, bg-muted/50
```

**Filtragem:**
- Estado local com `useState` para categoria selecionada e termo de busca
- `useMemo` para filtrar projetos
- Categorias unicas extraidas com `Set` das tags de todos os projetos

**Animacoes:**
- Framer Motion para entrada do mockup (viewport-triggered)
- Hover nos cards com `transition-all duration-300`
- Chips de categoria com transicao suave de cor

## Componentes existentes reutilizados
- `useIsMobile()` de `src/hooks/use-mobile.tsx`
- Dados de `src/data/projects.ts`
- Classes utilitarias `gradient-text`, `gradient-bg` do CSS existente
- `Link` do react-router-dom para navegacao

## Resultado esperado
Uma secao de portfolio que parece uma janela real de browser/app, dando contexto visual ao trabalho apresentado. No desktop, um notebook elegante com 3 colunas. No mobile, um smartphone com scroll vertical de 1 coluna. Busca e filtros funcionais.

