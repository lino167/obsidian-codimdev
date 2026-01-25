/**
 * Script de teste para autenticação Supabase e políticas RLS
 * Execute com: npm run test
 */

import { supabase } from '../lib/supabase';
import type { Database } from '../../database.types';

// Cores para output do terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg: string) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  section: (msg: string) => console.log(`\n${colors.cyan}━━━ ${msg} ━━━${colors.reset}\n`),
};

// Credenciais de teste (você pode alterar)
const TEST_EMAIL = 'admin@codimdev.com';
const TEST_PASSWORD = 'TestPassword123!';

async function testPublicAccess() {
  log.section('Teste 1: Acesso Público (Anônimo)');

  try {
    // Verificar se existe algum projeto
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(5);

    if (projectsError) {
      log.error(`Erro ao visualizar projetos: ${projectsError.message}`);
    } else {
      log.success(`Visualização de projetos permitida (${projects?.length || 0} projetos)`);
    }

    // Tentar inserir um lead (deve funcionar)
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: 'Teste Anônimo',
        email: 'teste@example.com',
        message: 'Mensagem de teste',
        ip_address: '127.0.0.1',
      })
      .select()
      .single();

    if (leadError) {
      log.error(`Erro ao inserir lead: ${leadError.message}`);
    } else {
      log.success(`Lead inserido com sucesso (ID: ${lead?.id})`);
    }

    // Tentar visualizar leads (NÃO deve funcionar - apenas admin)
    const { data: leadsView, error: leadsViewError } = await supabase
      .from('leads')
      .select('*')
      .limit(1);

    if (leadsViewError) {
      log.success('Visualização de leads bloqueada para anônimos ✓');
    } else if (!leadsView || leadsView.length === 0) {
      log.success('Visualização de leads bloqueada (sem dados) ✓');
    } else {
      log.warning('ATENÇÃO: Usuário anônimo pode ver leads! (política RLS incorreta)');
    }

    // Tentar visualizar finances (NÃO deve funcionar)
    const { data: finances, error: financesError } = await supabase
      .from('finances')
      .select('*')
      .limit(1);

    if (financesError) {
      log.success('Visualização de finances bloqueada para anônimos ✓');
    } else if (!finances || finances.length === 0) {
      log.success('Visualização de finances bloqueada (sem dados) ✓');
    } else {
      log.warning('ATENÇÃO: Usuário anônimo pode ver finances! (política RLS incorreta)');
    }

  } catch (error) {
    log.error(`Erro inesperado: ${error}`);
  }
}

async function testAuthentication() {
  log.section('Teste 2: Criação e Login de Usuário');

  try {
    // Verificar se já existe um usuário autenticado
    const { data: currentUser } = await supabase.auth.getUser();

    if (currentUser?.user) {
      log.info(`Usuário já autenticado: ${currentUser.user.email}`);
      await supabase.auth.signOut();
      log.info('Usuário deslogado para teste limpo');
    }

    // Tentar criar conta (pode falhar se já existir)
    log.info(`Tentando criar conta: ${TEST_EMAIL}`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        log.warning(`Usuário já existe: ${TEST_EMAIL}`);
      } else {
        log.error(`Erro ao criar conta: ${signUpError.message}`);
      }
    } else {
      log.success(`Conta criada: ${signUpData.user?.email}`);

      // Verificar se precisa confirmar email
      if (signUpData.user && !signUpData.user.confirmed_at) {
        log.warning('Email precisa ser confirmado. Verifique seu email ou desabilite confirmação no Supabase.');
      }
    }

    // Fazer login
    log.info('Tentando fazer login...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (signInError) {
      log.error(`Erro ao fazer login: ${signInError.message}`);
      return false;
    } else {
      log.success(`Login realizado: ${signInData.user?.email}`);
      log.info(`Token de acesso: ${signInData.session?.access_token?.substring(0, 20)}...`);
      return true;
    }

  } catch (error) {
    log.error(`Erro inesperado: ${error}`);
    return false;
  }
}

async function testAuthenticatedAccess() {
  log.section('Teste 3: Acesso Autenticado (Admin)');

  try {
    // Criar um projeto
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: 'Projeto de Teste',
        description: 'Projeto criado automaticamente para teste',
        tech_stack: ['React', 'TypeScript', 'Supabase'],
        status: 'dev',
        featured: false,
      })
      .select()
      .single();

    if (projectError) {
      log.error(`Erro ao criar projeto: ${projectError.message}`);
    } else {
      log.success(`Projeto criado com sucesso (ID: ${project?.id})`);
    }

    // Visualizar leads (agora deve funcionar)
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .limit(5);

    if (leadsError) {
      log.error(`Erro ao visualizar leads: ${leadsError.message}`);
    } else {
      log.success(`Leads visualizados com sucesso (${leads?.length || 0} leads)`);
    }

    // Criar registro financeiro
    const { data: finance, error: financeError } = await supabase
      .from('finances')
      .insert({
        title: 'Teste de Receita',
        amount: 1500.00,
        type: 'income',
        category: 'projeto',
        status: 'completed',
      })
      .select()
      .single();

    if (financeError) {
      log.error(`Erro ao criar registro financeiro: ${financeError.message}`);
    } else {
      log.success(`Registro financeiro criado (ID: ${finance?.id})`);
    }

    // Visualizar finances
    const { data: finances, error: financesViewError } = await supabase
      .from('finances')
      .select('*')
      .limit(5);

    if (financesViewError) {
      log.error(`Erro ao visualizar finances: ${financesViewError.message}`);
    } else {
      log.success(`Finances visualizados com sucesso (${finances?.length || 0} registros)`);
    }

  } catch (error) {
    log.error(`Erro inesperado: ${error}`);
  }
}

async function testStorageBucket() {
  log.section('Teste 4: Storage Bucket');

  try {
    // Listar buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      log.error(`Erro ao listar buckets: ${bucketsError.message}`);
    } else {
      const portfolioBucket = buckets.find(b => b.name === 'portfolio-assets');
      if (portfolioBucket) {
        log.success(`Bucket 'portfolio-assets' encontrado`);
        log.info(`  - Público: ${portfolioBucket.public}`);
      } else {
        log.error('Bucket portfolio-assets não encontrado');
      }
    }

    // Tentar criar um arquivo de teste (blob simples)
    const testFile = new Blob(['Teste de upload'], { type: 'text/plain' });
    const fileName = `test/test-${Date.now()}.txt`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(fileName, testFile);

    if (uploadError) {
      log.error(`Erro ao fazer upload: ${uploadError.message}`);
    } else {
      log.success(`Upload realizado: ${uploadData.path}`);

      // Obter URL pública
      const { data: urlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName);

      log.info(`URL pública: ${urlData.publicUrl}`);

      // Deletar arquivo de teste
      await supabase.storage
        .from('portfolio-assets')
        .remove([fileName]);

      log.success('Arquivo de teste removido');
    }

  } catch (error) {
    log.error(`Erro inesperado: ${error}`);
  }
}

async function cleanup() {
  log.section('Limpeza');

  try {
    // Fazer logout
    await supabase.auth.signOut();
    log.success('Logout realizado');

  } catch (error) {
    log.error(`Erro ao fazer cleanup: ${error}`);
  }
}

// Executar todos os testes
export async function runAuthTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🔐 TESTE DE AUTENTICAÇÃO SUPABASE');
  console.log('='.repeat(60));

  await testPublicAccess();

  const isAuthenticated = await testAuthentication();

  if (isAuthenticated) {
    await testAuthenticatedAccess();
    await testStorageBucket();
  }

  await cleanup();

  console.log('\n' + '='.repeat(60));
  console.log('✨ TESTES FINALIZADOS');
  console.log('='.repeat(60) + '\n');
}
