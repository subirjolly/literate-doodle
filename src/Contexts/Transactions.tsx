import { createContext, FC, useState } from "react";
import MOCKED_TRANSACTIONS from "../TransactionsData";
import { Transaction, TransactionData, UUID } from "../Types";
import IDGenerator from "../Utils/IDGenerator";

interface TransactionsContextType {
  addTransaction: (transaction: Transaction) => UUID
  getTransactions: () => Array<Transaction>;
}

const DEFAULT_CONTEXT = {
  addTransaction: (_: Transaction) => '',
  getTransactions: () => []
};

export const TransactionsContext = createContext<TransactionsContextType>(
  DEFAULT_CONTEXT
);



const TransactionsProvider: FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Array<Transaction>>(MOCKED_TRANSACTIONS);

  const getTransactions = () => {
    return transactions;
  }

  const addTransaction = (transaction: Transaction): UUID => {
    transaction.id = IDGenerator.generate();

    transactions.push(transaction);
    setTransactions(transactions);

    return transaction.id;
  };

  return (
    <TransactionsContext.Provider
      value={{
        getTransactions,
        addTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
