export const translations = {
  pt: {
    navbar: {
      home: 'INÍCIO',
      services: 'CAPACIDADES',
      work: 'PROJETOS',
      about: 'OPERADOR',
      contact: 'CONTATO',
    },
    hero: {
      badge: 'SISTEMA ONLINE // V2.0',
      title: 'CODIM DEV',
      typewriter: [
        [
          {
            text: 'Engenharia',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'de',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Software',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
        ],
        [
          { text: '&', className: 'text-crimson font-mono text-sm md:text-xl' },
          {
            text: 'Automação',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Industrial.',
            className: 'text-crimson font-mono text-sm md:text-xl',
          },
        ],
      ],
      description:
        'Transformo complexidade em sistemas autônomos. Da identidade visual ao banco de dados, construo infraestruturas digitais que unem a lógica da engenharia com a estética do design industrial.',
      cta_primary: 'ACESSAR MÓDULOS',
      cta_secondary: 'VER STACK TÉCNICA',
    },
    system_status: {
      online: 'SISTEMA: ONLINE',
      server: 'SERVIDOR: ATIVO',
      build: 'BUILD ESTÁVEL',
    },
    featured_work: {
      title: 'IMPLANTAÇÕES RECENTES',
      subtitle: 'Sistemas em operação e arquiteturas entregues.',
      projects: {
        kraflo: {
          title: 'SaaS de Manutenção Industrial',
          description:
            'Sistema de gestão de torque e preventivas para indústrias pesadas.',
        },
        neural: {
          title: 'Agentes de CRM Autônomos',
          description:
            'Fluxos de n8n para automação de vendas e atendimento via WhatsApp.',
        },
        codim: {
          title: 'Identidade Visual High-End',
          description: 'Design System completo e Brand Book para tecnologia.',
        },
      },
      view_all: 'ACESSAR ARQUIVO COMPLETO DE PROJETOS',
    },
    about: {
      hero: {
        access_file: '// ACESSANDO ARQUIVO DE PESSOAL: 001',
        title: 'O OPERADOR',
        subtitle: 'ZACARIAS LINO // ENG. DE SOFTWARE FULL-STACK',
        description:
          'De Mecânico Industrial a Arquiteto de Software. Unindo a precisão do chão de fábrica com a escalabilidade do código. Hoje, aplico essa mentalidade de engenharia na CODIM DEV. Especialista em criar ecossistemas digitais que funcionam sozinhos, utilizando Python para lógica robusta e Automação Inteligente com n8n e Supabase.',
      },
      timeline_title: 'LOGS DO SISTEMA: TRAJETÓRIA',
      timeline: {
        t1_title: 'Inicialização (2006)',
        t1_desc:
          'Primeiro contato com hardware aos 13 anos. Montagem de computadores e o início do fascínio pela lógica binária.',

        t2_title: 'A Forja Industrial (2014-2016)',
        t2_desc:
          'SANTOS CMI: Montador de Máquinas. Atuação crítica na montagem e alinhamento de Turbinas a Gás em Siderúrgica.',

        t3_title: 'Operação Polivalente (2020-2023)',
        t3_desc:
          'FIAÇÃO FIO PURO: Operador Industrial. Controle de qualidade rigoroso e operação de maquinário têxtil complexo.',

        t4_title: 'Missões Críticas (2024)',
        t4_desc:
          'ENESA ENGENHARIA: Montagem de precipitadores eletrostáticos em planta de Papel e Celulose. Trabalho de alta precisão.',

        t5_title: 'Reboot do Sistema (2023-2025)',
        t5_desc:
          'Certificações Técnicas: OneBitCode (Full Stack), Adobe (Design) e IBQP (Técnico Mecânica).',

        t6_title: 'Processamento Paralelo (Atual)',
        t6_desc:
          'KARSTEN S.A.: Mecânico de Produção I (Teares) + Engenharia de Software na CODIM DEV (Freelancer).',
      },
      certificates: {
        title: 'PROTOCOLOS CERTIFICADOS',
        subtitle: 'Upgrades de sistema e habilitações técnicas.',
        groups: [
          {
            id: '01',
            category: 'CORE DEV STACK',
            icon: 'Code2',
            items: [
              'JavaScript I',
              'HTML5 & CSS3 Moderno',
              'Sass & Bootstrap',
              'React (Em progresso)',
            ],
          },
          {
            id: '02',
            category: 'INTELLIGENCE UNIT',
            icon: 'BrainCircuit',
            items: [
              'Python I',
              'Engenharia de Prompt (ChatGPT)',
              'Fundamentos de IA',
              'Automação',
            ],
          },
          {
            id: '03',
            category: 'VISUAL ENGINEERING',
            icon: 'PenTool',
            items: [
              'Adobe Photoshop (Avançado)',
              'Adobe Illustrator (Avançado)',
              'UI/UX Design',
            ],
          },
          {
            id: '04',
            category: 'HARDWARE & OPS',
            icon: 'Wrench',
            items: [
              'Técnico em Mecânica Industrial',
              'Planejamento de Projetos',
              'Pacote Office',
            ],
          },
        ],
      },
    },
    services: {
      header: {
        badge: '// Documentação Técnica',
        title: 'CAPACIDADES',
        title_highlight: 'OPERACIONAIS',
        description:
          'Arquitetura detalhada dos módulos de serviço. Da concepção visual à automação backend.',
      },
      blocks: {
        fullstack: {
          badge: '[ARQ: ROBUSTA]',
          title: 'Desenvolvimento de Aplicações Críticas',
          p1: 'Minha abordagem ao desenvolvimento é herdada do chão de fábrica: sistemas não podem falhar. Utilizo Next.js para interfaces de alta performance e Supabase para gestão de dados em tempo real.',
          p2: 'O foco não é apenas "entregar um site", mas construir uma arquitetura escalável que suporte o crescimento do seu negócio.',
          list: [
            'Painéis Administrativos (Dashboards)',
            'SaaS (Software as a Service)',
            'Integração de APIs Rest/GraphQL',
          ],
        },
        automation: {
          badge: '[FLUXO: AUTOMATIZADO]',
          title: 'Orquestração de Processos com IA',
          p1: 'Elimino o trabalho manual conectando sistemas isolados. Utilizo n8n e scripts Python para criar fluxos autônomos que integram CRM, WhatsApp e Bancos de Dados.',
          p2: 'Imagine um "funcionário digital" que trabalha 24/7 sem erros, classificando leads, enviando propostas e atualizando planilhas.',
        },
        design: {
          badge: '[UI: PRECISÃO]',
          title: 'Identidade Visual Industrial',
          p1: 'Design que transmite autoridade técnica. Criação de Brand Books e Interfaces (UI/UX) que unem a estética industrial com a usabilidade digital.',
          p2: 'Não faço apenas "bonito". Faço interfaces funcionais, com hierarquia de informação clara inspirada em painéis de controle e documentação técnica.',
        },
      },
      cta: {
        title: 'Seu sistema precisa de um upgrade?',
        subtitle: 'Vamos discutir a arquitetura do seu próximo projeto.',
        button: 'INICIAR DIAGNÓSTICO',
      },
    },
    work: {
      header: {
        badge: '// NÍVEL DE ACESSO: PÚBLICO',
        title: 'SISTEMAS IMPLANTADOS',
        description: 'Estudos de caso de arquitetura, automação e design.',
      },
      projects: {
        kraflo: {
          title: 'KRAFLO // CMS de Manutenção',
          description:
            'Desenvolvimento de um SaaS completo para gestão de manutenção industrial. O desafio era digitalizar o cálculo de torque e as ordens de serviço de uma planta fabril.',
        },
        agents: {
          title: 'Agentes de CRM Autônomos',
          description:
            'Orquestração de vendas via n8n e OpenAI. O sistema recebe leads, qualifica via IA e agenda reuniões automaticamente, eliminando 90% do trabalho manual da equipe comercial.',
        },
        identity: {
          title: 'Sistema de Identidade Industrial',
          description:
            'Criação de uma linguagem visual proprietária para empresa de tecnologia. Desenvolvimento de Brand Book, UI Kit e Assets 3D que unem a estética cyberpunk com a engenharia civil.',
        },
      },
      minor_projects: {
        title: 'MÓDULOS EXPERIMENTAIS',
        subtitle: '// PROTÓTIPOS_E_SCRIPTS',
        items: [
          {
            title: 'Script de Web Scraping',
            description: 'Automação de extração de dados com Python.',
          },
          {
            title: 'Landing Page Salão de Beleza',
            description: 'Página de alta conversão para negócios locais.',
          },
          {
            title: 'Bot de Telegram',
            description: 'Bot para automação de atendimento e notificações.',
          },
        ],
      },
      cta: {
        title: 'Tem um problema complexo para resolver?',
        button: 'INICIAR ANÁLISE DE PROJETO',
      },
    },
    contact: {
      title: 'CANAIS DE',
      title_highlight: 'COMUNICAÇÃO',
      location: 'Blumenau, SC // Hub Tecnológico Industrial',
      availability:
        'Disponível para projetos Freelancer e Consultoria Industrial.',
      form: {
        header_badge: 'PROTOCOLO_TRANSMISSÃO_SEGURO',
        label_name: 'IDENTIFICAÇÃO (NOME)',
        placeholder_name: 'IDENTIFIQUE-SE',
        label_email: 'ENDEREÇO DE RETORNO (EMAIL)',
        placeholder_email: 'INSIRA_FREQUÊNCIA (EMAIL)',
        label_message: 'CARGA DE DADOS (MENSAGEM)',
        placeholder_message: 'INICIAR TRANSFERÊNCIA DE DADOS...',
        button: 'TRANSMITIR DADOS >',
      },
    },
    cta_global: {
      button: 'INICIAR PROTOCOLO',
    },
  },
  en: {
    navbar: {
      home: 'HOME',
      services: 'MODULES',
      work: 'PROJECTS',
      about: 'OPERATOR',
      contact: 'CONTACT',
    },
    hero: {
      badge: 'SYSTEM ONLINE // V2.0',
      title: 'CODIM DEV',
      typewriter: [
        [
          {
            text: 'Software',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Engineering',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
        ],
        [
          { text: '&', className: 'text-crimson font-mono text-sm md:text-xl' },
          {
            text: 'Industrial',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Automation.',
            className: 'text-crimson font-mono text-sm md:text-xl',
          },
        ],
      ],
      description:
        'Transforming complexity into autonomous systems. From visual identity to databases, I build digital infrastructures that unite engineering logic with industrial design aesthetics.',
      cta_primary: 'ACCESS MODULES',
      cta_secondary: 'VIEW TECH STACK',
    },
    system_status: {
      online: 'SYSTEM: ONLINE',
      server: 'SERVER: ACTIVE',
      build: 'BUILD STABLE',
    },
    featured_work: {
      title: 'RECENT DEPLOYMENTS',
      subtitle: 'Deployed systems and architecture.',
      projects: {
        kraflo: {
          title: 'Industrial Maintenance SaaS',
          description:
            'Torque management and preventive maintenance system for heavy industries.',
        },
        neural: {
          title: 'Autonomous CRM Agents',
          description:
            'n8n flows for sales automation and WhatsApp customer service.',
        },
        codim: {
          title: 'High-End Visual Identity',
          description: 'Complete Design System and Brand Book for technology.',
        },
      },
      view_all: 'ACCESS COMPLETE PROJECT ARCHIVE',
    },
    about: {
      hero: {
        access_file: '// ACCESSING PERSONNEL FILE: 001',
        title: 'THE OPERATOR',
        subtitle: 'ZACARIAS LINO // FULL-STACK ENGINEER',
        description:
          'From Industrial Mechanic to Software Architect. Uniting factory floor precision with code scalability. Today, I apply this engineering mindset at CODIM DEV. Specialist in creating digital ecosystems that run themselves, using Python for robust logic and Intelligent Automation with n8n and Supabase.',
      },
      timeline_title: 'SYSTEM LOGS: TRAJECTORY',
      timeline: [
        {
          year: '2006',
          title: 'Initialization (13 Years Old)',
          subtitle: 'The First Hardware',
          description:
            "At 13, I built my first computer. The fascination with binary logic was immediate. The desire to study Computer Science existed, but budget constraints forced a detour. The system entered 'Sleep Mode', but the kernel remained active.",
        },
        {
          year: '2011',
          title: 'The Industrial Forge',
          subtitle: 'Manual Override (18 Years Old)',
          description:
            'At 18, reality demanded action. I joined the factory floor as a helper. It was the start of a decade-long career in Heavy Industrial Mechanics (Passaúra, Santos CMI). I learned in practice how large systems work under pressure.',
          tags: ['Factory Floor', 'Resilience'],
        },
        {
          year: '2014-2016',
          title: 'Precision Protocol',
          subtitle: 'Turbines & Steelworks',
          description:
            'Working on critical gas turbine assembly and steelworks maintenance. Where a millimeter error can cost millions. This experience shaped my professional character: the obsessive search for precision and zero tolerance for failure.',
          tags: ['Gas Turbines', 'Zero Tolerance'],
        },
        {
          year: '2023',
          title: 'System Reboot (Transition)',
          subtitle: 'Return to Code',
          description:
            'With stability achieved, I reactivated the original protocol. Heavy investment in Full-Stack training (OneBitCode), Design, and AI. Mechanical logic was finally translated into JavaScript, Python, and Automation.',
          tags: ['OneBitCode', 'Python', 'Sass'],
        },
        {
          year: 'CURRENT',
          title: 'Parallel Processing (Current)',
          subtitle: 'Hybrid Operation (Mechanic + Dev)',
          description:
            "Currently operating in 'Dual-Core'. I maintain industrial looms' precision at Karsten during the day and build complex software like CODIM DEV in free cycles. This dual life gives me a unique advantage: I solve real physical world problems using digital solutions.",
          tags: ['Dual-Core', 'Karsten', 'CODIM DEV'],
        },
      ],
      certificates: {
        title: 'CERTIFIED PROTOCOLS',
        subtitle: 'System upgrades and technical qualifications.',
        groups: [
          {
            id: '01',
            category: 'CORE DEV STACK',
            icon: 'Code2',
            items: [
              'JavaScript I',
              'HTML5 & Modern CSS3',
              'Sass & Bootstrap',
              'React (In Progress)',
            ],
          },
          {
            id: '02',
            category: 'INTELLIGENCE UNIT',
            icon: 'BrainCircuit',
            items: [
              'Python I',
              'Prompt Engineering (ChatGPT)',
              'AI Fundamentals',
              'Automation',
            ],
          },
          {
            id: '03',
            category: 'VISUAL ENGINEERING',
            icon: 'PenTool',
            items: [
              'Adobe Photoshop (Advanced)',
              'Adobe Illustrator (Advanced)',
              'UI/UX Design',
            ],
          },
          {
            id: '04',
            category: 'HARDWARE & OPS',
            icon: 'Wrench',
            items: [
              'Industrial Mechanics Technician',
              'Project Planning',
              'Microsoft Office',
            ],
          },
        ],
      },
    },
    services: {
      header: {
        badge: '// Technical Documentation',
        title: 'OPERATIONAL',
        title_highlight: 'CAPABILITIES',
        description:
          'Detailed service architecture. From visual conception to backend automation.',
      },
      blocks: {
        fullstack: {
          badge: '[ARCH: ROBUST]',
          title: 'Critical Application Development',
          p1: 'My approach to development is inherited from the factory floor: systems cannot fail. I use Next.js for high-performance interfaces and Supabase for real-time data management.',
          p2: 'The focus is not just "delivering a site", but building a scalable architecture that supports your business growth.',
          list: [
            'Administrative Dashboards',
            'SaaS (Software as a Service)',
            'Rest/GraphQL API Integration',
          ],
        },
        automation: {
          badge: '[FLOW: AUTOMATED]',
          title: 'Process Orchestration with AI',
          p1: 'I eliminate manual work by connecting isolated systems. I use n8n and Python scripts to create autonomous flows that integrate CRM, WhatsApp, and Databases.',
          p2: 'Imagine a "digital employee" working 24/7 without errors, classifying leads, sending proposals, and updating spreadsheets.',
        },
        design: {
          badge: '[UI: PRECISION]',
          title: 'Industrial Visual Identity',
          p1: 'Design that conveys technical authority. Creation of Brand Books and Interfaces (UI/UX) that unite industrial aesthetics with digital usability.',
          p2: 'I don\'t just do "pretty". I make functional interfaces, with clear information hierarchy inspired by control panels and technical documentation.',
        },
      },
      cta: {
        title: 'Does your system need an upgrade?',
        subtitle: "Let's discuss the architecture of your next project.",
        button: 'INITIATE DIAGNOSIS',
      },
    },
    work: {
      header: {
        badge: '// ACCESS LEVEL: PUBLIC',
        title: 'DEPLOYED SYSTEMS',
        description:
          'Case studies of software architecture, automation, and industrial design.',
      },
      projects: {
        kraflo: {
          title: 'KRAFLO // Maintenance CMS',
          description:
            'Development of a complete SaaS for industrial maintenance management. The challenge was to digitize torque calculation and service orders for a factory plant.',
        },
        agents: {
          title: 'Autonomous CRM Agents',
          description:
            'Sales orchestration via n8n and OpenAI. The system receives leads, qualifies via AI, and schedules meetings automatically, eliminating 90% of manual work for the sales team.',
        },
        identity: {
          title: 'Industrial Identity System',
          description:
            'Creation of a proprietary visual language for a technology company. Development of Brand Book, UI Kit, and 3D Assets that unite cyberpunk aesthetics with civil engineering.',
        },
      },
      minor_projects: {
        title: 'EXPERIMENTAL MODULES',
        subtitle: '// PROTOTYPES_AND_SCRIPTS',
        items: [
          {
            title: 'Web Scraping Script',
            description: 'Data extraction automation with Python.',
          },
          {
            title: 'Beauty Salon Landing Page',
            description: 'High-conversion page for local businesses.',
          },
          {
            title: 'Telegram Bot',
            description: 'Bot for service automation and notifications.',
          },
        ],
      },
      cta: {
        title: 'Have a complex problem to solve?',
        subtitle: "Let's discuss the architecture of your next project.",
        button: 'INITIATE PROJECT ANALYSIS',
      },
    },
    contact: {
      title: 'COMMUNICATION',
      title_highlight: 'CHANNELS',
      location: 'Blumenau, SC // Industrial Tech Hub',
      availability:
        'Available for Freelance projects and Industrial Consulting.',
      form: {
        header_badge: 'SECURE_TRANSMISSION_PROTOCOL',
        label_name: 'IDENTIFICATION (NAME)',
        placeholder_name: 'IDENTIFY YOURSELF',
        label_email: 'RETURN ADDRESS (EMAIL)',
        placeholder_email: 'ENTER_FREQUENCY (EMAIL)',
        label_message: 'DATA PAYLOAD (MESSAGE)',
        placeholder_message: 'INITIATE DATA TRANSFER...',
        button: 'TRANSMIT DATA >',
      },
    },
    cta_global: {
      button: 'START PROTOCOL',
    },
  },
}
