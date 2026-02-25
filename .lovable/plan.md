

# Substituir textura quadriculada por grid sutil tipo o exemplo

## Problema

A textura atual usa um padrao checkerboard (xadrez diagonal) que parece um PNG quebrado. O exemplo mostra um grid de linhas verticais e horizontais muito finas e sutis, quase invisiveis.

## Solucao

Substituir o `background-image` da classe `.section-light` em `src/index.css` por um grid de linhas retas (verticais + horizontais) com opacidade muito baixa (~2%), criando aquele efeito de "malha fina" elegante como no print de referencia.

## Detalhes tecnicos

### Arquivo: `src/index.css`

Substituir as linhas 80-86 (o background-image atual com gradientes diagonais) por:

```css
background-image: 
  linear-gradient(to right, hsl(220 14% 46% / 0.04) 1px, transparent 1px),
  linear-gradient(to bottom, hsl(220 14% 46% / 0.04) 1px, transparent 1px);
background-size: 60px 60px;
```

Isso cria linhas retas finas (1px) com espacamento de 60px, com opacidade de apenas 4% -- sutil e delicado como no exemplo.

### Nenhum outro arquivo precisa ser alterado

