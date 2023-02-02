import { useCallback, useContext, useEffect, useState } from 'react';
import './index.scss';
import { TransactionsContext } from '../../Contexts/Transactions';
import IDGenerator from '../../Utils/IDGenerator';
import PointsCalculator from '../../Utils/PointsCalculator';
import InputField from '../InputField';
import Dropdown, { DropdownItem } from '../Dropdown';
import { CustomersContext } from '../../Contexts/Customers';
import { Customer } from '../../Types';

export default function Checkout() {
  const [price, setPrice] = useState('');
  const { getCustomers, getCurrentCustomer, setCurrentCustomer, addCustomer } =
    useContext(CustomersContext);
  const { addTransaction, getTransactions } = useContext(TransactionsContext);
  const [rewards, setRewards] = useState(0);
  const customer = getCurrentCustomer();

  useEffect(() => {
    let updatedRewards = 0;

    getTransactions()
      .filter((t) => t.customer === customer)
      .forEach((t) => {
        updatedRewards += PointsCalculator.calculate(t.value);
      });

    setRewards(updatedRewards);
  }, [rewards, customer, getTransactions]);

  const handleSubmit = () => {
    const value = parseInt(price, 10);
    if (!isNaN(value)) {
      addTransaction({ customer, id: IDGenerator.generate(), value });
    }
  };

  const handleChange = (text: string) => {
    setPrice(text);
  };

  const handleDropdownChange = useCallback(
    (item: DropdownItem) => {
      setCurrentCustomer(item.id as Customer);
    },
    [setCurrentCustomer]
  );

  const getCustomersDropdown = useCallback(() => {
    const currentCustomer = getCurrentCustomer();
    const items: DropdownItem[] = getCustomers().map((customer) => {
      return {
        id: customer,
        title: customer,
        selected: customer === currentCustomer,
      } as DropdownItem;
    });

    return (
      <Dropdown
        testID={'CustomerDropdown'}
        title={'Change Customer'}
        items={items}
        onChange={handleDropdownChange}
      />
    );
  }, [getCurrentCustomer, getCustomers, handleDropdownChange]);

  const handleAddCustomer = () => {
    setCurrentCustomer(addCustomer());
  };

  return (
    <div className='Checkout'>
      <div className='RewardPoints' data-testid='RewardPoints'>
        Total Points: {rewards}
      </div>
      <div className='CustomersDropdown'>{getCustomersDropdown()}</div>
      <InputField
        hasFocus={true}
        label='Transaction Price'
        pattern='[0-9]*'
        value={price}
        placeholder='Enter transaction price'
        onChange={handleChange}
        testID='TransactionAmount'
      />
      <input
        type='button'
        value='Order Now'
        onClick={handleSubmit}
        data-testid='SubmitTransaction'
      />
      <input
        type='button'
        value='Add New Customer'
        onClick={handleAddCustomer}
        data-testid='AddCustomer'
      />
    </div>
  );
}
