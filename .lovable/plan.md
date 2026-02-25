

# Melhorias visuais e correcao de texto

## 1. Transicoes suaves ao filtrar categorias e paginar

**Arquivo:** `src/components/PortfolioSection.tsx`

O grid de projetos atualmente usa `AnimatePresence mode="popLayout"` mas os cards nao tem transicao de saida/entrada suave ao trocar categoria ou pagina. Melhorias:

- Adicionar uma `key` no container do grid baseada em `activeCategory + currentPage` para forcar re-render com animacao
- Usar `AnimatePresence mode="wait"` em vez de `popLayout` para que os cards antigos saiam antes dos novos entrarem
- Envolver o grid em um `motion.div` com fade-in/out como wrapper animado
- No `goToPage`, usar scroll smooth (ja existe) mas adicionar um pequeno delay visual

## 2. Scroll suave no botao "Ver Projetos"

**Arquivo:** `src/components/Hero.tsx`

O link `<a href="#projetos">` faz um jump instantaneo. Substituir por um `onClick` com `scrollIntoView({ behavior: "smooth" })` e `e.preventDefault()`.

## 3. Textura xadrez sutil na secao de projetos

**Arquivo:** `src/index.css`

Adicionar um pseudo-elemento ou background-image CSS na classe `.section-light` com um padrao xadrez sutil usando `repeating-conic-gradient` ou um SVG inline em `background-image`. Cores com opacidade muito baixa (3-5%) para dar profundidade sem poluir.

Exemplo do padrao:
```
background-image: 
  linear-gradient(45deg, hsl(220 14% 46% / 0.03) 25%, transparent 25%),
  linear-gradient(-45deg, hsl(220 14% 46% / 0.03) 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, hsl(220 14% 46% / 0.03) 75%),
  linear-gradient(-45deg, transparent 75%, hsl(220 14% 46% / 0.03) 75%);
background-size: 20px 20px;
background-position: 0 0, 0 10px, 10px -10px, -10px 0;
```

## 4. Preservar quebras de linha na descricao do projeto

**Arquivo:** `src/pages/ProjectDetail.tsx`

O campo `project.description` vem do banco com `\n` (quebras de linha), mas o `<p>` HTML ignora quebras. Solucao: adicionar `whitespace-pre-line` na classe do paragrafo de descricao para que `\n` vire quebra de linha visual.

Linha 71-73, adicionar `whitespace-pre-line` a classe:
```
className="text-lg text-muted-foreground mb-6 whitespace-pre-line"
```

## Resumo de arquivos

| Arquivo | Mudanca |
|---|---|
| `src/components/PortfolioSection.tsx` | AnimatePresence mode="wait", key no grid, transicao suave |
| `src/components/Hero.tsx` | Scroll suave no "Ver Projetos" |
| `src/index.css` | Textura xadrez na `.section-light` |
| `src/pages/ProjectDetail.tsx` | `whitespace-pre-line` na descricao |

