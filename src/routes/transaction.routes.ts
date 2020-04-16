import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return response.json(allTransactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

//
// POST /transactions: A rota deve receber title, value e type dentro do corpo
// da requisição, sendo type o tipo da transação, que deve ser income para entradas
//  (depósitos) e outcome para saidas (retiradas). Ao cadastrar uma nova transação,
//  ela deve ser armazenada dentro de um objeto com o formato como o seguinte:

// {
//   "id": "uuid",
//   "title": "Salário",
//   "value": 3000,
//   "type": "income"
// }
