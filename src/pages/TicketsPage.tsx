import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Ticket, User, LogOut, Plus, Minus, RefreshCw } from 'lucide-react';

interface Transacao {
  id: number;
  tipo: 'ganho' | 'gasto';
  quantidade: number;
  descricao: string;
  data: Date;
}

interface TicketsPageProps {
  user: FirebaseUser;
}

const TicketsPage: React.FC<TicketsPageProps> = ({ user }) => {
  const [tickets, setTickets] = useState<number>(5); // Quantidade inicial de tickets
  const [transacoes, setTransacoes] = useState<Transacao[]>([
    { id: 1, tipo: 'ganho', quantidade: 5, descricao: 'Tickets iniciais', data: new Date() },
  ]);

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const adicionarTransacao = (tipo: 'ganho' | 'gasto', quantidade: number, descricao: string): void => {
    const novaTransacao: Transacao = {
      id: Date.now(),
      tipo,
      quantidade,
      descricao,
      data: new Date()
    };

    setTransacoes([novaTransacao, ...transacoes]);
    
    if (tipo === 'ganho') {
      setTickets(tickets + quantidade);
    } else {
      setTickets(Math.max(0, tickets - quantidade)); // Não permitir tickets negativos
    }
  };

  const getMatricula = (): string => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Usuário';
  };

  const formatarData = (data: Date): string => {
    return data.toLocaleDateString('pt-BR');
  };

  const formatarHora = (data: Date): string => {
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="tickets-page">
      <div className="tickets-container">
        <header className="tickets-header">
          <div className="user-info">
            <User size={24} />
            <div>
              <h2>Olá, {getMatricula()}</h2>
              <p>Feira Cotemig</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
          </button>
        </header>

        <div className="tickets-balance">
          <div className="balance-card">
            <Ticket size={40} className="balance-icon" />
            <div className="balance-info">
              <h3>Seus Tickets</h3>
              <span className="balance-amount">{tickets}</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <button 
            className="action-button gain"
            onClick={() => adicionarTransacao('ganho', 1, 'Ticket recebido')}
          >
            <Plus size={20} />
            Receber
          </button>
          <button 
            className="action-button spend"
            onClick={() => adicionarTransacao('gasto', 1, 'Ticket usado')}
            disabled={tickets <= 0}
          >
            <Minus size={20} />
            Usar
          </button>
        </div>

        <div className="transactions-section">
          <div className="section-header">
            <h3>Histórico de Transações</h3>
            <RefreshCw size={18} />
          </div>
          
          <div className="transactions-list">
            {transacoes.length === 0 ? (
              <div className="empty-state">
                <Ticket size={48} />
                <p>Nenhuma transação ainda</p>
              </div>
            ) : (
              transacoes.map((transacao) => (
                <div key={transacao.id} className={`transaction-item ${transacao.tipo}`}>
                  <div className="transaction-icon">
                    {transacao.tipo === 'ganho' ? <Plus size={16} /> : <Minus size={16} />}
                  </div>
                  <div className="transaction-details">
                    <h4>{transacao.descricao}</h4>
                    <p>{formatarData(transacao.data)} às {formatarHora(transacao.data)}</p>
                  </div>
                  <div className={`transaction-amount ${transacao.tipo}`}>
                    {transacao.tipo === 'ganho' ? '+' : '-'}{transacao.quantidade}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;