

# Efeito "Venom" + Constelações do Zodíaco

## Resumo
Ajustar a física das partículas para atração agressiva ao mouse (estilo Venom) com soltura rápida, e posicionar as partículas iniciais formando as 12 constelações do zodíaco distribuídas pela tela.

## Mudanças em `src/components/NetworkParticles.tsx`

### 1. Constelações do Zodíaco como posições iniciais

Definir um mapa de coordenadas normalizadas (0-1) para cada uma das 12 constelações:
- Áries, Touro, Gêmeos, Câncer, Leão, Virgem, Libra, Escorpião, Sagitário, Capricórnio, Aquário, Peixes
- Cada constelação terá entre 4-8 estrelas (pontos) posicionadas de acordo com o formato real da constelação
- As 12 constelações serão distribuídas em grid pela tela (4 colunas x 3 linhas, por exemplo)
- Coordenadas normalizadas escaladas para o tamanho real do canvas
- Total de partículas será a soma dos pontos de todas as constelações (~60-90 pontos no desktop, reduzido no mobile mostrando apenas 6 constelações)

As partículas começam nas posições das estrelas e depois se movem livremente com a física normal -- formando brevemente as constelações antes de se dispersarem.

### 2. Física "Venom" -- atração rápida, soltura rápida

- **Força de atração**: aumentar de `0.4 / dist` para `2.0 / dist`
- **MOUSE_RADIUS**: aumentar de `150` para `200`
- **Distância mínima**: reduzir de `5` para `3`
- **Damping condicional**:
  - Dentro do raio do mouse: `*= 0.98` (fluido, permite correr até o cursor)
  - Fora do raio: `*= 0.92` (freia rápido, solta as partículas imediatamente)
- **Velocidade máxima**: aumentar clamp de `1.5` para `4.0`

### 3. Dados das constelações

Estrutura de dados com coordenadas relativas para cada signo (exemplo simplificado):

```text
ARIES:     5 estrelas formando o "V" característico
TAURUS:    7 estrelas formando o "V" das Híades + chifres
GEMINI:    6 estrelas dos gêmeos lado a lado
CANCER:    5 estrelas em forma de "Y" invertido
LEO:       8 estrelas com a foice e o triângulo
VIRGO:     7 estrelas em linha angulada
LIBRA:     5 estrelas formando a balança
SCORPIO:   8 estrelas com a cauda curva
SAGITTARIUS: 7 estrelas com o arco
CAPRICORN: 6 estrelas em triângulo alongado
AQUARIUS:  6 estrelas em zigue-zague
PISCES:    6 estrelas em "V" conectado
```

As constelações são dispostas em uma grade pela viewport, cada uma ocupando uma célula, com leve randomização na posição para parecer natural.

## Arquivo alterado
- `src/components/NetworkParticles.tsx`

