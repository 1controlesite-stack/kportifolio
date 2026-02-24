

# Ajustes nas particulas do Hero + glow + remover rastro do mouse

## Mudancas

### 1. `src/components/NetworkParticles.tsx` -- Ajustes de densidade, velocidade, opacidade e efeito "grudar no mouse"

**Densidade e velocidade:**
- Aumentar particulas: mobile 50, desktop 100
- Reduzir velocidade base para `0.3` (movimento mais lento e elegante)

**Interacao "grudar no mouse":**
- Inverter a forca do mouse: em vez de repelir, as particulas serao **atraidas** em direcao ao cursor (forca negativa, puxando para o mouse)
- Aumentar MOUSE_RADIUS para 150px para uma area de influencia maior
- Forca de atracao suave para que as particulas "orbitem" perto do cursor sem colapsar nele

**Efeito de glow nos pontos:**
- Antes de desenhar cada particula, aplicar `ctx.shadowBlur` (~8-12px) e `ctx.shadowColor` com a cor da particula
- Isso cria um halo de luz ao redor de cada ponto, dando profundidade
- Resetar `shadowBlur = 0` antes de desenhar as linhas (para nao aplicar glow nelas)

**Opacidade:**
- Aumentar opacidade dos pontos de `0.5` para `0.7`
- Manter linhas em `0.15` (sutis)

### 2. Remover `src/components/CursorEffect.tsx` e sua referencia

- Deletar o arquivo `src/components/CursorEffect.tsx` (rastro de particulas no mouse)
- Em `src/pages/Index.tsx`: remover o import e o componente `<CursorEffect />`

## Arquivos alterados
- `src/components/NetworkParticles.tsx` -- ajustes de fisica, glow, atracao
- `src/components/CursorEffect.tsx` -- deletar
- `src/pages/Index.tsx` -- remover import e uso do CursorEffect

