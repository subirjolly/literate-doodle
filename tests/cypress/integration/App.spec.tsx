export {};

// We can extend cypress to have cy.getByTestID command
const getByTestID = (testID: string | number) => {
  return cy.get(`[data-testid="${testID}"]`)
}

it("should run transactions manually", () => {
  cy.clearLocalStorage()
  cy.visit("http://localhost:3000");
  getByTestID('RewardPoints').should('contain', 'Total Points: 0')
  
  const cases = [
    [120, 90],
    [50, 0],
    [51, 1],
    ['invalid input', 0]
  ]
  
  cases.forEach(([price, points]) => {
    getByTestID('RewardPoints').should('contain', 'Total Points: 0')
    getByTestID('TransactionAmount').focus().clear()
    getByTestID('TransactionAmount').type(`${price}`)
    getByTestID('SubmitTransaction').click()
    getByTestID('RewardPoints').should('contain', `Total Points: ${points}`)
    getByTestID('ClearStorage').click()
  })
});

it("should run display history correctly", () => {
  cy.clearLocalStorage()
  cy.visit("http://localhost:3000");
  getByTestID('RewardPoints').should('contain', 'Total Points: 0')
  
  const cases = [
    [120, 90],
    [50, 0],
    [51, 1],
    ['invalid input', 0]
  ]
  
  cases.forEach(([price, points]) => {
    getByTestID('RewardPoints').should('contain', 'Total Points: 0')
    getByTestID('TransactionAmount').focus().clear()
    getByTestID('TransactionAmount').type(`${price}`)
    getByTestID('SubmitTransaction').click()
    getByTestID('RewardPoints').should('contain', `Total Points: ${points}`)
    getByTestID('ClearStorage').click()
  })
});
