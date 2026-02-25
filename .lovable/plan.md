
# Adicionar textura grid ao ProjectDetail e alterar texto do botao

## Mudancas

### 1. `src/pages/ProjectDetail.tsx`
Adicionar a classe `section-light` ao `<main>` do ProjectDetail para aplicar o mesmo fundo com grid sutil que ja existe na secao de projetos da home.

- Linha 38: trocar `className="min-h-screen bg-background"` por `className="min-h-screen section-light"`
- Ajustar as cores de texto que dependiam do tema escuro (`text-foreground`, `text-muted-foreground`, etc.) -- como `section-light` ja define variaveis claras, os componentes devem funcionar corretamente com as classes existentes.

### 2. `src/components/Hero.tsx`
- Linha 80: trocar o texto `"Acessar Site"` por `"Visitar o Site"`

## Resumo

| Arquivo | Mudanca |
|---|---|
| `src/pages/ProjectDetail.tsx` | Classe `section-light` no `<main>` para aplicar grid |
| `src/components/Hero.tsx` | Texto do botao de "Acessar Site" para "Visitar o Site" |
