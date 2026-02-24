

# Escurecer Titulo dos Cards (Contraste Passivo)

## Alteracao

### Arquivo: `src/components/PortfolioCard.tsx` (linha 48)

Adicionar um text-shadow mais forte no titulo para garantir legibilidade sobre qualquer imagem, mesmo sem hover.

- **De**: `drop-shadow-md`
- **Para**: `[text-shadow:_0_1px_8px_rgb(0_0_0_/_90%),_0_0_2px_rgb(0_0_0_/_60%)]`

Isso cria uma sombra escura forte ao redor do texto do titulo, garantindo contraste passivo contra imagens claras sem precisar de overlay.

