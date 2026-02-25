

# Corrigir perda de estado ao trocar aba do navegador

## Problema

Quando o usuario esta no formulario de novo projeto e troca para outra aba do navegador, ao voltar o formulario desaparece e ele volta para a lista de projetos.

**Causa raiz**: O hook `useAuth` escuta eventos de autenticacao (`onAuthStateChange`). Ao voltar para a aba, o token e renovado, disparando `syncAuthState` que define `loading = true`. O `AdminRoute` ve `loading = true`, renderiza o spinner e desmonta o componente `Admin`. Quando o loading termina, o `Admin` remonta com estado inicial `{ type: "list" }`.

## Solucao

Modificar o `useAuth` para nao voltar ao estado de `loading = true` apos o carregamento inicial. A re-verificacao de admin pode acontecer em background sem desmontar a tela.

## Detalhes tecnicos

### Arquivo: `src/hooks/useAuth.ts`

1. Adicionar uma flag `initialLoadDone` (useRef) para rastrear se o primeiro carregamento ja terminou
2. Na funcao `syncAuthState`, so definir `setLoading(true)` se `initialLoadDone` ainda for `false`
3. Apos o primeiro carregamento (no `finally` de `checkAdmin` ou em `finishAsLoggedOut`), marcar `initialLoadDone.current = true`
4. Em re-verificacoes subsequentes (tab focus, token refresh), atualizar `isAdmin` silenciosamente sem afetar `loading`

Isso garante que o `AdminRoute` so mostra spinner no carregamento inicial da pagina, e nao ao trocar de aba.

### Nenhum outro arquivo precisa ser alterado

O `AdminRoute` e o `Admin` continuam funcionando como estao -- a correcao e isolada no hook.
