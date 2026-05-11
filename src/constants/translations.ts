export const translations = {
  pt: {
    navbar: {
      home: 'INÍCIO',
      services: 'MÓDULOS',
      work: 'IMPLANTAÇÕES',
      about: 'OPERADOR',
      contact: 'DIAGNÓSTICO',
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
            text: 'Operacional',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Aplicada',
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
            text: 'Enxuta.',
            className: 'text-crimson font-mono text-sm md:text-xl',
          },
        ],
      ],
      description:
        'Sistemas enxutos, automações e ferramentas operacionais para empresas que precisam de mais controle, velocidade e menos retrabalho.',
      cta_primary: 'AGENDAR DIAGNÓSTICO',
      cta_secondary: 'VER METODOLOGIA',
    },
    system_status: {
      online: 'SISTEMA: ONLINE',
      server: 'SERVIDOR: ATIVO',
      build: 'BUILD ESTÁVEL',
    },
    featured_work: {
      title: 'IMPLANTAÇÕES RECENTES',
      subtitle: 'Sistemas em operação e gargalos resolvidos.',
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
          title: 'Dashboard Operacional',
          description: 'Painel de controle interno com dados em tempo real.',
        },
      },
      view_all: 'ACESSAR ARQUIVO COMPLETO DE IMPLANTAÇÕES',
    },
    about: {
      hero: {
        access_file: '// ACESSANDO ARQUIVO DE PESSOAL: 001',
        title: 'O OPERADOR',
        subtitle: 'ZACARIAS LINO // ENG. OPERACIONAL & AUTOMAÇÃO',
        description:
          'De Mecânico Industrial a Engenheiro de Automação. Unindo a precisão do chão de fábrica com a velocidade do código. Hoje, na CODIM DEV, resolvo gargalos operacionais específicos com automação enxuta, dashboards sob medida e bots que trabalham 24/7, usando Python, n8n e Supabase.',
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
          'KARSTEN S.A.: Mecânico de Produção I (Teares) + Engenharia Operacional na CODIM DEV (Freelancer).',
      },
      certificates: {
        title: 'PROTOCOLOS CERTIFICADOS',
        subtitle: 'Upgrades de sistema e habilitações técnicas.',
        groups: [
          {
            id: '01',
            category: 'AUTOMAÇÃO & FLUXOS',
            icon: 'BrainCircuit',
            items: [
              'Python I',
              'Engenharia de Prompt (ChatGPT)',
              'n8n & Automação de Processos',
              'Fundamentos de IA',
            ],
          },
          {
            id: '02',
            category: 'CORE DEV STACK',
            icon: 'Code2',
            items: [
              'JavaScript I',
              'HTML5 & CSS3 Moderno',
              'React (Em progresso)',
              'Supabase & PostgreSQL',
            ],
          },
          {
            id: '03',
            category: 'DASHBOARDS & UI',
            icon: 'PenTool',
            items: [
              'Adobe Photoshop (Avançado)',
              'Adobe Illustrator (Avançado)',
              'UI/UX para Painéis Operacionais',
            ],
          },
          {
            id: '04',
            category: 'HARDWARE & OPS',
            icon: 'Wrench',
            items: [
              'Técnico em Mecânica Industrial',
              'Planejamento de Projetos',
              'Controle de Processos',
            ],
          },
        ],
      },
    },
    services: {
      header: {
        badge: '// Documentação Técnica',
        title: 'MÓDULOS',
        title_highlight: 'OPERACIONAIS',
        description:
          'Soluções enxutas para eliminar gargalos reais. Sem complexidade desnecessária.',
      },
      blocks: {
        automation: {
          badge: '[FLUXO: AUTOMATIZADO]',
          title: 'Automação de Processos & Fluxos',
          p1: 'Elimino gargalos operacionais conectando sistemas isolados. Utilizo n8n e scripts Python para criar fluxos autônomos que integram CRM, WhatsApp e Bancos de Dados.',
          p2: 'O resultado é um ecossistema enxuto que trabalha 24/7 sem erros, eliminando retrabalho e devolvendo tempo para a equipe focar no que importa.',
        },
        fullstack: {
          badge: '[SIS: INTERNO]',
          title: 'Sistemas Internos & Dashboards',
          p1: 'Construo ferramentas internas sob medida: dashboards operacionais, painéis administrativos e controles de produção. Utilizo Supabase para dados em tempo real e React para interfaces responsivas.',
          p2: 'O foco não é "entregar um site", mas dar visibilidade e controle real sobre a operação do negócio.',
          list: [
            'Dashboards Operacionais & Painéis de Controle',
            'Controles de Produção Enxutos',
            'Integração de Dados em Tempo Real (Supabase)',
          ],
        },
        design: {
          badge: '[BOT: ATIVO]',
          title: 'Bots & Agentes Operacionais',
          p1: 'Bots para Telegram, WhatsApp e sistemas internos. Centralização de despacho, alertas em tempo real e atendimento automatizado.',
          p2: 'Não é chatbot genérico. É um agente operacional que recebe dados, processa e executa ações concretas na sua operação.',
        },
      },
      cta: {
        title: 'Tem um gargalo operacional para resolver?',
        subtitle: 'Vamos diagnosticar e projetar a solução enxuta certa.',
        button: 'AGENDAR DIAGNÓSTICO',
      },
    },
    work: {
      header: {
        badge: '// NÍVEL DE ACESSO: PÚBLICO',
        title: 'SISTEMAS IMPLANTADOS',
        description: 'Gargalos resolvidos. Operações otimizadas.',
      },
      projects: {
        kraflo: {
          title: 'KRAFLO // CMMS Industrial',
          description:
            'Desenvolvimento de um SaaS completo para gestão de manutenção industrial. Digitalização do cálculo de torque e ordens de serviço de planta fabril.',
        },
        agents: {
          title: 'Agentes de CRM Autônomos',
          description:
            'Orquestração de vendas via n8n e OpenAI. O sistema recebe leads, qualifica via IA e agenda reuniões automaticamente, eliminando 90% do trabalho manual.',
        },
        identity: {
          title: 'Dashboard Operacional Interno',
          description:
            'Painel de controle em tempo real com métricas operacionais, alertas e gestão de fluxos automatizados para equipe de operações.',
        },
      },
      minor_projects: {
        title: 'MÓDULOS EXPERIMENTAIS',
        subtitle: '// PROTÓTIPOS_E_SCRIPTS',
        items: [
          {
            title: 'Bot Operacional (Telegram/WhatsApp)',
            description: 'Centralização de despacho e alertas em tempo real.',
          },
          {
            title: 'Workflow de Integração Supabase',
            description: 'Automação e processamento de rotinas de banco de dados.',
          },
          {
            title: 'Relatórios & Dashboards Dinâmicos',
            description: 'Visualização gerencial com dados em tempo real.',
          },
        ],
      },
      cta: {
        title: 'Tem um gargalo operacional para resolver?',
        subtitle: 'Vamos diagnosticar e projetar a solução enxuta certa.',
        button: 'AGENDAR DIAGNÓSTICO',
      },
    },
    contact: {
      title: 'CANAIS DE',
      title_highlight: 'DIAGNÓSTICO',
      location: 'Blumenau, SC // Hub de Engenharia Operacional',
      availability:
        'Disponível para projetos de automação, sistemas internos e engenharia operacional.',
      form: {
        header_badge: 'PROTOCOLO_DIAGNÓSTICO_OPERACIONAL',
        label_name: 'IDENTIFICAÇÃO (NOME)',
        placeholder_name: 'IDENTIFIQUE-SE',
        label_email: 'ENDEREÇO DE RETORNO (EMAIL)',
        placeholder_email: 'INSIRA_FREQUÊNCIA (EMAIL)',
        label_message: 'DESCRIÇÃO DO GARGALO',
        placeholder_message: 'DESCREVA O PROBLEMA OPERACIONAL...',
        button: 'SOLICITAR DIAGNÓSTICO >',
      },
    },
    cta_global: {
      button: 'AGENDAR DIAGNÓSTICO',
    },
  },
  en: {
    navbar: {
      home: 'HOME',
      services: 'MODULES',
      work: 'DEPLOYMENTS',
      about: 'OPERATOR',
      contact: 'DIAGNOSIS',
    },
    hero: {
      badge: 'SYSTEM ONLINE // V2.0',
      title: 'CODIM DEV',
      typewriter: [
        [
          {
            text: 'Applied',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Operational',
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
            text: 'Lean',
            className: 'text-neutral-400 font-mono text-sm md:text-xl',
          },
          {
            text: 'Automation.',
            className: 'text-crimson font-mono text-sm md:text-xl',
          },
        ],
      ],
      description:
        'Lean systems, automation, and operational tools for companies that need more control, speed, and less rework.',
      cta_primary: 'SCHEDULE DIAGNOSIS',
      cta_secondary: 'VIEW METHODOLOGY',
    },
    system_status: {
      online: 'SYSTEM: ONLINE',
      server: 'SERVER: ACTIVE',
      build: 'BUILD STABLE',
    },
    featured_work: {
      title: 'RECENT DEPLOYMENTS',
      subtitle: 'Deployed systems and bottlenecks resolved.',
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
          title: 'Operational Dashboard',
          description: 'Internal control panel with real-time data.',
        },
      },
      view_all: 'ACCESS COMPLETE DEPLOYMENT ARCHIVE',
    },
    about: {
      hero: {
        access_file: '// ACCESSING PERSONNEL FILE: 001',
        title: 'THE OPERATOR',
        subtitle: 'ZACARIAS LINO // OPERATIONAL ENGINEER & AUTOMATION',
        description:
          'From Industrial Mechanic to Automation Engineer. Uniting factory floor precision with code speed. Today, at CODIM DEV, I solve specific operational bottlenecks with lean automation, custom dashboards, and 24/7 bots, using Python, n8n, and Supabase.',
      },
      timeline_title: 'SYSTEM LOGS: TRAJECTORY',
      timeline: {
        t1_title: 'Initialization (2006)',
        t1_desc:
          'First hardware contact at age 13. PC building and the beginning of binary logic fascination.',

        t2_title: 'The Industrial Forge (2014-2016)',
        t2_desc:
          'SANTOS CMI: Machine Assembler. Critical work on Gas Turbines alignment within Steelworks.',

        t3_title: 'Textile Operation (2020-2023)',
        t3_desc:
          'FIAÇÃO FIO PURO: Industrial Operator. Rigorous quality control and complex textile machinery operation.',

        t4_title: 'Critical Missions (2024)',
        t4_desc:
          'ENESA ENGINEERING: Assembly of electrostatic precipitators in Pulp & Paper plant. High-precision work.',

        t5_title: 'System Reboot (2023-2025)',
        t5_desc:
          'Technical Certifications: OneBitCode (Full Stack), Adobe (Design), and IBQP (Mechanical Technician).',

        t6_title: 'Parallel Processing (Current)',
        t6_desc:
          'KARSTEN S.A.: Production Mechanic I (Looms) + Operational Engineering at CODIM DEV (Freelance).',
      },
      certificates: {
        title: 'CERTIFIED PROTOCOLS',
        subtitle: 'System upgrades and technical qualifications.',
        groups: [
          {
            id: '01',
            category: 'AUTOMATION & FLOWS',
            icon: 'BrainCircuit',
            items: [
              'Python I',
              'Prompt Engineering (ChatGPT)',
              'n8n & Process Automation',
              'AI Fundamentals',
            ],
          },
          {
            id: '02',
            category: 'CORE DEV STACK',
            icon: 'Code2',
            items: [
              'JavaScript I',
              'HTML5 & Modern CSS3',
              'React (In Progress)',
              'Supabase & PostgreSQL',
            ],
          },
          {
            id: '03',
            category: 'DASHBOARDS & UI',
            icon: 'PenTool',
            items: [
              'Adobe Photoshop (Advanced)',
              'Adobe Illustrator (Advanced)',
              'UI/UX for Operational Panels',
            ],
          },
          {
            id: '04',
            category: 'HARDWARE & OPS',
            icon: 'Wrench',
            items: [
              'Industrial Mechanics Technician',
              'Project Planning',
              'Process Control',
            ],
          },
        ],
      },
    },
    services: {
      header: {
        badge: '// Technical Documentation',
        title: 'OPERATIONAL',
        title_highlight: 'MODULES',
        description:
          'Lean solutions to eliminate real bottlenecks. No unnecessary complexity.',
      },
      blocks: {
        automation: {
          badge: '[FLOW: AUTOMATED]',
          title: 'Process Automation & Workflows',
          p1: 'I eliminate operational bottlenecks by connecting isolated systems. I use n8n and Python scripts to create autonomous flows that integrate CRM, WhatsApp, and Databases.',
          p2: 'The result is a lean ecosystem working 24/7 without errors, eliminating rework and giving the team time to focus on what matters.',
        },
        fullstack: {
          badge: '[SYS: INTERNAL]',
          title: 'Internal Systems & Dashboards',
          p1: 'I build custom internal tools: operational dashboards, admin panels, and production controls. I use Supabase for real-time data and React for responsive interfaces.',
          p2: 'The focus is not "delivering a site", but giving real visibility and control over business operations.',
          list: [
            'Operational Dashboards & Control Panels',
            'Lean Production Control Systems',
            'Real-Time Data Integration (Supabase)',
          ],
        },
        design: {
          badge: '[BOT: ACTIVE]',
          title: 'Bots & Operational Agents',
          p1: 'Bots for Telegram, WhatsApp, and internal systems. Dispatch centralization, real-time alerts, and automated service.',
          p2: "Not a generic chatbot. It's an operational agent that receives data, processes it, and executes concrete actions in your operation.",
        },
      },
      cta: {
        title: 'Have an operational bottleneck to solve?',
        subtitle: "Let's diagnose and design the right lean solution.",
        button: 'SCHEDULE DIAGNOSIS',
      },
    },
    work: {
      header: {
        badge: '// ACCESS LEVEL: PUBLIC',
        title: 'DEPLOYED SYSTEMS',
        description:
          'Bottlenecks resolved. Operations optimized.',
      },
      projects: {
        kraflo: {
          title: 'KRAFLO // Industrial CMMS',
          description:
            'Development of a complete SaaS for industrial maintenance management. Digitization of torque calculation and service orders for a factory plant.',
        },
        agents: {
          title: 'Autonomous CRM Agents',
          description:
            'Sales orchestration via n8n and OpenAI. The system receives leads, qualifies via AI, and schedules meetings automatically, eliminating 90% of manual work.',
        },
        identity: {
          title: 'Internal Operational Dashboard',
          description:
            'Real-time control panel with operational metrics, alerts, and automated workflow management for the operations team.',
        },
      },
      minor_projects: {
        title: 'EXPERIMENTAL MODULES',
        subtitle: '// PROTOTYPES_AND_SCRIPTS',
        items: [
          {
            title: 'Operational Bot (Telegram/WhatsApp)',
            description: 'Real-time dispatch and alert centralization.',
          },
          {
            title: 'Supabase Integration Workflow',
            description: 'Database automated processing routines.',
          },
          {
            title: 'Dynamic Dashboards & Reports',
            description: 'Management visualization with real-time data.',
          },
        ],
      },
      cta: {
        title: 'Have an operational bottleneck to solve?',
        subtitle: "Let's diagnose and design the right lean solution.",
        button: 'SCHEDULE DIAGNOSIS',
      },
    },
    contact: {
      title: 'DIAGNOSIS',
      title_highlight: 'CHANNELS',
      location: 'Blumenau, SC // Operational Engineering Hub',
      availability:
        'Available for automation, internal systems, and operational engineering projects.',
      form: {
        header_badge: 'OPERATIONAL_DIAGNOSIS_PROTOCOL',
        label_name: 'IDENTIFICATION (NAME)',
        placeholder_name: 'IDENTIFY YOURSELF',
        label_email: 'RETURN ADDRESS (EMAIL)',
        placeholder_email: 'ENTER_FREQUENCY (EMAIL)',
        label_message: 'BOTTLENECK DESCRIPTION',
        placeholder_message: 'DESCRIBE THE OPERATIONAL PROBLEM...',
        button: 'REQUEST DIAGNOSIS >',
      },
    },
    cta_global: {
      button: 'SCHEDULE DIAGNOSIS',
    },
  },
}
