import '../styles.css';
import RewardsApp from './Rewards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TransactionHistory from '../Components/TransactionHistory';
import TransactionsProvider from '../Contexts/Transactions';
import CustomerRewards from '../Components/CustomerRewards';

export default function App() {
  return (
  <div className='App'>
    <Router>
    <Switch>
      <Route path='/history'>
      <TransactionsProvider>
        <TransactionHistory />
      </TransactionsProvider>
      </Route>
      <Route path='/rewards'>
      <TransactionsProvider>
        <CustomerRewards />
      </TransactionsProvider>
      </Route>
      <Route path='/'>
        <TransactionsProvider>
          <RewardsApp />
        </TransactionsProvider>
      </Route>
    </Switch>
    </Router>
  </div>
  );
}
