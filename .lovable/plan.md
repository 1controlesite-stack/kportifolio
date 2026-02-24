
# Auditoria e Correcao das Animacoes de Hover nos Cards

## Problema Identificado

O hover tem animacoes descoordenadas que criam um efeito em "passos":

1. **Imagem**: `scale-105` com `duration-500` (sem delay)
2. **Overlay**: `opacity-0 -> opacity-90` com `duration-400` (sem delay)
3. **Container de conteudo**: `translate-y-2 -> translate-y-0` com `duration-400` (sem delay)
4. **Tags**: `opacity` com `duration-300 delay-75`
5. **Titulo**: `opacity` com `duration-300 delay-75`
6. **Descricao**: `opacity` com `duration-300 delay-100`
7. **CTA**: `opacity` com `duration-300 delay-150`
8. **Borda gradiente** (CSS): `transition: background 0.4s ease` + animacao de gradient-rotate

Sao 7+ transicoes com timings diferentes, resultando no efeito escalonado.

## Solucao

Unificar os timings para que tudo aconteca de forma coesa, com uma unica "onda" suave:

### Arquivo: `src/components/PortfolioCard.tsx`

| Elemento | Antes | Depois |
|----------|-------|--------|
| Imagem (scale) | `duration-500` | `duration-500 ease-out` |
| Overlay | `duration-400` | `duration-500 ease-out` |
| Container conteudo (translate) | `duration-400` | `duration-500 ease-out` |
| Tags | `duration-300 delay-75` | `duration-500 ease-out` (sem delay) |
| Titulo | `duration-300 delay-75` | `duration-500 ease-out` (sem delay) |
| Descricao | `duration-300 delay-100` | `duration-500 ease-out` (sem delay) |
| CTA | `duration-300 delay-150` | `duration-500 ease-out` (sem delay) |

### Arquivo: `src/index.css`

- Ajustar `.gradient-border-animated` para usar `transition: background 0.5s ease-out` (alinhado com os 500ms)

### Resumo

- Todas as transicoes passam a ter `duration-500 ease-out`
- Remover todos os `delay-*` dos elementos internos
- Isso faz com que overlay, conteudo, e zoom da imagem acontecam em sincronia, criando um unico movimento fluido em vez de passos separados
