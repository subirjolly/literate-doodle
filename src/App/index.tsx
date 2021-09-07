import '../styles.css';
import RewardsApp from './Rewards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TransactionHistory from '../Components/TransactionHistory';
import TransactionsProvider from '../Contexts/Transactions';
import CustomerRewards from '../Components/CustomerRewards';
import CustomersProvider from '../Contexts/Customers';

export default function App() {
  return (
  <div className='App'>
    <Router>
    <Switch>
        <Route path='/history'>
      <CustomersProvider>
          <TransactionsProvider>
            <TransactionHistory />
          </TransactionsProvider>
      </CustomersProvider>
        </Route>
        <Route path='/rewards'>
      <CustomersProvider>
          <TransactionsProvider>
            <CustomerRewards />
          </TransactionsProvider>
      </CustomersProvider>
        </Route>
        <Route path='/'>
      <CustomersProvider>
          <TransactionsProvider>
            <RewardsApp />
          </TransactionsProvider>
      </CustomersProvider>
        </Route>
    </Switch>
    </Router>
  </div>
  );
}
