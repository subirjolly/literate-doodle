import { Customer } from "../../../src/Types";
import IDGenerator from "../../../src/Utils/IDGenerator";

export {};

// We can extend cypress to have cy.getByTestID command
const getByTestID = (testID: string | number) => {
  return cy.get(`[data-testid="${testID}"]`);
};

const validateCustomers = (customers: Array<Customer>) => {
  getByTestID('Dropdown--CustomerDropdown').click();
  getByTestID('DropdownItems--CustomerDropdown').children().should('have.length', customers.length);

  customers.forEach((customer, i) => {
    getByTestID('DropdownItems--CustomerDropdown').children().eq(i).contains(customer);
  })
}

it('should be able to add and list customers in Dropdown', () => {
  cy.clearLocalStorage();
  let basePoints = 2695;

  cy.visit('http://localhost:3000');
  getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);
  getByTestID('DropdownLabel--CustomerDropdown').contains(IDGenerator.generate('Customer 0'));
  const customers = [
    IDGenerator.generate('Customer 0'),
    IDGenerator.generate('Customer 1'),
    IDGenerator.generate('Customer 2'),
    IDGenerator.generate('Customer 3')
  ];
  
  validateCustomers(customers);
  
  // Add a new Customer
  getByTestID('AddCustomer').click();
  customers.push(IDGenerator.generate('Customer 4'));
  validateCustomers(customers);

  getByTestID('AddCustomer').click();
  getByTestID('AddCustomer').click();
  customers.push(IDGenerator.generate('Customer 5'));
  customers.push(IDGenerator.generate('Customer 6'));

  validateCustomers(customers);
});

it('should Change Customer and have it Selected in Dropdown', () => {
  cy.clearLocalStorage();
  let basePoints = 2695;

  cy.visit('http://localhost:3000');
  getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);
  getByTestID('DropdownLabel--CustomerDropdown').contains(IDGenerator.generate('Customer 0'));
  const customers = [
    IDGenerator.generate('Customer 0'),
    IDGenerator.generate('Customer 1'),
    IDGenerator.generate('Customer 2'),
    IDGenerator.generate('Customer 3')
  ];

  validateCustomers(customers);
  getByTestID(`DropdownItem--CustomerDropdown-${customers[3]}`).click();
  
  // clear view from dropdown items
  getByTestID('RewardPoints').click();
  
  // Assert that the 4th customer is selected
  getByTestID('DropdownLabel--CustomerDropdown').contains(customers[3]);
});

it('should Add New Customer and have it Selected in Dropdown', () => {
  cy.clearLocalStorage();
  let basePoints = 2695;

  cy.visit('http://localhost:3000');
  getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);
  getByTestID('DropdownLabel--CustomerDropdown').contains(IDGenerator.generate('Customer 0'));
  const customers = [
    IDGenerator.generate('Customer 0'),
    IDGenerator.generate('Customer 1'),
    IDGenerator.generate('Customer 2'),
    IDGenerator.generate('Customer 3')
  ];
  
  validateCustomers(customers);
  
  // Add a new Customer
  getByTestID('AddCustomer').click();
  customers.push(IDGenerator.generate('Customer 4'));
  validateCustomers(customers);
  
  // clear view from dropdown items
  getByTestID('RewardPoints').click();
  
  // Assert that the newly created customer is selected
  getByTestID('DropdownLabel--CustomerDropdown').contains(customers[4]);
})


it('should add 1 customer and validate rewards', () => {
  cy.clearLocalStorage();
  let basePoints = 2695;

  cy.visit('http://localhost:3000');
  getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);
  getByTestID('DropdownLabel--CustomerDropdown').contains(IDGenerator.generate('Customer 0'));
  const customers = [
    IDGenerator.generate('Customer 0'),
    IDGenerator.generate('Customer 1'),
    IDGenerator.generate('Customer 2'),
    IDGenerator.generate('Customer 3')
  ];
  
  validateCustomers(customers);
  
  // Add a new Customer
  getByTestID('AddCustomer').click();
  customers.push(IDGenerator.generate('Customer 4'));
  validateCustomers(customers);

  getByTestID('RewardPoints').should('contain', `Total Points: 0`);
 
  
  // Assert ONLY has default customers rewards
  getByTestID('ViewRewards').click();
  getByTestID('Table').children().should('have.length', 2);
  getByTestID('TableBody').children().should('have.length', 4);
  
  // Go to main page
  cy.go('back');
  
  // Make transaction on newly created customer
  getByTestID('InputFieldInput--TransactionAmount').focus().clear();
  getByTestID('InputFieldInput--TransactionAmount').type('120');
  getByTestID('SubmitTransaction').click();
  getByTestID('RewardPoints').should('contain', `Total Points: 90`);

  // Assert now has 5 customers rewards
  getByTestID('ViewRewards').click();
  getByTestID('Table').children().should('have.length', 2);
  getByTestID('TableBody').children().should('have.length', 5);
  getByTestID('TableBody')
      .children()
      .eq(4)
      .should(
        'contain.html',
        `<div class="Cell">${customers[4]}</div><div class="Cell">1</div><div class="Cell">120</div><div class="Cell">90</div>`
      );
});
