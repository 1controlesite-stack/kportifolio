
# Integracao com Supabase + Painel Admin para Projetos

## Visao Geral

Migrar os projetos do arquivo estatico `src/data/projects.ts` para o banco de dados Supabase. Criar um painel administrativo protegido por autenticacao onde o admin pode criar, editar, excluir e controlar a visibilidade dos projetos. Somente projetos marcados como "publicados" aparecerao no portfolio publico.

## Passo 1: Conectar Supabase

Antes de tudo, voce precisara conectar o Supabase ao projeto. O Lovable vai exibir um prompt para voce criar ou selecionar uma conexao com o Supabase.

## Passo 2: Estrutura do Banco de Dados

### Tabela `projects`

| Coluna | Tipo | Descricao |
|---|---|---|
| id | uuid (PK) | Identificador unico |
| slug | text (unique) | URL amigavel |
| title | text | Nome do projeto |
| description | text | Descricao curta |
| tags | text[] | Array de categorias |
| image | text | URL da imagem principal |
| showcase_image | text (nullable) | Imagem de vitrine |
| live_url | text (nullable) | Link do projeto ao vivo |
| challenge | text | Texto "O Desafio" |
| process | text | Texto "O Processo" |
| solution | text | Texto "A Solucao" |
| result | text | Texto "O Resultado" |
| published | boolean (default false) | Controla visibilidade publica |
| display_order | integer (default 0) | Ordem de exibicao |
| created_at | timestamptz | Data de criacao |
| updated_at | timestamptz | Data de atualizacao |

### Tabela `user_roles` (para controle de acesso admin)

Seguindo o padrao de seguranca recomendado com enum `app_role`, tabela separada e funcao `has_role` com SECURITY DEFINER.

### Politicas RLS

- **SELECT publico**: qualquer pessoa pode ver projetos com `published = true`
- **INSERT/UPDATE/DELETE**: somente usuarios com role `admin`

## Passo 3: Autenticacao Admin

- Pagina `/login` com email + senha usando Supabase Auth
- Rota protegida `/admin` que verifica se o usuario logado tem role `admin`
- Redirect automatico para login se nao autenticado

## Passo 4: Painel Admin (`/admin`)

### Listagem de projetos
- Tabela com todos os projetos (publicados e rascunhos)
- Toggle de publicacao rapido (switch published on/off)
- Botoes de editar e excluir
- Drag-and-drop ou campo numerico para reordenar

### Formulario de criar/editar projeto
- Formulario com todos os campos da tabela
- Upload de imagem (Supabase Storage)
- Preview antes de publicar
- Validacao com Zod + React Hook Form

## Passo 5: Adaptar o Frontend Publico

### Mudancas nos componentes existentes

- **`src/data/projects.ts`**: manter a interface `Project` mas adicionar campos `published` e `display_order`. Exportar um hook `useProjects()` que busca do Supabase em vez do array estatico
- **`src/components/PortfolioSection.tsx`**: trocar `import { projects }` por `useProjects()` hook. Adicionar loading state
- **`src/pages/ProjectDetail.tsx`**: buscar projeto individual do Supabase pelo slug
- **`src/components/PortfolioFilters.tsx`**: sem mudancas (ja recebe projects como prop)

## Passo 6: Novos Arquivos

```text
src/
  integrations/supabase/   (gerado pelo conector)
  hooks/
    useProjects.ts         -- hook para buscar projetos publicados
    useAdminProjects.ts    -- hook para CRUD completo (admin)
    useAuth.ts             -- hook de autenticacao
  pages/
    Login.tsx              -- pagina de login
    Admin.tsx              -- painel admin
  components/
    AdminRoute.tsx         -- wrapper de rota protegida
    AdminProjectForm.tsx   -- formulario de projeto
    AdminProjectList.tsx   -- tabela de projetos
```

## Passo 7: Rotas

```text
/          -- pagina publica (portfolio)
/projeto/:slug -- detalhe do projeto (publico)
/login     -- login do admin
/admin     -- painel admin (protegido)
```

## Resumo da Ordem de Implementacao

1. Conectar Supabase ao projeto
2. Criar tabelas, enum, funcao has_role e politicas RLS
3. Criar autenticacao (login page + hook + rota protegida)
4. Criar painel admin com CRUD de projetos
5. Adaptar frontend publico para buscar do banco
6. Migrar dados estaticos atuais como seed inicial
