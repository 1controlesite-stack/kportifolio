

# Corrigir z-index no Hover -- Problema de Especificidade CSS

## Problema

O `style={{ zIndex }}` inline tem **prioridade maior** que a classe Tailwind `hover:z-[100]`. Por isso o card nunca sobe de camada no hover -- o estilo inline sempre vence.

## Solucao

### Arquivo: `src/components/PortfolioSection.tsx` (linhas 105-121)

Remover o `zIndex` do `style` inline e usar um wrapper com CSS que controla ambos os estados:

- Estado passivo: aplicar o zIndex via classe CSS customizada ou variavel CSS
- Estado hover: `hover:!z-[100]` com `!important` para sobrescrever, **ou melhor**, mover o zIndex para uma CSS variable e controlá-lo via grupo

A abordagem mais limpa: remover `zIndex` do `style` e usar `className` com o valor dinamico via `style={{ '--z': zIndex }}` + CSS custom, ou simplesmente usar `onHoverStart`/`onHoverEnd` do Framer Motion para setar o zIndex via state.

**Abordagem escolhida (mais simples e confiavel):**

Usar eventos `onHoverStart` e `onHoverEnd` do Framer Motion para alternar o zIndex entre o valor base e 100 instantaneamente, sem animacao:

```text
const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

// No motion.div:
style={{
  zIndex: hoveredSlug === project.slug ? 100 : zIndex,
  ...margins
}}
onHoverStart={() => setHoveredSlug(project.slug)}
onHoverEnd={() => setHoveredSlug(null)}
```

Isso garante:
- z-index muda **instantaneamente** (sem interpolacao)
- O card fica em primeiro plano **junto com o hover**
- Sem conflito de especificidade CSS
- `scale: 1.03` continua animando suavemente via Framer Motion

