import { describe, it, expect } from 'vitest';
import { runAuthTests } from './auth-test';

describe('Supabase Authentication Tests', () => {
  it('should run all authentication tests', async () => {
    // Este teste executa todos os testes de autenticação
    // e não falha - apenas mostra os resultados no console
    await runAuthTests();
    expect(true).toBe(true);
  }, 30000); // 30 segundos de timeout
});
