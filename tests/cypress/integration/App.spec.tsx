import IDGenerator from "../../../src/Utils/IDGenerator";

export {};

// We can extend cypress to have cy.getByTestID command
const getByTestID = (testID: string | number) => {
  return cy.get(`[data-testid="${testID}"]`);
};

it('should run transactions manually', () => {
  cy.clearLocalStorage();
  let basePoints = 2695;

  cy.visit('http://localhost:3000');
  getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);
  getByTestID('DropdownLabel--CustomerDropdown').contains(IDGenerator.generate('Customer 0'));

  const cases = [
    [120, basePoints + 90],
    [50, basePoints],
    [51, basePoints + 1],
    ['invalid input', basePoints],
  ];

  cases.forEach(([price, points]) => {
    cy.visit('http://localhost:3000');
    getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);
    getByTestID('InputFieldInput--TransactionAmount').focus().clear();
    getByTestID('InputFieldInput--TransactionAmount').type(`${price}`);
    getByTestID('SubmitTransaction').click();
    getByTestID('RewardPoints').should('contain', `Total Points: ${points}`);
  });
});
