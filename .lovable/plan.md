

# Correcao do Overlay nos Cards do Portfolio

## Problema
O overlay atual esta com `opacity-85` no estado normal, escurecendo demais a imagem. O usuario quer que a foto fique visivel sem overlay no estado passivo, e so escureca no hover.

## Solucao

### Arquivo: `src/components/PortfolioCard.tsx`

**Overlay (linha 27)**:
- Estado normal: trocar `opacity-85` por `opacity-0` -- imagem limpa, sem escurecimento
- Estado hover: trocar `group-hover:opacity-95` por `group-hover:opacity-90` -- escurece bastante no hover para o texto ficar legivel

**Titulo (linha 44)**:
- Como o titulo fica sempre visivel mas agora sem overlay, adicionar um leve gradiente separado so na parte inferior para garantir que o titulo seja legivel mesmo sem hover
- Adicionar uma segunda div de overlay menor, tipo `from-background/80 to-transparent` com altura limitada (tipo `h-1/3`) na parte de baixo, sempre visivel

### Resumo das mudancas

1. **Overlay principal**: `opacity-85 group-hover:opacity-95` vira `opacity-0 group-hover:opacity-90`
2. **Novo overlay parcial de base**: Um gradiente sutil so na parte inferior (sempre visivel) para o titulo continuar legivel no estado normal -- `from-background/70 via-background/30 to-transparent` com classe `h-1/2` posicionado no bottom

