

# Atualizacao do Rodape (ContactFooter)

## Alteracoes no arquivo `src/components/ContactFooter.tsx`

### 1. Trocar o slogan
- **De**: "Vamos conversar?"
- **Para**: "Vamos criar algo EXTRAORDINÁRIO?"
- A palavra "EXTRAORDINÁRIO" pode ter destaque visual (uppercase ja esta, podemos manter o gradient-text no h2 inteiro)

### 2. Atualizar os links de contato

| Canal | De | Para |
|---|---|---|
| WhatsApp | `https://wa.me/5500000000000` | `https://wa.me/5516991962010` |
| Email | `mailto:contato@kenkya.com.br` | `mailto:kenkyasites@gmail.com` |
| LinkedIn | `https://linkedin.com/company/kenkya` | `https://instagram.com/kenkya_` (trocar icone para Instagram) |
| GitHub | Remover | -- |

- Trocar import de `Linkedin` e `Github` por `Instagram` do lucide-react
- Array `links` fica com 3 itens: WhatsApp, Email, Instagram

### 3. Rodape inferior
- **De**: `© 2026 Kenkya. Todos os direitos reservados.`
- **Para**: `© 2026 Kenkya. Todos os direitos reservados. | Feito por Kenkya` onde "Kenkya" e um link para `https://kenkya.com.br`

