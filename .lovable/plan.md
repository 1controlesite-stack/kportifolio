

# Categorias gerenciaveis + Reestruturacao do Projeto

## Resumo

Criar sistema de categorias independente e gerenciavel pelo admin, substituir tags por categorias (max 3 por projeto), remover a jornada do heroi do slug, e adicionar espaco para depoimento do cliente (texto, imagem ou audio).

## Mudancas no Banco de Dados

### Nova tabela: `categories`

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| id | uuid (PK) | Identificador |
| name | text | Nome da categoria |
| slug | text (unique) | Slug para filtros/URL |
| display_order | integer | Ordem de exibicao |
| created_at | timestamptz | Data de criacao |

RLS: leitura publica, escrita apenas para admins.

### Nova tabela: `project_categories` (many-to-many)

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| project_id | uuid (FK -> projects) | Projeto |
| category_id | uuid (FK -> categories) | Categoria |
| PK composta | (project_id, category_id) | Evita duplicatas |

RLS: leitura publica, escrita apenas para admins.
Trigger de validacao: impedir mais de 3 categorias por projeto.

### Alterar tabela `projects`

- Remover colunas: `challenge`, `process`, `solution`, `result`, `tags`
- Adicionar colunas:
  - `testimonial_text` (text, nullable) -- depoimento em texto
  - `testimonial_image` (text, nullable) -- URL da imagem do depoimento
  - `testimonial_audio` (text, nullable) -- URL do audio MP3

### Storage

Usar o bucket `project-images` existente para imagens de depoimento e audios (ou criar bucket `project-testimonials` separado para audios).

## Mudancas no Frontend

### 1. Admin: Gerenciamento de Categorias

**Novo arquivo:** `src/components/AdminCategoryList.tsx`
- CRUD de categorias com tabela simples (nome, slug, ordem)
- Criar/editar inline ou em modal
- Drag para reordenar ou campo numerico

**Novo arquivo:** `src/hooks/useAdminCategories.ts`
- Hooks: `useCategories`, `useCreateCategory`, `useUpdateCategory`, `useDeleteCategory`

**Atualizar:** `src/components/AdminSidebar.tsx`
- Adicionar item "Categorias" no menu com icone

**Atualizar:** `src/pages/Admin.tsx`
- Adicionar view "categories" ao estado, renderizar `AdminCategoryList` quando selecionado

### 2. Formulario de Projeto Reestruturado

**Atualizar:** `src/components/AdminProjectForm.tsx`

Secoes:
1. **Informacoes basicas**: Titulo, Slug, Descricao
2. **Midia**: Imagem principal (portfolio), Showcase (slug)
3. **Categorias**: Seletor de categorias existentes (max 3) com chips, sem campo de texto livre
4. **URL**: Campo de URL ao vivo
5. **Depoimento do cliente**: 
   - Textarea para texto
   - Upload de imagem
   - Upload de audio (aceita .ogg, converte para .mp3 via edge function antes de salvar)
6. **Configuracoes**: Publicado, Ordem de exibicao com interface mais intuitiva (ex: "Mover para cima/baixo" ou "Posicionar entre X e Y" com drag, em vez de numero solto)

**Ordem de exibicao mais didatica**: Em vez de digitar um numero, a lista de projetos tera drag-and-drop para reordenar. A posicao sera salva automaticamente. No formulario individual, mostrar posicao atual como referencia (ex: "Posicao 3 de 15").

### 3. Pagina do Projeto (slug) Simplificada

**Atualizar:** `src/pages/ProjectDetail.tsx`

Remover as 4 secoes da jornada do heroi (challenge, process, solution, result). A pagina fica:
- Header com botao voltar + link "Ver ao vivo"
- Imagem showcase (ou principal como fallback)
- Titulo, descricao, categorias
- Secao de depoimento do cliente (se existir):
  - Texto com aspas estilizadas
  - Imagem do cliente
  - Player de audio embutido (HTML5 `<audio>`)
- Navegacao anterior/proximo

### 4. Portfolio Publico

**Atualizar:** `src/components/PortfolioSection.tsx` e `PortfolioFilters.tsx`
- Substituir filtro por tags por filtro por categorias (vindas da tabela `categories`)
- Manter mesma UX de chips + overflow

**Atualizar:** `src/components/PortfolioCard.tsx`
- Mostrar categorias em vez de tags

### 5. Edge Function: Converter OGG para MP3

**Novo arquivo:** `supabase/functions/convert-audio/index.ts`
- Recebe arquivo OGG via upload
- Converte para MP3 usando ffmpeg (ou biblioteca JS compativel com Deno)
- Salva no storage e retorna URL publica

**Alternativa mais simples**: OGG ja roda no HTML5 `<audio>` na maioria dos navegadores modernos. Podemos aceitar OGG diretamente e so converter se o usuario preferir compatibilidade maxima. Isso evita dependencia de ffmpeg no edge function.

### 6. Hooks e Queries

**Atualizar:** `src/hooks/useProjects.ts`
- Queries agora fazem join com `project_categories` e `categories`
- Retornam categorias em vez de tags

**Atualizar:** `src/hooks/useAdminProjects.ts`
- Mesma atualizacao de join
- Mutations de create/update agora gerenciam a tabela pivot `project_categories`

## Sequencia de Execucao

1. Migracoes de banco (criar tabelas, alterar projects, RLS)
2. Hooks de categorias (`useAdminCategories`)
3. Tela de gerenciamento de categorias + sidebar
4. Atualizar formulario de projeto (categorias, depoimento, remover jornada)
5. Atualizar hooks de projetos (joins com categorias)
6. Simplificar pagina do slug
7. Atualizar portfolio publico (filtros por categoria)
8. Upload de audio (aceitar OGG direto com `<audio>`, sem conversao por ora)

## Arquivos impactados

| Arquivo | Acao |
|---------|------|
| Migracao SQL | Novo |
| `src/hooks/useAdminCategories.ts` | Novo |
| `src/components/AdminCategoryList.tsx` | Novo |
| `src/components/AdminSidebar.tsx` | Alterar |
| `src/pages/Admin.tsx` | Alterar |
| `src/components/AdminProjectForm.tsx` | Alterar |
| `src/hooks/useProjects.ts` | Alterar |
| `src/hooks/useAdminProjects.ts` | Alterar |
| `src/pages/ProjectDetail.tsx` | Alterar |
| `src/components/PortfolioSection.tsx` | Alterar |
| `src/components/PortfolioFilters.tsx` | Alterar |
| `src/components/PortfolioCard.tsx` | Alterar |
| `src/components/AdminProjectList.tsx` | Alterar |
| `src/components/AdminDashboardStats.tsx` | Alterar |
| `src/components/ImageUpload.tsx` | Alterar (generalizar para aceitar audio) |

