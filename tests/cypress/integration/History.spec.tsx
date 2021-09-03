export {};

// We can extend cypress to have cy.getByTestID command
const getByTestID = (testID: string | number) => {
  return cy.get(`[data-testid="${testID}"]`);
};

it('should run display history correctly', () => {
  cy.clearLocalStorage();
  cy.visit('http://localhost:3000');
  getByTestID('ViewHistory').click();
  getByTestID('Table').children().should('have.length', 2);
  getByTestID('TableBody').children().should('have.length', 480);
});
