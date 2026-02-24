

# Correcao: Feixes com angulo FIXO + Flash sem cobrir conteudo

## Problema 1: Feixes "abrindo" em vez de brilho viajando

O bug esta no `transformOrigin`. Atualmente:
- Feixe esquerdo: `transformOrigin: "right center"` -- a ponta direita (centro) fica fixa e o feixe cresce para a ESQUERDA
- Feixe direito: `transformOrigin: "left center"` -- a ponta esquerda (centro) fica fixa e o feixe cresce para a DIREITA

Isso faz parecer que o V esta "abrindo" porque os feixes nascem do centro e vao para fora.

**Correcao**: inverter as origens para que o brilho viaje dos cantos para o centro:
- Feixe esquerdo: `transformOrigin: "left center"` -- nasce na extremidade esquerda e avanca ate o centro
- Feixe direito: `transformOrigin: "right center"` -- nasce na extremidade direita e avanca ate o centro

O angulo (20deg / -20deg) permanece FIXO o tempo todo. So o comprimento visivel muda.

## Problema 2: Flash/reveal cobrindo conteudo do Portfolio

A secao tem `z-30` e a camada de revelacao clara (`clipPath circle`) com fundo solido fica POR CIMA do Portfolio. Alem disso o flash em si e muito grande.

**Correcao**:
- Adicionar `pointer-events-none` na secao inteira para nao bloquear interacao
- A camada de revelacao clara nao deve existir como div solido -- em vez disso, usar apenas o flash momentaneo e deixar o fundo do PortfolioSection cuidar da cor clara naturalmente
- Remover a camada `clipPath circle` completamente -- a transicao visual sera feita pelo proprio overlap (Hero escuro embaixo, Portfolio claro embaixo, a SectionTransition so adiciona os feixes e flash por cima)
- Reduzir o z-index da secao para `z-20` para nao ficar acima de elementos interativos do Portfolio (que tem filtros com z-110)

## Mudancas tecnicas

### `src/components/SectionTransition.tsx`

1. **Inverter `transformOrigin` dos dois feixes**:
   - Feixe esquerdo: de `"right center"` para `"left center"`
   - Feixe direito: de `"left center"` para `"right center"`

2. **Remover a camada de revelacao clara** (o div com `clipPath circle` e `backgroundColor: hsl(228 33% 97%)`):
   - Essa camada estava cobrindo o conteudo abaixo
   - O Portfolio ja tem seu proprio fundo claro

3. **Adicionar `pointer-events-none`** na secao para nao interceptar cliques

4. **Reduzir z-index** de `z-30` para `z-20`

5. **Remover a linha final horizontal** -- ela tambem fica "parada" cobrindo conteudo e nao agrega apos remover a revelacao

## Resultado esperado

```text
[Hero escuro]
     |
     | brilho viaja da borda esquerda =====>  \
     | brilho viaja da borda direita  =====>  /   (angulo fixo 20deg)
     |                                 ** FLASH **
     |
[Portfolio claro - visivel normalmente, sem nada por cima]
```

Os feixes tem angulo fixo de 140 graus durante toda a animacao. O brilho "corre" das extremidades para o centro. O flash e momentaneo e nao cobre nada depois.

