import { Transaction } from "../Types";
import IDGenerator from "../Utils/IDGenerator";

const buildTransactions = (customers: number, days: number): Array<Transaction> => {
    const transactions = new Array<Transaction>();
    for (var i = 0; i < customers; i++) {
        const customerID = IDGenerator.generate(`Customer ${i}`);
        for (var j = 0 ; j < days; j++) {
            const transaction = {
                customer: customerID,
                id: IDGenerator.generate(),
                value: j + 1
            } as Transaction;

            transactions.push(transaction);
        }
    }

    return transactions;
}

const MOCKED_TRANSACTIONS = buildTransactions(4, 120);

export default MOCKED_TRANSACTIONS;