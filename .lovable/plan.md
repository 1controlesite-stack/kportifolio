

# Corrigir login e carregamento infinito do painel admin

## Problema

As politicas de seguranca (RLS) na tabela `projects` estao configuradas como **RESTRICTIVE** (restritivas). No PostgreSQL, quando todas as politicas sao restritivas, TODAS precisam ser verdadeiras simultaneamente para permitir acesso. 

Isso significa que para um admin fazer SELECT, tanto a politica "published = true" quanto "has_role admin" precisam passar ao mesmo tempo. Resultado: o admin so ve projetos publicados, e a query do painel admin (que busca TODOS os projetos) pode retornar resultados incompletos ou travar.

O mesmo problema afeta INSERT, UPDATE e DELETE -- todas sao restritivas, o que pode bloquear operacoes.

## Solucao

Recriar todas as politicas da tabela `projects` como **PERMISSIVE** (o padrao do PostgreSQL). Com politicas permissivas, basta UMA delas ser verdadeira para permitir o acesso.

### Migracao SQL

Uma unica migracao que:

1. Remove as 5 politicas restritivas atuais
2. Recria as mesmas 5 politicas como PERMISSIVE:
   - **SELECT**: "Anyone can view published projects" -- `published = true`
   - **SELECT**: "Admins can view all projects" -- `has_role(auth.uid(), 'admin')`
   - **INSERT**: "Admins can insert projects" -- `has_role(auth.uid(), 'admin')`
   - **UPDATE**: "Admins can update projects" -- `has_role(auth.uid(), 'admin')`
   - **DELETE**: "Admins can delete projects" -- `has_role(auth.uid(), 'admin')`

### Resultado esperado

- Login continua funcionando (ja funciona -- retorna 200)
- Admin consegue ver TODOS os projetos no painel (publicados e rascunhos)
- Admin consegue criar, editar, excluir e publicar/despublicar projetos
- Usuarios anonimos continuam vendo apenas projetos publicados

### Arquivos modificados

Nenhum arquivo de codigo precisa mudar. Apenas uma migracao SQL.
