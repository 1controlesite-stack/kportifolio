# Rewrite Completa: Transicao Cinematografica com Feixes em V

## Resumo  
  
EU CORRIJI O FEIXE DE 100º PARA 140º ADEQUE ISSO

Reescrever completamente o `SectionTransition.tsx` com duas mudancas fundamentais em relacao a versao atual:

1. **Feixes em V aberto (~140 graus)** em vez de horizontais -- cada feixe entra com angulo de ~40 graus em relacao a horizontal, convergindo no centro
2. **Animacao guiada por scroll** (`useScroll` + `useTransform`) em vez de `whileInView` pontual -- garante que o usuario veja a sequencia completa

## Geometria do V

```text
         \                    /
          \   (80° da horiz) /
           \                /
            \              /
             \            /
              \    **    /       <-- ponto de encontro (centro)
               \  FLASH /
                \      /
```

- Angulo de abertura entre os dois feixes: ~140 graus
- Cada feixe faz ~80 graus com a horizontal
- Feixe esquerdo: vem do canto superior esquerdo, desce em diagonal ate o centro
- Feixe direito: vem do canto superior direito, desce em diagonal ate o centro
- Ponto de encontro: centro da secao (50%, 50%)

## Implementacao tecnica

### `src/components/SectionTransition.tsx` -- reescrita total

**Arquitetura scroll-driven:**

- `useRef` na secao + `useScroll({ target, offset: ["start end", "end start"] })`
- `useTransform` para mapear `scrollYProgress` nos valores de cada camada
- Secao com `min-h-[50vh]` para dar janela de scroll suficiente

**Feixes em V (a mudanca principal):**

- Cada feixe e uma div com `position: absolute`, centrada no ponto de encontro
- Largura calculada: ~60% da viewport (para cobrir a diagonal)
- Altura: 3px com glow triplo (box-shadow)
- Feixe esquerdo: `rotate(-40deg)`, `transform-origin: right center`, comeca fora da tela (`scaleX: 0` ou translacao) e avanca ate o centro
- Feixe direito: `rotate(40deg)`, `transform-origin: left center`, espelhado
- Ambos animados por `scrollYProgress` (0% a 40% do scroll da secao)

**Camadas restantes (mesma logica do plano aprovado, agora com scroll):**

- Fundo escuro base
- Camada de revelacao clara com `clipPath: circle(...)` -- expande de 0% a 150% mapeado ao scroll (40%-80%)
- Flash central: opacidade em sino mapeada ao scroll (~35%-50%)
- Particulas de impacto: explodem do centro no momento da colisao (~40%-60%)
- Linha horizontal final: `scaleX` de 0 a 1 mapeado ao scroll (60%-90%)

**Valores de `useTransform`:**


| Camada      | scrollYProgress | Propriedade         | De -> Para     |
| ----------- | --------------- | ------------------- | -------------- |
| Feixe esq.  | 0 - 0.4         | scaleX              | 0 -> 1         |
| Feixe dir.  | 0 - 0.4         | scaleX              | 0 -> 1         |
| Flash       | 0.35 - 0.5      | opacity             | 0 -> 0.8 -> 0  |
| Flash       | 0.35 - 0.5      | scale               | 0.3 -> 2.5     |
| clipPath    | 0.4 - 0.8       | circle%             | 0% -> 150%     |
| Particulas  | 0.4 - 0.6       | translate + opacity | centro -> fora |
| Linha final | 0.6 - 0.9       | scaleX              | 0 -> 1         |


### `src/components/Hero.tsx` -- sem mudancas

- Ja esta com fade para `hsl(var(--background))` (escuro), correto para o novo componente.

### `src/pages/Index.tsx` -- sem mudancas

- Ja tem `<SectionTransition />` entre Hero e PortfolioSection.

## Detalhes visuais

- Feixes: 3px, gradiente purple->blue (esq) e cyan->blue (dir), glow neon triplo
- Flash: 400px, radial-gradient branco/azul, pico de opacidade 0.8
- Particulas: 6 pontos com direcoes radiais, cores da marca
- Revelacao: fundo `hsl(228 33% 97%)` expandindo do centro via clip-path circular
- Linha final: gradiente purple->blue->cyan, 2px, glow sutil

## Por que isso vai funcionar desta vez

1. **Scroll-driven** = usuario controla o ritmo, impossivel perder a animacao
2. **Feixes em V** = geometria mais dramatica e cinematografica que linhas horizontais
3. **50vh de altura** = janela ampla para a cena se desenrolar
4. **Sem `once: true**` = ao rolar para cima e voltar, a cena se repete