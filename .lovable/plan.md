

# Ocultar Titulo Passivo nos Cards

## Alteracao

### Arquivo: `src/components/PortfolioCard.tsx` (linha 48)

Adicionar `opacity-0 group-hover:opacity-100 transition-opacity duration-300` no titulo (`h3`) para que ele fique oculto por padrao e apareca somente no hover, junto com as demais informacoes.

Tambem remover o overlay parcial inferior (linhas 33-34) que existia so para dar legibilidade ao titulo passivo, ja que nao sera mais necessario.

