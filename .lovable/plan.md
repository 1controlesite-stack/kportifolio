

# Upload de Imagens no Admin + Animacao de Entrada no Portfolio

## Parte 1: Upload de Imagens no Formulario Admin

O bucket `project-images` ja existe e e publico. Precisamos adicionar RLS policies para permitir uploads por admins e criar o componente de upload.

### 1.1 Migracao SQL - RLS para Storage

Criar politicas no `storage.objects` para o bucket `project-images`:
- **SELECT** publico (imagens sao publicas)
- **INSERT/UPDATE/DELETE** somente para usuarios com role `admin`

### 1.2 Componente `ImageUpload`

Novo arquivo `src/components/ImageUpload.tsx`:
- Input de arquivo com drag-and-drop visual
- Preview da imagem selecionada
- Upload para o bucket `project-images` via Supabase Storage SDK
- Gera nome unico com timestamp + random string
- Retorna a URL publica apos upload
- Mostra progresso/loading durante upload
- Aceita prop `onUpload(url: string)` para integrar com o formulario

### 1.3 Atualizar `AdminProjectForm.tsx`

- Substituir os campos de texto "URL da imagem" e "Imagem showcase" por:
  - Componente `ImageUpload` que faz upload e preenche o campo automaticamente
  - Manter o campo de texto como fallback (URL manual)
  - Preview da imagem atual ao editar um projeto
- Ajustar o schema Zod: campo `image` aceita string vazia durante upload (validar no submit)

## Parte 2: Animacao de Entrada nos Cards do Portfolio

### 2.1 Atualizar `PortfolioSection.tsx`

Adicionar animacao `whileInView` nos cards para a primeira vez que aparecem na tela:
- Usar `initial={{ opacity: 0, y: 40 }}` combinado com `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true, margin: "-50px" }}` para disparar um pouco antes do card entrar na tela
- Manter o stagger existente com `delay: i * 0.08` para a entrada inicial
- Preservar as animacoes de `AnimatePresence` ja existentes para filtragem (sem conflito, pois `once: true` so dispara na primeira vez)

---

## Detalhes Tecnicos

### Arquivos novos
- `src/components/ImageUpload.tsx`

### Arquivos modificados
- `src/components/AdminProjectForm.tsx` - integrar ImageUpload nos campos de imagem
- `src/components/PortfolioSection.tsx` - adicionar whileInView nos cards

### Migracao SQL
- RLS policies em `storage.objects` para bucket `project-images`
