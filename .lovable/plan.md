

# Auditoria Mobile + Descrição Colapsável nos Slugs

## Mudanças

### 1. Cards desalinhados no mobile (`src/components/PortfolioSection.tsx`)
As margens negativas (`marginLeft: -1.5rem`) são aplicadas em todas as resoluções, empurrando os cards para fora da tela no mobile (1 coluna). Corrigir para aplicar overlap apenas em `md+` (4 colunas).

### 2. Rede Neural com suporte a touch (`src/components/NetworkParticles.tsx`)
Adicionar listeners `touchmove` e `touchend` ao canvas para que as partículas reajam ao toque no mobile, usando `e.touches[0].clientX/Y`.

### 3. Header do ProjectDetail com cores corretas (`src/pages/ProjectDetail.tsx`)
O header sticky usa `bg-background/80` (escuro) mas a página agora é `section-light`. Trocar para cores compatíveis com o fundo claro.

### 4. Título do Hero menor em telas pequenas (`src/components/Hero.tsx`)
Trocar `text-6xl md:text-8xl` por `text-4xl sm:text-6xl md:text-8xl lg:text-9xl`.

### 5. Descrição colapsável nos slugs (`src/pages/ProjectDetail.tsx`) -- NOVO
A descrição do projeto pode ser longa demais. Implementar um sistema "ver mais / ver menos":
- Limitar a descrição a 3 linhas com `line-clamp-3` por padrão
- Adicionar um botão "Ver mais" abaixo do texto truncado
- Ao clicar, expandir o texto completo e trocar o botão para "Ver menos"
- Usar um state `expanded` simples com `useState(false)`
- Transição suave na expansão com classes CSS

**Implementação técnica:**
```text
const [expanded, setExpanded] = useState(false);

<motion.p className={`text-lg text-muted-foreground mb-2 whitespace-pre-line ${!expanded ? 'line-clamp-3' : ''}`}>
  {project.description}
</motion.p>
<button onClick={() => setExpanded(!expanded)} className="text-sm text-primary hover:underline mb-6">
  {expanded ? 'Ver menos' : 'Ver mais'}
</button>
```

## Resumo

| Arquivo | Mudança |
|---|---|
| `PortfolioSection.tsx` | Remover margens negativas no mobile |
| `NetworkParticles.tsx` | Adicionar touch events |
| `ProjectDetail.tsx` | Corrigir cores do header + descrição colapsável com "Ver mais" |
| `Hero.tsx` | Reduzir título em telas pequenas |

