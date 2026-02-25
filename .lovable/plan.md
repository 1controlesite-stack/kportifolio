

# Corrigir Sistema de Ordenacao de Projetos

## Problemas Identificados

1. **Todos os projetos tem `display_order: 0`** no banco de dados. Foram criados antes do sistema de pagina/posicao existir, e o default da coluna e `0`.
2. **A logica de reposicionamento e fragil**: faz N updates individuais via JavaScript, sem atomicidade. Se algo falha no meio, os dados ficam inconsistentes.
3. **Sem normalizacao inicial**: nao existe migracao para corrigir os valores existentes.

## Solucao

### 1. Migracao: Normalizar `display_order` existente

Criar uma migracao SQL que atribui `display_order` sequencial (0, 1, 2, ...) baseado na ordem de `created_at`:

```sql
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) - 1 AS new_order
  FROM projects
)
UPDATE projects SET display_order = ordered.new_order
FROM ordered WHERE projects.id = ordered.id;
```

### 2. Migracao: Criar funcao RPC `reorder_project`

Criar uma funcao Postgres atomica que faz todo o shift de uma vez, evitando inconsistencias:

```text
reorder_project(p_project_id UUID, p_new_order INT)
1. Busca o display_order atual do projeto
2. Se igual ao novo, sai
3. Move o projeto para -9999 temporariamente
4. Se movendo para frente (new < old): incrementa tudo entre new e old-1
5. Se movendo para tras (new > old): decrementa tudo entre old+1 e new
6. Seta o projeto no novo valor
Tudo em uma unica transacao
```

### 3. Simplificar `useRepositionProject` (`src/hooks/useAdminProjects.ts`)

Trocar os N updates individuais por uma unica chamada RPC:

```text
await supabase.rpc('reorder_project', { p_project_id: projectId, p_new_order: newOrder })
```

### 4. Corrigir `useCreateProject` (`src/hooks/useAdminProjects.ts`)

Garantir que ao criar com auto (`display_order = -1`), o projeto receba `max(display_order) + 1` corretamente. Se `max` retornar null (nenhum projeto), usar 0.

### 5. Corrigir formulario (`src/components/AdminProjectForm.tsx`)

- Quando em modo auto e criando, nao chamar `repositionProject` (ja resolvido no create)
- Quando editando e mudando posicao, chamar o RPC direto

## Resumo de arquivos

| Arquivo | Mudanca |
|---|---|
| Migracao SQL | Normalizar display_order + criar funcao RPC `reorder_project` |
| `src/hooks/useAdminProjects.ts` | Simplificar `useRepositionProject` para usar RPC; corrigir auto-order no create |
| `src/components/AdminProjectForm.tsx` | Ajustar fluxo de save para usar o novo RPC corretamente |
