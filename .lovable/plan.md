

# Combobox para filtro de categorias + Validacao de seguranca

## 1. Combobox com busca no filtro de categorias

**Arquivo:** `src/components/AdminProjectList.tsx`

Substituir o `Select` atual de categorias por um Combobox construido com `Popover` + `Command` (cmdk), permitindo digitar para buscar entre as categorias.

Comportamento:
- Botao trigger mostra "Todas as categorias" ou o nome da categoria selecionada
- Ao abrir, exibe campo de busca (CommandInput) + lista filtravel (CommandList)
- Ao selecionar, fecha o popover e aplica o filtro
- Opcao "Todas as categorias" sempre visivel no topo
- Icone de check na categoria ativa
- CommandEmpty com mensagem "Nenhuma categoria encontrada"

Componentes usados (ja instalados):
- `Popover`, `PopoverTrigger`, `PopoverContent`
- `Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`
- `Check` e `ChevronsUpDown` do lucide-react

## 2. Seguranca -- ja garantida no banco

A seguranca do admin **ja esta corretamente implementada no banco de dados**, nao apenas no frontend:

- Todas as tabelas (`projects`, `categories`, `project_categories`) possuem RLS ativo
- Policies de INSERT/UPDATE/DELETE usam `has_role(auth.uid(), 'admin')` -- uma funcao `SECURITY DEFINER`
- A tabela `user_roles` so permite SELECT para admins
- Projetos nao publicados so sao visiveis para admins (policy separada)
- O frontend (`AdminRoute`) e apenas UX -- mesmo sem ele, o banco rejeita operacoes de usuarios nao-admin

Nenhuma mudanca no banco necessaria. A seguranca esta correta.

## Detalhes tecnicos

### Arquivo modificado
- `src/components/AdminProjectList.tsx` -- trocar Select por Combobox (Popover + Command)

### Sem dependencias novas
Todos os componentes necessarios ja estao instalados (cmdk, radix-popover).
