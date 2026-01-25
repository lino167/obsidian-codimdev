/**
 * Standalone runner para testes de autenticação
 * Execute com: node --loader tsx src/test/run-auth-test.ts
 * OU: npm run dev (e acesse /test-auth no navegador)
 */

import { runAuthTests } from './auth-test';

console.log('🚀 Iniciando testes de autenticação Supabase...\n');

runAuthTests()
  .then(() => {
    console.log('✅ Todos os testes foram executados.\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro ao executar testes:', error);
    process.exit(1);
  });
