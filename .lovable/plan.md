

# Ordem por Pagina + Posicao no Formulario de Projeto

## Conceito

Substituir o input numerico "Ordem de exibicao" por dois selects intuitivos: **Pagina** e **Posicao na pagina**. O portfolio publico exibe 12 projetos por pagina, entao:

- **Pagina 1, Posicao 3** = `display_order = 2` (zero-indexed: `(1-1)*12 + (3-1)`)
- **Pagina 2, Posicao 1** = `display_order = 12`

Se o usuario nao preencher (deixar "Automatico"), o projeto vai para o final da lista (comportamento atual com `max + 1`).

## Mudancas

### 1. Formulario do projeto (`src/components/AdminProjectForm.tsx`)

Na secao "Configuracoes", remover o input numerico e adicionar:

- **Select "Pagina"**: opcoes de 1 ate `totalPages + 1` (a proxima pagina possivel). Opcao padrao: "Automatico (mais recente)"
- **Select "Posicao na pagina"**: opcoes de 1 a 12. So aparece quando uma pagina e selecionada
- Preview textual: "Este projeto aparecera na **pagina 2, posicao 3** do portfolio"
- Ao salvar, converter para `display_order = (pagina - 1) * 12 + (posicao - 1)`
- Ao carregar projeto existente, fazer o inverso: `pagina = floor(display_order / 12) + 1`, `posicao = (display_order % 12) + 1`

### 2. Hook de projetos (`src/hooks/useAdminProjects.ts`)

- No `useCreateProject`, quando `display_order` nao for especificado (automatico), buscar o `max(display_order)` dos projetos existentes e usar `max + 1`
- Ao inserir um projeto em uma posicao especifica, deslocar os projetos subsequentes: incrementar o `display_order` de todos os projetos que tem `display_order >= novaPosicao`

### 3. Logica de deslocamento

Quando o usuario escolhe pagina 1 posicao 3 (`display_order = 2`):
- Todos os projetos com `display_order >= 2` tem seu `display_order` incrementado em 1
- O novo projeto recebe `display_order = 2`
- Isso "empurra" os projetos existentes para baixo sem conflitos

Na edicao, se o usuario muda a posicao:
- Remove o projeto da posicao antiga (decrementa os que estavam depois)
- Insere na nova posicao (incrementa os que estao na nova posicao em diante)

## Detalhes Tecnicos

### Calculo de paginas disponiveis
```text
const totalProjects = projects.length (todos os projetos publicados + rascunhos)
const ITEMS_PER_PAGE = 12
const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE) || 1
// Oferecer ate totalPages + 1 (proxima pagina)
```

### Conversao display_order <-> pagina/posicao
```text
// Para o formulario (leitura):
const page = Math.floor(display_order / 12) + 1
const position = (display_order % 12) + 1

// Para salvar (escrita):
const display_order = (page - 1) * 12 + (position - 1)
```

### Mutation de reposicionamento (`useAdminProjects.ts`)
```text
useRepositionProject: recebe { projectId, newOrder }
1. Se editando: busca o display_order atual do projeto
2. Incrementa display_order de todos projetos com display_order >= newOrder (exceto o proprio)
3. Atualiza o projeto com o novo display_order
```

## Resumo de arquivos

| Arquivo | Mudanca |
|---|---|
| `src/components/AdminProjectForm.tsx` | Trocar input numerico por selects de Pagina + Posicao com preview |
| `src/hooks/useAdminProjects.ts` | Adicionar logica de reposicionamento e auto-order |

