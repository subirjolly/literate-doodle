import {createContext, FC, useState} from 'react';
import MOCKED_TRANSACTIONS from '../TransactionsData';
import {Customer, Transaction, UUID} from '../Types';
import IDGenerator from '../Utils/IDGenerator';

interface CustomersContextType {
  addCustomer: () => Customer;
  getCustomers: () => Array<Customer>;
  getCurrentCustomer: () => Customer;
  setCurrentCustomer: (customer: Customer) => void
}

const DEFAULT_CONTEXT = {
  addCustomer: () => '',
  getCustomers: () => [],
  getCurrentCustomer: () => '',
  setCurrentCustomer: (_: Customer) => '',
};

export const CustomersContext = createContext<CustomersContextType>(DEFAULT_CONTEXT);
const mockedCustomers = MOCKED_TRANSACTIONS.reduce((acc: any, cur: Transaction) => {
  if (!acc[cur.customer]) {
    acc[cur.customer] = true;
  }
  return acc;
}, {})

const CustomersProvider: FC = ({children}) => {
  const [customers, setCustomers] = useState<Array<Customer>>(Object.keys(mockedCustomers));
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0]);

  const getCustomers = () => {
    return customers;
  };

  const addCustomer = (): UUID => {
    const customerID = IDGenerator.generate(`Customer ${customers.length}`);
    customers.push(customerID);

    setCustomers([...customers])

    return customerID;
  };

  const getCurrentCustomer = () => {
    return selectedCustomer;
  }

  const setCurrentCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  }

  console.log(customers.length)
  return (
    <CustomersContext.Provider
      value={{
        addCustomer,
        getCustomers,
        getCurrentCustomer,
        setCurrentCustomer
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;
