

# Background "Network Particles" no Hero

## Resumo
Remover o video de fundo e substituir por uma animacao canvas de particulas conectadas (network/constellation), usando as cores da marca Kenkya.

## Mudancas

### 1. Criar `src/components/NetworkParticles.tsx`
Componente canvas dedicado com a logica de particulas:

- **Canvas fullscreen** posicionado absolute, z-0, cobrindo 100% da secao Hero
- **Particulas** distribuidas aleatoriamente, movendo-se lentamente em direcoes aleatorias, rebatendo nas bordas
- **Linhas de conexao** desenhadas entre particulas proximas (distancia < threshold), com opacidade proporcional a distancia (mais perto = mais visivel)
- **Interacao com mouse**: particulas dentro de um raio do cursor sao levemente atraidas/repelidas (efeito suave, sem clique)
- **Cores da marca**: pontos e linhas usando `hsl(262, 83%, 66%)` (roxo), `hsl(217, 91%, 60%)` (azul) e `hsl(187, 94%, 43%)` (ciano) com opacidade baixa (~0.3-0.6 pontos, ~0.1-0.2 linhas)
- **Responsividade**: detectar mobile via largura do canvas; em mobile usar ~40 particulas, em desktop ~80
- **Performance**: usar `requestAnimationFrame`, limpar no unmount, particulas com raio pequeno (1.5-2.5px)

### 2. Atualizar `src/components/Hero.tsx`
- Remover import do video (`heroVideo`), remover `videoRef`, remover todo o `useEffect` de controle do video
- Remover o elemento `<video>` e seu wrapper `motion.div`
- Remover o overlay `bg-black/65` (nao necessario sem video)
- Importar e renderizar `<NetworkParticles />` no lugar do video, como background (absolute, z-0)
- Manter intactos: tech frame, conteudo central, scroll indicator, gradiente de transicao

### Estrutura final do Hero

```text
<section h-screen>
  <NetworkParticles />        -- canvas z-0
  <tech-frame />              -- z-[2], moldura decorativa
  <content />                 -- z-10, logo + titulo + CTA
  <scroll-indicator />        -- z-10
  <gradient-transition />     -- z-20
</section>
```

### Detalhes tecnicos do canvas

- Cada particula: `{ x, y, vx, vy, radius, color }`
- Loop de animacao: mover particulas, checar proximidade (distancia euclidiana), desenhar linhas, desenhar circulos
- Mouse tracking via `mousemove` no window, coordenadas convertidas para posicao relativa ao canvas
- Efeito mouse: forca suave proporcional a `1 / distancia^2`, limitada a um raio de ~120px
- Connection distance threshold: ~150px
- Opacidade das linhas: `1 - (dist / maxDist)` multiplicado por ~0.15

