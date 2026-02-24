

# Transicao Animada Dark-to-Light com Efeito Bilateral

## Conceito

Substituir o gradiente estatico por uma **secao de transicao dedicada** entre o Hero e os Projetos. Duas linhas luminosas (gradiente da marca) surgem das extremidades esquerda e direita, avancam em direcao ao centro e, ao se encontrarem, "explodem" numa onda de luz que revela o fundo claro. Tudo acionado por scroll (whileInView).

## Estrutura

```text
[Hero - dark]
    |  gradiente suave no bottom do Hero (menor, ~15vh)
    v
[TransitionDivider - componente novo, ~40vh de altura]
    |  fundo: gradiente vertical dark -> light
    |  animacao: duas linhas horizontais das bordas ao centro
    |  ao se encontrarem: flash sutil + onda radial de luz
    v
[PortfolioSection - claro, sem gradiente no topo]
```

## Novo Componente: `src/components/SectionTransition.tsx`

Componente Framer Motion com scroll-triggered animations:

1. **Fundo**: gradiente vertical de `hsl(var(--background))` para `hsl(228 33% 97%)`
2. **Linha esquerda**: `motion.div` horizontal, comeca em `x: "-100%"`, anima ate `x: "0"` (centro)
3. **Linha direita**: mesma coisa espelhada, de `x: "100%"` ate `x: "0"`
4. **Flash central**: quando as linhas "chegam" (delay sincronizado), um circulo radial de opacidade 0 -> 0.3 -> 0 pulsa no centro
5. **Linha horizontal fina**: apos o encontro, uma linha fina gradiente (roxo-azul-ciano) se expande do centro para as bordas (scaleX 0 -> 1), marcando a divisao

### Detalhes da animacao

- Linhas laterais: 2px de altura, largura 50%, gradiente da marca, com blur/glow
- Trigger: `whileInView` com `viewport={{ once: true, amount: 0.5 }}`
- Duracao: ~1.2s para as linhas chegarem, 0.3s para o flash, 0.6s para a linha se expandir
- Easing: `easeInOut` para as linhas, `easeOut` para o flash

## Mudancas em Arquivos Existentes

### `src/components/Hero.tsx` (linha 82-88)
- Reduzir o gradiente de transicao de `h-[30vh]` para `h-[15vh]` -- so um fade sutil, a transicao real fica no novo componente

### `src/components/PortfolioSection.tsx` (linha 31)
- Remover qualquer gradiente de transicao no topo (nao tem, so confirmar)
- Manter tudo como esta

### `src/pages/Index.tsx`
- Inserir `<SectionTransition />` entre `<Hero />` e `<PortfolioSection />`

## Resultado Visual

```text
Scroll para baixo...

[Dark hero vai sumindo]
         ====>          <====        (linhas vindo das bordas)
              *flash*                (encontro no centro)
    ─────────────────────────────    (linha fina se expande)
[Fundo claro dos projetos aparece]
```

A transicao fica cinematografica, com movimento e luz, sem ser pesada em performance (poucas divs, sem canvas extra).

