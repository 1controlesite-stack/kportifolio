

# Refinamento do Portfolio: Filtros, Contraste e Borda Gradiente

## 1. Nova barra de filtros e busca (substituir os botoes atuais)

O layout atual e uma linha de botoes simples. A nova abordagem coloca tudo numa unica linha responsiva:

```text
[ Icone Busca | Input de busca por palavra-chave ]  [ Todos | SaaS | Apps | E-commerce | Mais v ]
```

- **Barra de busca global** (lado esquerdo): Input com icone de lupa que filtra projetos por titulo, descricao, tags ou qualquer texto dentro do projeto
- **Categorias expostas** (lado direito): As 3-4 categorias mais frequentes como chips clicaveis
- **Combobox "Mais categorias"**: Um Popover com input de busca interno que lista todas as categorias restantes. Usa o componente `cmdk` (ja instalado) para busca dentro do dropdown
- O dropdown tera `bg-popover` solido e `z-50` para nao ficar transparente

### Arquivo: `src/components/PortfolioFilters.tsx` (novo)

Componente dedicado que recebe as categorias extraidas dinamicamente dos projetos e expoe:
- `searchQuery` (string) -- filtra por texto em titulo/descricao/tags
- `activeCategory` (string) -- filtra por categoria
- Logica: categorias ordenadas por frequencia, as 4 primeiras expostas, restantes no combobox

### Arquivo: `src/components/PortfolioSection.tsx` (editar)

- Substituir o bloco de botoes de filtro pelo novo `PortfolioFilters`
- Adicionar logica de busca textual ao `useMemo` de filtragem (busca em `title`, `description`, `tags`)

## 2. Borda gradiente animada nos cards ao hover

### Arquivo: `src/components/PortfolioCard.tsx` (editar)

- Adicionar um wrapper `div` com `padding: 1px` e `background: transparent` no estado normal
- No hover (`group-hover`), o background do wrapper vira o gradiente da marca (purple -> blue -> cyan) via classe CSS
- Adicionar animacao de rotacao do gradiente usando `@keyframes` para efeito sutil de movimento

### Arquivo: `src/index.css` (editar)

- Adicionar keyframe `gradient-rotate` que anima o `background-position` ou `angle` do gradiente
- Classe utilitaria `.gradient-border-animated` para reutilizacao

## 3. Melhorias de contraste e WCAG AA

### Arquivo: `src/components/PortfolioCard.tsx` (editar)

Problemas atuais de contraste:
- **Titulo**: `text-foreground` com `font-light` sobre overlay semi-transparente -- pouco contraste. Mudar para `font-normal` (peso 400 minimo)
- **Descricao**: `text-muted-foreground` com `text-[11px]` -- muito pequeno e baixo contraste. Aumentar para `text-xs` e usar `text-foreground/70` (ratio melhor)
- **Tags no hover**: `text-muted-foreground` com `text-[10px]` sobre overlay -- subir para `text-foreground/60` e `text-[11px]`
- **CTA "Ver projeto"**: `text-accent` esta ok (cyan e vibrante), manter
- **Overlay base**: Aumentar opacidade minima de `opacity-60` para `opacity-70` para garantir que o texto sempre tenha fundo suficiente

### Arquivo: `src/index.css` (verificar)

- `--muted-foreground: 215 20% 55%` -- contrast ratio contra `--background: 240 20% 4%` e ~4.2:1 (passa AA para texto grande, falha para pequeno). Para texto `text-[10px]` e `text-[11px]` isso falha WCAG AA
- Nao vou alterar a variavel global (afetaria todo o site), mas nos cards especificamente usar cores com ratio maior

## Resumo tecnico dos arquivos

| Arquivo | Acao |
|---|---|
| `src/components/PortfolioFilters.tsx` | Criar -- barra de busca + chips de categoria + combobox |
| `src/components/PortfolioSection.tsx` | Editar -- integrar PortfolioFilters, logica de busca textual |
| `src/components/PortfolioCard.tsx` | Editar -- borda gradiente animada, melhorias de contraste |
| `src/index.css` | Editar -- keyframe de animacao do gradiente |

