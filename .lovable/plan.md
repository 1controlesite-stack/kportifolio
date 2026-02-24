
# Auditoria consolidada + plano de correção (flicker/fallback no vídeo do Hero)

## O que foi auditado
- `src/components/Hero.tsx` (implementação atual de scroll scrub com Framer Motion + rAF)
- `src/pages/Index.tsx` (ordem Hero -> ProjectsSection)
- `src/components/ProjectsSection.tsx` (fundo e entrada da seção seguinte)
- Console logs/sessão: sem erros reportados no momento da captura
- Screenshot confirma o Hero renderizando corretamente, mas não captura o stutter em movimento

## Diagnóstico técnico (causa provável do “flica/trava/fallback”)
1. **Não é GSAP**  
   No código atual não há GSAP/ScrollTrigger; o Hero está com Framer Motion (`useScroll`, `useMotionValueEvent`).

2. **Scrubbing ainda agressivo para certos devices/codecs**  
   Mesmo com rAF, o vídeo ainda recebe muitos seeks durante scroll rápido (incluindo reverse), e isso pode forçar o decoder a “pular” para frames-chave/distantes.

3. **rAF contínuo desnecessário**  
   O loop atual roda permanentemente, mesmo parado. Isso aumenta custo de CPU/GPU e piora estabilidade em máquinas mais fracas.

4. **Gate de metadata incompleto**  
   Hoje a lógica depende de `video.duration` truthy; funciona em parte, mas ainda falta um fluxo explícito com `loadedmetadata`/estado de readiness para robustez total.

5. **Fallback visual durante scrub**  
   Em vídeos com GOP longo (encoding não otimizado para scrubbing), seeks frequentes fazem navegador exibir quadros “instáveis” (aparência de fallback/flicker).

## Plano de implementação (juntando ao plano já aprovado)

### Arquivo alvo
- `src/components/Hero.tsx` (único arquivo de código a alterar)

### 1) Tornar seek “on-demand” (sem rAF infinito)
- Remover o loop contínuo.
- Criar agendamento de **um único rAF por atualização pendente**:
  - `pendingProgressRef`
  - `rafRef`
  - `scheduleSeek()`
- `useMotionValueEvent` apenas atualiza progresso e chama `scheduleSeek()`.
- Resultado: **0 processamento quando usuário não está rolando**.

### 2) Gate explícito por `loadedmetadata`
- Adicionar `videoReadyRef` (ou estado equivalente) inicial `false`.
- No evento `loadedmetadata`, marcar `true` e permitir seeks.
- Antes disso, ignorar seek requests.
- Evita cálculos/seeks em duração inválida e reduz inconsistência de início.

### 3) Anti-jitter no scrub
- Aplicar seek só se diferença for relevante (epsilon), ex.: `>= 1 frame` (~0.016–0.033s).
- Clampar progresso em `[0,1]`.
- Em saltos grandes, usar `fastSeek` quando disponível; fallback para `currentTime`.
- Isso reduz “micro-seeks” que causam flicker visual.

### 4) Preservar e ajustar transição Hero -> Projetos
- Manter o gradiente de transição já adicionado.
- Ajustar curva de fade se necessário para ficar mais natural (ex.: início levemente antes).
- Garantir sobreposição visual limpa com `ProjectsSection` (`bg-background`).

### 5) Hardening opcional (se o flicker persistir após código)
- Se ainda houver artefato, causa tende a ser **encoding do asset**:
  - Re-encode do `hero-bg.mp4` com keyframes mais frequentes (ex.: GOP curto, `-g ~12-24` conforme fps)
  - Perfil H.264 compatível para web (yuv420p)
- Isso não muda UX, mas melhora muito scrub reverso/rápido.

## Sequência de execução
1. Refatorar `Hero.tsx` para seek on-demand + metadata gate.
2. Aplicar anti-jitter/epsilon e clamp.
3. Validar visualmente a transição Hero -> Projetos.
4. QA agressivo em desktop e mobile.
5. Se necessário, segunda rodada com re-encode do vídeo.

## QA agressivo (critério de aceite)
### Cenários obrigatórios
1. **Scroll lento contínuo**: vídeo acompanha sem tremor.
2. **Scroll rápido para baixo**: sem piscadas fortes/fallback aparente.
3. **Scroll rápido para cima (reverse scrub)**: sem travamentos perceptíveis.
4. **Para e retoma scroll**: CPU estabiliza parado; retomada suave.
5. **Entrada em Projetos**: fade gradual e sem corte seco.
6. **Mobile viewport**: comportamento equivalente, sem regressão no CTA/conteúdo.

### Evidências esperadas
- Sem erros de console ligados ao vídeo.
- Sem freeze visual prolongado (>200–300ms) durante scrub.
- Transição de seção perceptivelmente suave.

## Riscos e mitigação
- **Risco**: vídeo fonte não ideal para scrub por frame-accurate seeking.  
  **Mitigação**: etapa opcional de re-encode com GOP curto.
- **Risco**: devices low-end ainda sofrerem em scroll extremo.  
  **Mitigação**: aumentar epsilon e limitar frequência efetiva de seek.

## Resultado esperado após implementação
- Hero com scrub muito mais estável (sem sensação de “fallback”).
- Uso de CPU menor quando o usuário está parado.
- Transição Hero -> Projetos consistente e cinematográfica.
