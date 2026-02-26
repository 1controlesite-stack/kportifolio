

# Configuracao Vercel para SPA Routing

## Problema

Ao fazer deploy no Vercel, acessar rotas como `/admin` diretamente no navegador retorna 404, pois o Vercel tenta encontrar um arquivo fisico em `/admin/index.html`. Como este e um SPA (Single Page Application) com React Router, todas as rotas precisam ser redirecionadas para `index.html`.

## Solucao

Criar um unico arquivo `vercel.json` na raiz do projeto com a configuracao de rewrite para redirecionar todas as rotas para `index.html`.

### Arquivo: `vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Isso garante que qualquer rota (incluindo `/admin`, `/login`, `/projeto/slug`, etc.) carregue o `index.html` e deixe o React Router resolver a navegacao no client-side.

## Resumo

| Arquivo | Acao |
|---|---|
| `vercel.json` | Criar na raiz do projeto com regra de rewrite para SPA |

