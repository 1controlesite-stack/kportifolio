

# Hero: fade-in no vídeo, overlay mais escuro e moldura tech

## Mudanças em `src/components/Hero.tsx`

### 1. Fade-in suave no vídeo
- Envolver o container do vídeo (`div.absolute.inset-0.z-0`) em um `motion.div` com animação de opacidade de 0 para 1, duração ~1.5s, para o vídeo aparecer gradualmente ao carregar.

### 2. Escurecer mais o overlay
- Alterar o overlay de `bg-black/40` para `bg-black/65`, tornando o vídeo um detalhe de fundo sutil em vez do foco principal.

### 3. Moldura tech ao redor do Hero
- Adicionar uma borda interna estilizada usando um elemento `div` com `border` fina (1px) em cor sutil (`white/10` ou gradiente purple/cyan) com `inset` de ~16-24px, criando uma moldura retangular flutuante dentro do hero.
- Cantos com detalhes tech: pequenos marcadores nos 4 cantos da moldura (linhas em L) usando pseudo-elementos ou divs posicionadas, com cor do gradiente da marca (purple -> cyan).
- A moldura terá animação de entrada (fade-in + scale sutil) com delay para aparecer depois do conteúdo.

## Detalhes técnicos

```text
+--------------------------------------------------+
|  section (h-screen)                               |
|                                                   |
|    +-- moldura tech (inset ~20px, border 1px) --+ |
|    |                                             | |
|    |         [logo]                              | |
|    |    Design & Desenvolvimento                 | |
|    |         Kenkya                              | |
|    |       [Ver Projetos]                        | |
|    |                                             | |
|    +-- corner marks nos 4 cantos ---------------+ |
|                                                   |
+--------------------------------------------------+
```

### Arquivos alterados
- `src/components/Hero.tsx` -- todas as mudanças concentradas aqui

