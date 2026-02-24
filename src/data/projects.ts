export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  challenge: string;
  process: string;
  solution: string;
  result: string;
}

export const projects: Project[] = [
  {
    slug: "ecommerce-luxe",
    title: "Luxe Store",
    description: "E-commerce premium com experiência de compra imersiva e design editorial.",
    tags: ["E-commerce", "UI/UX", "React"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    liveUrl: "https://example.com",
    challenge: "A marca precisava de uma loja online que transmitisse exclusividade e sofisticação, fugindo do visual genérico de e-commerce.",
    process: "Pesquisamos referências em marcas de luxo, criamos moodboards focados em minimalismo e tipografia editorial. Prototipamos 3 versões até chegar no tom certo.",
    solution: "Desenvolvemos um e-commerce com layout editorial, animações de scroll cinematográficas e micro-interações que elevam cada produto a uma experiência.",
    result: "Aumento de 180% no tempo de permanência e 45% na taxa de conversão. A marca ganhou reconhecimento pelo design inovador.",
  },
  {
    slug: "saas-dashboard",
    title: "Analytics Pro",
    description: "Dashboard SaaS com visualizações de dados em tempo real e interface intuitiva.",
    tags: ["SaaS", "Dashboard", "TypeScript"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    liveUrl: "https://example.com",
    challenge: "Transformar dados complexos de analytics em insights visuais que qualquer pessoa pudesse entender instantaneamente.",
    process: "Conduzimos entrevistas com 20+ usuários para mapear as métricas mais relevantes. Iteramos sobre wireframes focando na hierarquia da informação.",
    solution: "Criamos um dashboard com gráficos interativos, filtros inteligentes e um sistema de alertas personalizáveis. Tudo com dark mode nativo.",
    result: "NPS de 92 entre os usuários. Redução de 60% no tempo para encontrar insights críticos. Adotado por 3 empresas Fortune 500.",
  },
  {
    slug: "app-fintech",
    title: "PayFlow",
    description: "Aplicação fintech com fluxos de pagamento simplificados e segurança robusta.",
    tags: ["Fintech", "Mobile-first", "Node.js"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80",
    liveUrl: "https://example.com",
    challenge: "Criar uma experiência de pagamento que fosse tão simples quanto enviar uma mensagem, sem sacrificar a segurança.",
    process: "Mapeamos toda a jornada de pagamento, identificando 7 pontos de fricção. Redesenhamos cada etapa priorizando velocidade e confiança.",
    solution: "Interface com pagamento em 3 toques, autenticação biométrica e feedback visual em tempo real de cada transação.",
    result: "Tempo médio de transação reduzido de 45s para 12s. Zero incidentes de segurança. 50k+ usuários nos primeiros 3 meses.",
  },
  {
    slug: "portal-educacao",
    title: "EduSpark",
    description: "Plataforma educacional com gamificação e aprendizado adaptativo.",
    tags: ["EdTech", "Gamificação", "React"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    liveUrl: "https://example.com",
    challenge: "Engajar estudantes em um ambiente online onde a taxa de abandono chegava a 70% nas primeiras semanas.",
    process: "Estudamos mecânicas de jogos e psicologia comportamental. Testamos diferentes sistemas de recompensa com grupos focais de estudantes.",
    solution: "Plataforma com trilhas de aprendizado personalizadas, sistema de XP e conquistas, e desafios semanais entre turmas.",
    result: "Taxa de conclusão de cursos subiu de 30% para 78%. Engajamento diário aumentou 3x. Premiada como melhor EdTech do ano.",
  },
];
