
# Ajustes na SectionTransition: Sobreposicao e Flash

## Problemas identificados no print

1. **A secao de transicao esta "separada"** -- ela fica como um bloco independente entre Hero e Portfolio, em vez de se mesclar com ambas
2. **A bola do flash fica visivel antes do impacto** -- o radial gradient azul aparece durante a aproximacao dos feixes, quebrando a ilusao

## Solucao

### 1. Sobreposicao com as secoes adjacentes

Usar `negative margin` no topo e no fundo + `z-index` alto para que a SectionTransition:
- Suba sobre a parte inferior do Hero (aprox. -25vh de margin-top)
- Desça sobre a parte superior do Portfolio (aprox. -25vh de margin-bottom)
- O ponto de encontro dos feixes (centro vertical da secao) fique exatamente na fronteira Hero/Portfolio

Isso faz a secao "flutuar" sobre as duas, criando continuidade visual.

Mudancas em `SectionTransition.tsx`:
- Adicionar `style={{ marginTop: "-25vh", marginBottom: "-25vh" }}` na section
- Aumentar `z-index` (z-30 ou superior) para ficar por cima do conteudo adjacente
- Remover `overflow-hidden` para os feixes poderem "sangrar" visualmente

Remover o gradiente de transicao do Hero (`Hero.tsx`):
- O div com `h-[15vh]` e gradiente no bottom do Hero ja nao sera necessario pois a SectionTransition cobre essa area diretamente

### 2. Flash so no impacto (sem bola visivel antes)

O problema e que `flashScale` comeca em `0.3` (ja visivel) e a opacidade sobe gradualmente. Precisa ser um evento pontual:

- Mudar `flashOpacity` de `[0.3, 0.4, 0.5] -> [0, 0.8, 0]` para uma curva mais abrupta: `[0.38, 0.4, 0.45] -> [0, 0.9, 0]`
- Mudar `flashScale` de `[0.3, 0.5] -> [0.3, 2.5]` para `[0.38, 0.45] -> [0.5, 3]` (comeca maior e mais rapido, sem fase de "crescimento visivel")
- Reduzir o tamanho base do flash de 400px para 200px -- ele escala ate 3x entao atinge 600px no pico, mas comeca menor e invisivel
- Trocar o gradiente: remover a borda azul solida e usar mais transparencia nas bordas externas para que a transicao seja suave e nao um circulo definido

## Detalhes tecnicos

### `src/components/SectionTransition.tsx`

```
Section: className="relative min-h-[50vh] z-30" style={{ marginTop: "-25vh", marginBottom: "-25vh", backgroundColor: "transparent" }}
```

- Fundo `transparent` em vez de `background` escuro (ele flutua sobre o Hero que ja e escuro)
- A camada de revelacao clara (`clipPath circle`) continua funcionando normalmente

Flash central refinado:
- Tamanho: `w-[200px] h-[200px]` (em vez de 400px)
- `flashOpacity`: janela estreita `[0.38, 0.4, 0.45]` -> `[0, 0.9, 0]`
- `flashScale`: `[0.38, 0.45]` -> `[0.5, 3.5]`
- Gradiente: mais transparente nas bordas -- `radial-gradient(circle, white 0%, hsl(blue/0.6) 30%, transparent 55%)`

### `src/components/Hero.tsx`

- Remover o div de gradiente de transicao no bottom (o que tem `h-[15vh]` com linear-gradient) -- ja nao e necessario pois a SectionTransition cobre essa zona

### `src/pages/Index.tsx`

- Sem mudancas (a ordem Hero > SectionTransition > Portfolio ja esta correta)

## Resultado esperado

```text
[Hero escuro - conteudo normal]
     |
     |  <-- SectionTransition COMECA AQUI (sobre o Hero, z-30)
     |       feixes em V descem dos cantos
     |       
     |=======  PONTO DE ENCONTRO  ======= <-- fronteira visual Hero/Portfolio
     |       flash instantaneo (sem bola visivel antes)
     |       revelacao circular do fundo claro
     |  <-- SectionTransition TERMINA AQUI (sobre o Portfolio)
     |
[Portfolio claro - conteudo normal]
```

A transicao deixa de ser um "bloco separado" e passa a ser uma camada que costura as duas secoes.
