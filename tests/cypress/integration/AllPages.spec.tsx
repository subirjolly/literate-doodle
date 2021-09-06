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
  getByTestID('InputFieldInput--CustomerID').should('have.value', IDGenerator.generate('Customer 0'));

  const cases = [
    [200, 250],
    [201, 252],
    [202, 254],
    ['invalid input', 0],
  ];

  // Perform a few transactions
  cases.forEach(([price, points]) => {
    basePoints += parseInt(`${points}`, 10);
    getByTestID('InputFieldInput--TransactionAmount').focus().clear();
    getByTestID('InputFieldInput--TransactionAmount').type(`${price}`);
    getByTestID('SubmitTransaction').click();
  });

  getByTestID('RewardPoints').should('contain', `Total Points: ${basePoints}`);

  // Navigate to View History page
  getByTestID('ViewHistory').click()
  // Assert there are 3 more transactions
  getByTestID('TableBody').children().should('have.length', 483);

  // Perform sepecific assertions. Leaving out transaction ids as they are dynamic. Can do REGEX match, in real code.
  getByTestID('TableBody').children().eq(480).children().eq(0).should('contain.text', 'da5c56c9-83c4-51b8-ad4d-10d7741d6b3f');
  getByTestID('TableBody').children().eq(480).children().eq(2).should('contain.text', '200');
  getByTestID('TableBody').children().eq(481).children().eq(0).should('contain.text', 'da5c56c9-83c4-51b8-ad4d-10d7741d6b3f');
  getByTestID('TableBody').children().eq(481).children().eq(2).should('contain.text', '201');
  getByTestID('TableBody').children().eq(482).children().eq(0).should('contain.text', 'da5c56c9-83c4-51b8-ad4d-10d7741d6b3f');
  getByTestID('TableBody').children().eq(482).children().eq(2).should('contain.text', '202');

  // Navigate to main page again
  cy.go('back');

  // Navigate to Rewards page
  getByTestID('ViewRewards').click();

  getByTestID('Table').children().should('have.length', 2);
  getByTestID('TableBody').children().should('have.length', 4);

  const expected = [
    {
      rewards: 3451,
      transactions: 123,
      expenditure: 7863,
      customer: 'da5c56c9-83c4-51b8-ad4d-10d7741d6b3f',
    },
    {
      rewards: 2695,
      transactions: 120,
      expenditure: 7260,
      customer: 'bf6e1c1b-f86f-5545-8f77-3eb74a9bfdaf',
    },
    {
      rewards: 2695,
      transactions: 120,
      expenditure: 7260,
      customer: '54246717-7dd7-51f2-bda7-3a49468b8cae',
    },
    {
      rewards: 2695,
      transactions: 120,
      expenditure: 7260,
      customer: 'edc0d7e6-6df9-5c48-8bad-a4bcad93ade8',
    },
  ];

  expected.forEach((exp, i) => {
    getByTestID('TableBody')
      .children()
      .eq(i)
      .should(
        'contain.html',
        `<div class="Cell">${exp.customer}</div><div class="Cell">${exp.transactions}</div><div class="Cell">${exp.expenditure}</div><div class="Cell">${exp.rewards}</div>`
      );
  });
});
