import {useContext, useState} from 'react';
import {RewardsContext} from '../../Contexts/Rewards';
import PointsCalculator from '../../Utils/PointsCalculator';

export default function Checkout() {
  const [price, setPrice] = useState('');
  const [hasError, setHasError] = useState(false);
  const {addPoints} = useContext(RewardsContext);

  const handleSubmit = () => {
    const value = parseInt(price, 10);
    if (!isNaN(value)) {
      addPoints(PointsCalculator.calculate(value));
    }
  };

  const handleChange = (e: any) => {
    if (e.target.validity.valid) {
      setPrice(e.target.value);
      setHasError(false);
    }
  };

  return (
    <div className='Checkout'>
      <input
        type='text'
        pattern='[0-9]*'
        value={price}
        placeholder='Enter transaction price'
        onChange={handleChange}
        data-testid='TransactionAmount'
        className={hasError ? 'TransactionError' : ''}
      />
      <input type='button' value='Order Now' onClick={handleSubmit} data-testid='SubmitTransaction' />
    </div>
  );
}
