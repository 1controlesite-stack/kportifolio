
# Corrigir Proporcao dos Cards no Grid

## Problema
As 3 imagens de showcase (`ana-ferreira.jpg`, `inspira-yoga.jpg`, `mecanica-mt.jpg`) tem proporcoes ligeiramente diferentes entre si. Como cada card usa `h-auto` (altura natural da imagem), cards com imagens mais altas ficam maiores que os outros na mesma linha, causando desalinhamento visual.

## Solucao

### `src/components/PortfolioCard.tsx`
- Adicionar um container com `aspect-[4/3]` (ou a proporcao que melhor se encaixe nas imagens de showcase)
- Usar `object-contain` na imagem para que ela apareca 100% sem cortes, centralizada dentro do container
- Adicionar `bg-transparent` ou `bg-background` no container para que o espaco vazio (se houver) nao fique branco
- Isso garante que todos os cards tenham exatamente a mesma altura, independente da proporcao original da imagem

### Detalhes tecnicos
```text
Antes:  <img class="w-full h-auto block" />
Depois: <div class="aspect-[4/3]">
          <img class="w-full h-full object-contain" />
        </div>
```

Todas as imagens aparecem inteiras (sem corte) e todos os cards ficam com a mesma proporcao, eliminando o desalinhamento entre o primeiro card e os demais.
