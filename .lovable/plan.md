

# Rewrite: Transicao Bilateral Cinematografica

## Diagnostico do que deu errado

A implementacao atual falhou em 5 pontos:
1. Linhas de 2px sao invisiveis - precisam de pelo menos 3-4px com glow forte
2. Flash de opacidade 0.3 num circulo de 160px nao aparece - precisa ser full-width com opacidade maior
3. 40vh de gradiente estatico mata o drama - o fundo deveria comecar ESCURO e so clarear APOS as linhas se encontrarem
4. O trigger `amount: 0.5` atrasa demais - precisa disparar com `amount: 0.3`
5. Nao ha conexao entre as linhas e a mudanca de fundo - parecem elementos separados

## Nova abordagem

A secao inteira comeca com fundo escuro. As linhas convergem. Quando se encontram, uma onda de luz se expande do centro revelando o fundo claro. O fundo MUDA por causa das linhas, nao independente delas.

## Componente reescrito: `src/components/SectionTransition.tsx`

Estrutura completamente nova:

```text
[Secao 25vh, comeca com fundo escuro]
  |
  |-- Camada base: fundo escuro (background color)
  |-- Camada de luz: div branco/claro, comeca com clipPath circular de 0%
  |      anima para clipPath circular de 150% APOS as linhas chegarem
  |-- Linha esquerda: 4px, glow forte, gradiente purple->blue
  |-- Linha direita: 4px, glow forte, gradiente cyan->blue  
  |-- Flash central: 400px, opacidade [0, 0.8, 0], escala ate 3x
  |-- Particulas de impacto: 6-8 pequenos pontos que explodem do centro
```

### Detalhes tecnicos

**Fundo animado com clip-path:**
- Div com fundo claro `hsl(228 33% 97%)` posicionado absoluto sobre fundo escuro
- Comeca com `clipPath: "circle(0% at 50% 50%)"` (invisivel)
- Anima para `clipPath: "circle(150% at 50% 50%)"` com delay de 1.2s (quando linhas chegam)
- Duracao: 0.8s, easeOut
- Isso cria o efeito de "revelacao" causada pelo impacto das linhas

**Linhas bilaterais reformuladas:**
- Altura: 3px (em vez de 2px)
- Box-shadow triplo: glow interno + medio + externo para efeito neon
- `boxShadow: "0 0 8px 2px hsl(...), 0 0 20px 4px hsl(...), 0 0 40px 8px hsl(...)"`
- Gradiente mais vibrante: cores puras sem transparent no inicio (a ponta fica luminosa)
- Mesmo timing: 1.2s easeInOut

**Flash central dramatico:**
- Tamanho: `w-[400px] h-[400px]` (10x maior que antes)
- Opacidade: `[0, 0.8, 0]` em vez de `[0, 0.3, 0]`
- Escala: `[0.3, 2.5, 3]`
- Cor: mix de blue e white para parecer luz real
- Duracao: 0.4s, delay 1.15s (comeca um pouco antes das linhas chegarem)

**Particulas de impacto (novo):**
- 6 pequenos circulos (6px) posicionados no centro
- Cada um anima para uma direcao diferente com angulos distribuidos
- `opacity: [0, 1, 0]`, delay: 1.2s, duracao: 0.6s
- Cores alternadas entre purple, blue, cyan
- Cria sensacao de "explosao" no ponto de encontro

**Linha final expandida:**
- Mesma ideia atual mas com 2px e glow
- `scaleX: 0 -> 1` com delay 1.5s

**Secao mais compacta:**
- Altura: `h-[25vh]` em vez de `h-[40vh]`
- Trigger: `viewport={{ once: true, amount: 0.3 }}`

## Mudancas em outros arquivos

### `src/components/Hero.tsx`
- O gradiente de transicao no bottom do Hero deve fazer fade para `hsl(var(--background))` (escuro), NAO para o claro
- Porque agora a SectionTransition comeca escura e so clareia com a animacao
- Mudar de `hsl(228 33% 97%)` de volta para `hsl(var(--background))`

### `src/components/PortfolioSection.tsx`
- Confirmar que nao tem gradiente no topo (nao tem, ok)
- Manter como esta

### `src/pages/Index.tsx`
- Ja tem o `<SectionTransition />` entre Hero e PortfolioSection, manter

## Sequencia visual final

```text
Scroll...

[Hero escuro com particulas]
    |  fade sutil para escuro (15vh)
    v
[SectionTransition - ESCURO no inicio]
    |  
    |  =====> linhas luminosas <=====  (convergem com glow neon)
    |           ** FLASH **            (400px, opacidade 0.8)
    |         . * . * . *             (particulas explodem)
    |  ~~~~ onda de luz circular ~~~~  (clip-path revela fundo claro)
    |  ─────────────────────────────   (linha fina se expande)
    v
[PortfolioSection - fundo claro ja revelado]
```

A diferenca fundamental: antes o fundo ja era claro e as linhas eram decorativas. Agora o fundo COMECA escuro e as linhas CAUSAM a revelacao do claro. Isso e cinematografico.
