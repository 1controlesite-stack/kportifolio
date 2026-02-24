
## Objetivo imediato

Resolver o problema “não loga / admin fica carregando infinito” com foco em estabilidade da autenticação e do guard de rota.

## Diagnóstico já validado

Com base no que foi analisado:

1. O login por email/senha está funcionando no backend (requisição retorna **200** e token válido).
2. O usuário `kenkyasites@gmail.com` existe e possui role `admin` em `public.user_roles`.
3. As políticas RLS de `projects` estão corretas e permissivas (não são mais a causa principal).
4. O travamento acontece no frontend no estado de autenticação (`loading`), antes do painel renderizar.
5. O ponto mais provável é o `useAuth` atual: ele usa `await supabase.rpc(...)` dentro do callback de `onAuthStateChange`, padrão que pode causar bloqueio/loop de estado e impedir `loading` de finalizar em alguns cenários.

## Implementação proposta

### 1) Refatorar o fluxo de `useAuth` para eliminar deadlock e estados pendentes
**Arquivo:** `src/hooks/useAuth.ts`

Ajustes:

- Remover `async/await` direto dentro de `supabase.auth.onAuthStateChange(...)`.
- Criar função separada `checkAdmin(userId)` com `try/catch/finally`.
- Garantir que `setLoading(false)` sempre execute (inclusive quando RPC falhar).
- Tratar caso sem sessão (`user = null`) de forma imediata (`isAdmin = false`, `loading = false`).
- Evitar atualização de estado após unmount (flag `isMounted`).

Resultado esperado:
- `/admin` não fica mais preso em spinner infinito.
- Falha pontual no RPC de role não bloqueia app inteiro (degrada para não-admin em vez de travar).

### 2) Ajustar UX da tela de login para evitar sensação de “travou”
**Arquivo:** `src/pages/Login.tsx`

Ajustes:

- Encerrar `loading` no fluxo completo com `try/catch/finally`.
- Se login for bem-sucedido mas o usuário não tiver acesso admin, mostrar mensagem clara (ex.: “Conta autenticada, mas sem permissão de admin”).
- Manter navegação para `/admin`, mas com estado consistente (sem botão preso em “Entrando...” por exceção não tratada).

Resultado esperado:
- Botão sempre volta ao estado correto em erro.
- Mensagens mais claras para diferenciar erro de senha vs. erro de permissão.

### 3) Tornar o `AdminRoute` resiliente a falhas de role-check
**Arquivo:** `src/components/AdminRoute.tsx`

Ajustes:

- Manter spinner apenas enquanto `loading` real.
- Com `loading=false`:
  - sem usuário -> `/login`
  - usuário sem admin -> `/`
- (Opcional) exibir fallback de erro amigável se houver estado de erro explícito vindo do hook.

Resultado esperado:
- Guard nunca prende em loop visual.
- Navegação previsível em todos os casos.

## Sequência de execução

1. Refatorar `useAuth.ts` (prioridade máxima).
2. Ajustar `Login.tsx` (tratamento de loading/erros).
3. Revisar `AdminRoute.tsx` para comportamento final.
4. Validar fluxo manual ponta a ponta.

## Plano de validação (fim a fim)

1. Acessar `/login`.
2. Logar com `kenkyasites@gmail.com`.
3. Confirmar redirecionamento e renderização do `/admin` sem spinner infinito.
4. Recarregar página em `/admin` (F5) e confirmar que continua carregando normalmente.
5. Fazer logout e confirmar retorno à proteção de rota.
6. Testar usuário sem role admin (ou sessão inválida) para confirmar redirecionamento correto.

## Riscos e mitigação

- **Risco:** RPC de role falhar intermitente.
  - **Mitigação:** `try/catch/finally` com `loading=false` garantido.
- **Risco:** corrida entre `onAuthStateChange` e `getSession`.
  - **Mitigação:** centralizar atualização de estado em função única e idempotente.
- **Risco:** regressão em fluxo de logout.
  - **Mitigação:** incluir logout/reload no checklist de validação.

## Observação técnica

Não há necessidade de novas mudanças de banco para este bug específico. O problema atual é de sincronização de estado/auth no frontend.
