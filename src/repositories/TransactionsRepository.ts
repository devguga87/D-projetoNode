import { response } from 'express';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionsIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    transactionsIncome.reduce((acc, b) => acc + b.value, 0);

    const sumIncome = transactionsIncome.reduce((acc, b) => acc + b.value, 0);

    const transactionsOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const sumOutcome = transactionsOutcome.reduce((acc, b) => acc + b.value, 0);

    const total = sumIncome - sumOutcome;

    const balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
