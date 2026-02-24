

# Corrigir tamanho da coluna 1 no grid do Portfolio

## Problema

No grid 4x3, a coluna 1 (mais a esquerda) aparece visualmente menor que as colunas 2, 3 e 4. Isso acontece porque as colunas 2-4 tem `marginLeft: -1.5rem` que as faz "invadir" o espaco da coluna anterior, ganhando largura visual extra. A coluna 1 nao tem essa compensacao.

## Solucao

### Arquivo: `src/components/PortfolioSection.tsx`

- Remover o `gap-y-6` do grid e controlar o espacamento manualmente (o gap horizontal interfere com o overlap)
- Usar `gap-0` no grid para que a margem negativa funcione corretamente
- Adicionar um `marginRight` negativo na coluna 1 (ou ajustar a escala) para que ela ocupe o mesmo espaco visual que as demais
- Alternativa mais simples e robusta: aplicar `scale` na coluna 1 para que ela cresca proporcionalmente, ou reduzir a margem negativa e compensar com padding

**Abordagem escolhida**: Aumentar levemente a escala (`scale`) dos cards da coluna 1 para que fiquem proporcionais aos demais visualmente. Algo como `scale: 1.05` ou similar nos items de `col === 0`.

### Detalhes tecnicos

No `PortfolioSection.tsx`, dentro do map, adicionar uma condicao:

```text
col === 0 ? { transform: "scale(1.05)", transformOrigin: "bottom left" } : {}
```

Isso fara os cards da coluna 1 crescerem 5% proporcionalmente, alinhando visualmente com os outros cards que "ganham" espaco pelo overlap. O `transformOrigin: "bottom left"` garante que o crescimento aconteca para a direita e para cima, mantendo o alinhamento pela base.

