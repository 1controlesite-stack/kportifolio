

# Portfolio Grid 4x3 com Sobreposicao Horizontal

## Layout

Grid de 4 colunas e 3 linhas. Cada card e uma imagem do projeto (como as referencias enviadas -- laptop + celular + aba lateral com nome). Dentro de cada linha, o card da esquerda fica "por cima" do card da direita, criando um efeito de sobreposicao horizontal.

```text
Linha 1:  [Card1]  [Card2]  [Card3]  [Card4]
              ^        ^        ^
              |        |        |
           z:4      z:3      z:2      z:1
           (cada card da esquerda sobrepoe o da direita)
```

## Mudancas

### 1. `src/components/PortfolioSection.tsx`
- Grid muda de `md:grid-cols-3` para `md:grid-cols-4`
- Remover o `MonitorMockup` -- cada card sera uma imagem direta com link
- Sobreposicao horizontal: dentro de cada linha, o z-index diminui da esquerda para direita (`z = cols - col`)
- Margem negativa na esquerda (`marginLeft: -1rem` a partir da coluna 2) para criar o overlap
- Sem sobreposicao vertical entre linhas (gap normal entre rows)
- Hover: eleva o z-index para 100 + leve scale

### 2. `src/data/projects.ts`
- Adicionar campo `showcaseImage` (opcional) para a imagem de vitrine do projeto (laptop+phone). Por enquanto usar a `image` existente
- Precisaremos de 12 projetos para preencher 4x3 (atualmente so temos 4). Vou adicionar 8 projetos placeholder adicionais

### 3. `src/components/MonitorMockup.tsx`
- Sera removido (nao usado mais)

### 4. Novo componente: `src/components/PortfolioCard.tsx`
- Recebe: `image`, `title`, `slug`
- Renderiza a imagem do projeto com aspect-ratio ~16/10
- Overlay no hover com botao "Ver projeto"
- Link para `/projeto/:slug`

## Detalhes Tecnicos

- Grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
- Z-index por coluna: `zIndex = 4 - (i % 4)` (coluna 0 = z4, coluna 3 = z1)
- Margin-left negativa: `i % 4 !== 0 ? "-1.5rem" : "0"`
- Gap vertical entre linhas: `gap-y-6`
- Hover: `whileHover={{ zIndex: 100, scale: 1.03 }}`
- Filtros de categoria mantidos
- As imagens de referencia que voce enviou sao o formato ideal para os cards (laptop + phone + aba colorida). Por enquanto usaremos as imagens existentes do unsplash, e no futuro voce substituira pelas imagens reais de cada projeto via painel admin

