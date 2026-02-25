
# Intensificar Grid de Fundo + Offwhite + Destaque nos Botoes

## Mudancas

### 1. Intensificar o xadrez de fundo (`src/index.css`)
A opacidade atual do grid e `0.04` (praticamente invisivel). Aumentar para `0.09` para que o padrao fique mais perceptivel sem ser agressivo. Tambem trocar o fundo de branco puro (`228 33% 97%` = ~#F8F9FC) para um offwhite mais quente e confortavel (`230 25% 95%` = ~#F0F1F6).

**Antes:**
```css
--sl-bg: 228 33% 97%;
background-image:
  linear-gradient(to right, hsl(220 14% 46% / 0.04) 1px, transparent 1px),
  linear-gradient(to bottom, hsl(220 14% 46% / 0.04) 1px, transparent 1px);
```

**Depois:**
```css
--sl-bg: 230 25% 95%;
background-image:
  linear-gradient(to right, hsl(220 14% 46% / 0.09) 1px, transparent 1px),
  linear-gradient(to bottom, hsl(220 14% 46% / 0.09) 1px, transparent 1px);
```

### 2. Cards com fundo offwhite em vez de branco (`src/index.css`)
Ajustar a variavel `--sl-border` e `--sl-input` para combinar com o novo offwhite, mantendo contraste adequado.

### 3. Botoes do Hero mais destacados (`src/components/Hero.tsx`)
Atualmente os dois botoes tem bordas finas e pouco contraste. Melhorar:
- **"Ver Projetos"**: adicionar `gradient-bg text-white` (fundo gradiente solido) em vez de apenas borda
- **"Visitar o Site"**: manter como outline mas aumentar opacidade da borda para `border-white/50` e `bg-white/15`

### 4. Botao "Ver ao vivo" no ProjectDetail (`src/pages/ProjectDetail.tsx`)
Ja usa `gradient-bg`, esta ok. Nenhuma mudanca necessaria.

### 5. Cards do portfolio -- fundo offwhite (`src/components/ProjectCard.tsx`)
Os cards usam `bg-card` (tema escuro). Na secao de projetos (que e escura), isso esta correto. Nenhuma mudanca necessaria aqui pois a secao de projetos fica no tema escuro.

---

## Resumo de arquivos

| Arquivo | Mudanca |
|---|---|
| `src/index.css` | Offwhite no `--sl-bg`, grid mais intenso (0.04 -> 0.09) |
| `src/components/Hero.tsx` | Botao "Ver Projetos" com gradient-bg, "Visitar o Site" com mais destaque |
