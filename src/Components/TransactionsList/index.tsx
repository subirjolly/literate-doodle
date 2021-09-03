import {useContext} from 'react';
import {TransactionsContext} from '../../Contexts/Transactions';
import {CellValue, Column} from '../../Types';
import Table from '../Table';

export default function TransactionsList() {
  const {getTransactions} = useContext(TransactionsContext);

  const getRows = (): Array<Array<CellValue>> => {
    return getTransactions().map((t): Array<CellValue> => {
      return [
        {
          column: 'customer',
          value: t.customer,
        },
        {
          column: 'transaction',
          value: t.id,
        },
        {
          column: 'price',
          value: t.value,
        },
      ];
    });
  };

  const getColumns = (): Array<Column> => {
    return [
      {
        id: 'customer',
        title: 'Customer',
      },
      {
        id: 'transaction',
        title: 'Transaction',
      },
      {
        id: 'price',
        title: 'Price',
      },
    ];
  };

  return (
    <div className='CustomerRewards'>
      <Table columns={getColumns()} rows={getRows()} />
    </div>
  );
}
