import { useEffect, useState } from 'react';
import { runAuthTests } from '../test/auth-test';

export default function TestAuthPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleRunTests = async () => {
    setIsRunning(true);
    setIsComplete(false);

    try {
      await runAuthTests();
      setIsComplete(true);
    } catch (error) {
      console.error('Erro ao executar testes:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔐 Teste de Autenticação Supabase</h1>

        <div className="bg-card border rounded-lg p-6 mb-6">
          <p className="text-muted-foreground mb-4">
            Este teste verifica:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm mb-6">
            <li>Acesso público (anônimo) - visualizar projetos e inserir leads</li>
            <li>Criação e login de usuário de teste</li>
            <li>Políticas RLS para usuários autenticados</li>
            <li>Acesso ao storage bucket (portfolio-assets)</li>
          </ul>

          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? '⏳ Executando testes...' : '▶️ Executar Testes'}
          </button>

          {isComplete && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-md">
              <p className="text-green-600 dark:text-green-400">
                ✅ Testes concluídos! Verifique o console do navegador (F12) para ver os resultados detalhados.
              </p>
            </div>
          )}
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Instruções</h2>
          <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
            <li>Clique no botão "Executar Testes" acima</li>
            <li>Abra o Console do navegador (pressione F12 → aba Console)</li>
            <li>Observe os resultados coloridos de cada teste</li>
            <li>Verifique se todas as políticas RLS estão funcionando corretamente</li>
          </ol>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm font-mono">
              <strong>Credenciais de teste:</strong><br />
              Email: admin@codimdev.com<br />
              Senha: TestPassword123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
