

# Redesign do Painel Admin -- Estilo Dashboard Moderno

Inspirado em paineis como Stripe/Asaas: layout com sidebar fixa, cards de resumo, navegacao clara e formulario organizado em secoes colapsaveis.

## Estrutura Visual

```text
+------------------+--------------------------------------------+
|                  |  Header com breadcrumb + avatar/logout      |
|   SIDEBAR        +--------------------------------------------+
|                  |                                            |
|   Logo           |   Cards de resumo (total, publicados,      |
|   ----------     |   rascunhos)                               |
|   Projetos       |                                            |
|   ----------     |   Tabela de projetos com busca,            |
|   Sair           |   thumbnail, status badge, acoes inline    |
|                  |                                            |
+------------------+--------------------------------------------+
```

## Mudancas Planejadas

### 1. Novo layout do Admin (`src/pages/Admin.tsx`)

- Sidebar fixa a esquerda (colapsavel em mobile) com logo, link "Projetos" e botao "Sair"
- Area de conteudo principal com header contextual (breadcrumb: Admin > Projetos > Editar)
- Usar Shadcn Sidebar component para responsividade

### 2. Dashboard com metricas (`src/components/AdminDashboardStats.tsx`) -- novo arquivo

- 3 cards no topo: **Total de Projetos**, **Publicados**, **Rascunhos**
- Icones e cores distintas para cada card
- Dados derivados da query existente (sem nova query)

### 3. Lista de projetos refinada (`src/components/AdminProjectList.tsx`)

- Campo de busca por titulo no topo
- Thumbnail do projeto na tabela (coluna com imagem pequena)
- Badge colorido para status (publicado = verde, rascunho = amarelo) no lugar do switch
- Switch movido para dropdown de acoes ("..." menu) junto com editar/excluir
- Linhas com hover mais suave
- Estado vazio com ilustracao quando nao ha projetos

### 4. Formulario em secoes (`src/components/AdminProjectForm.tsx`)

- Organizar campos em secoes colapsaveis usando Collapsible:
  - **Informacoes basicas** (titulo, slug, descricao, tags)
  - **Midia** (imagem principal, showcase)
  - **Conteudo do case** (desafio, processo, solucao, resultado)
  - **Configuracoes** (ordem, URL ao vivo, publicado)
- Breadcrumb no topo em vez de botao "Voltar" solto
- Botoes "Salvar" e "Cancelar" fixos no rodape do formulario (sticky bottom)

### 5. Componente AdminSidebar (`src/components/AdminSidebar.tsx`) -- novo arquivo

- Logo Kenkya no topo
- Navegacao com icone + label (apenas "Projetos" por enquanto, extensivel)
- Indicador visual do item ativo
- Botao de logout no rodape da sidebar
- Colapsavel em mobile (hamburger menu)

## Detalhes Tecnicos

### Arquivos novos
- `src/components/AdminSidebar.tsx` -- sidebar com navegacao
- `src/components/AdminDashboardStats.tsx` -- cards de metricas

### Arquivos modificados
- `src/pages/Admin.tsx` -- layout com sidebar + conteudo principal
- `src/components/AdminProjectList.tsx` -- busca, thumbnail, badges, dropdown de acoes
- `src/components/AdminProjectForm.tsx` -- secoes colapsaveis, sticky footer

### Dependencias
- Usar componentes Shadcn ja instalados: Sidebar, Collapsible, DropdownMenu, Badge, Card
- Nenhuma nova dependencia necessaria

