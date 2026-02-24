

# Paginacao no Portfolio + Admin preparado para volume

## 1. Paginacao no Portfolio (pagina publica)

**Arquivo:** `src/components/PortfolioSection.tsx`

- Adicionar estado `currentPage` (comeca em 1)
- Apos filtrar projetos, calcular `totalPages = Math.ceil(filtered.length / 12)`
- Exibir apenas os 12 projetos da pagina atual (`filtered.slice((page-1)*12, page*12)`)
- Grid mantem 4 colunas (4x3 = 12 por pagina)
- Ao mudar categoria/busca, resetar pagina para 1
- Abaixo do grid, renderizar componente de paginacao (`Pagination` do Shadcn ja instalado) com botoes Anterior/Proximo e indicadores de pagina
- Scroll suave ate o topo da secao ao trocar de pagina
- Esconder paginacao quando `totalPages <= 1`

## 2. Admin preparado para volume com filtros por categoria

**Arquivo:** `src/components/AdminProjectList.tsx`

- Adicionar filtro por status (Todos / Publicados / Rascunhos) usando tabs ou botoes tipo chip acima da tabela
- Adicionar filtro por tag/categoria via select dropdown (opcoes extraidas das tags existentes nos projetos)
- Combinar filtros de status + categoria + busca por texto
- Adicionar paginacao na tabela (10 itens por pagina) com controles no rodape
- Exibir contador de resultados (ex: "Mostrando 1-10 de 23 projetos")

## Arquivos modificados

- `src/components/PortfolioSection.tsx` -- paginacao 4x3
- `src/components/AdminProjectList.tsx` -- filtros por status/categoria + paginacao

## Dependencias

Nenhuma nova. Usa `Pagination` e `Select` do Shadcn ja instalados.
