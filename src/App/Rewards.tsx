import {Link} from 'react-router-dom';
import Checkout from '../Components/Checkout';

export default function RewardsApp() {
  return (
    <div className='RewardsApp'>
      <Checkout />
      <Link to='/history' data-testid='ViewHistory'>
        View History
      </Link>
      <br />
      <Link to='/rewards' data-testid='ViewRewards'>
        View Rewards
      </Link>
    </div>
  );
}
