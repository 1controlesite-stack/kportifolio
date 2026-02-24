

# Corrigir Exibicao das Imagens no Portfolio

## Problemas Identificados

1. **`aspect-[16/10]`** no container forca uma proporcao fixa, cortando imagens que nao tem essa proporcao exata
2. **`object-cover`** na tag `img` faz a imagem preencher o container cortando o excesso
3. **`overflow-hidden`** no container esconde as partes cortadas

Isso causa dois efeitos indesejados: imagens cortadas e desalinhamento vertical entre cards da mesma linha (a primeira imagem pode parecer "mais acima" por ter proporcao diferente).

## Solucao

### Arquivo: `src/components/PortfolioCard.tsx`

- Remover o `aspect-[16/10]` fixo do container
- Trocar `object-cover` por `object-contain` (ou simplesmente usar a imagem sem restricao de tamanho)
- Manter `w-full` e deixar a altura ser determinada pela proporcao natural da imagem
- Remover `overflow-hidden` do container interno (manter apenas no Link externo para o rounded)
- Adicionar `items-end` ou alinhar os cards pelo fundo no grid para que fiquem nivelados na mesma linha

### Arquivo: `src/components/PortfolioSection.tsx`

- Adicionar `items-end` no grid para que todos os cards de cada linha se alinhem pela base, evitando o efeito de "primeiro card mais acima"

## Resultado Esperado

Todas as imagens aparecem 100% sem cortes, e os cards de cada linha ficam alinhados pela base.

