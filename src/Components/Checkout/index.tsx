import {useContext, useEffect, useState} from 'react';
import { TransactionsContext } from '../../Contexts/Transactions';
import IDGenerator from '../../Utils/IDGenerator';
import PointsCalculator from '../../Utils/PointsCalculator';
import InputField from '../InputField';

export default function Checkout() {
  const [price, setPrice] = useState('');
  const [customer, setCustomer] = useState(IDGenerator.generate('Customer 0'));
  const {addTransaction, getTransactions} = useContext(TransactionsContext);
  const [rewards, setRewards] = useState(0)

  useEffect(() => {
    let updatedRewards = 0;

    getTransactions().filter(t => t.customer === customer).forEach((t) => {
      updatedRewards += PointsCalculator.calculate(t.value);
    });

    setRewards(updatedRewards);
  }, [rewards, customer, getTransactions]);

  const handleSubmit = () => {
    const value = parseInt(price, 10);
    if (!isNaN(value)) {
      addTransaction({customer, id: IDGenerator.generate(), value})
    }
  };

  const handleChange = (text: string) => {
      setPrice(text);
  };

  const handleCustomerChange = (text: string) => {
	  setCustomer(text);
  }

  return (
    <div className='Checkout'>
      <div className='RewardPoints' data-testid='RewardPoints'>
        Total Points: {rewards}
      </div>
      <InputField
        label='Transaction Price'
        pattern='[0-9]*'
        value={price}
        placeholder='Enter transaction price'
        onChange={handleChange}
        testID='TransactionAmount'
      />
	    <InputField label='Customer ID' value={customer} placeholder='Enter Customer ID' testID='CustomerID' onChange={handleCustomerChange} />
      <input type='button' value='Order Now' onClick={handleSubmit} data-testid='SubmitTransaction' />
    </div>
  );
}
