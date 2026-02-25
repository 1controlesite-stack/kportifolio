
# Adicionar botao "Acessar Site" ao Hero

## Mudanca

**Arquivo:** `src/components/Hero.tsx`

Adicionar um segundo botao ao lado de "Ver Projetos" que direciona para `https://kenkya.com.br`. Os dois botoes ficarao lado a lado em um container flex.

### Detalhes

- Envolver os dois botoes em uma `motion.div` com `flex gap-4` e `flex-wrap` (para mobile empilhar se necessario)
- O botao "Ver Projetos" permanece como esta
- Novo botao "Acessar Site" com `<a>` estilizado como o botao existente, abrindo em nova aba (`target="_blank" rel="noopener noreferrer"`)
- Estilo levemente diferenciado: fundo semi-transparente branco (`bg-white/10`) para distinguir do outro, mantendo o mesmo estilo geral
- Texto: "Acessar Site" (curto e claro)
- Mesma animacao de entrada com delay ligeiramente maior (1.1s)

### Nenhum outro arquivo precisa ser alterado
