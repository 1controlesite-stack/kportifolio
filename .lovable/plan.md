# Substituir vídeo do Hero pelo novo asset otimizado para scrub

## O que fazer

O usuário enviou um novo vídeo (`Bgv.mp4`) já otimizado para scrubbing. Basta substituir o asset atual.

## Passos

### 1. Copiar o vídeo para o projeto

- Copiar `user-uploads://Bgv.mp4` para `src/assets/hero-bg.mp4`, substituindo o arquivo atual.

### 2. Nenhuma mudanca de codigo

- O import em `Hero.tsx` ja aponta para `@/assets/hero-bg.mp4`, entao nada muda no codigo.  
  

  Auditar o scroll e confirmar a sync perfeita sem lag ou fallback, adicione isso ao plano