import { each } from "cypress/types/jquery";

export {};

// We can extend cypress to have cy.getByTestID command
const getByTestID = (testID: string | number) => {
  return cy.get(`[data-testid="${testID}"]`)
}


it("should run display rewards correctly", () => {
  cy.clearLocalStorage()
  cy.visit("http://localhost:3000");
  getByTestID('ViewRewards').click()
  getByTestID('Table').children().should('have.length', 2)
  getByTestID('TableBody').children().should('have.length', 4)

  const expected = [{
    rewards: 2695,
    transactions: 120,
    expenditure: 7260,
    customer: 'da5c56c9-83c4-51b8-ad4d-10d7741d6b3f'
  }, {
    rewards: 2695,
    transactions: 120,
    expenditure: 7260,
    customer: 'bf6e1c1b-f86f-5545-8f77-3eb74a9bfdaf'
  }, {
    rewards: 2695,
    transactions: 120,
    expenditure: 7260,
    customer: '54246717-7dd7-51f2-bda7-3a49468b8cae'
  }, {
    rewards: 2695,
    transactions: 120,
    expenditure: 7260,
    customer: 'edc0d7e6-6df9-5c48-8bad-a4bcad93ade8'
  }]

  // README(Justification): There are other ways to test it.
  // 1. Jest: It would be pretty east to have jest tests but cypress is a budding technology and I have seen a lot of success with it.
  // 2. Instead of matching the exact strings, I could either have test ids to the cells themselves which were uniquely created and identified and then use those for assertions.
  // 3. Or I could have just got the children of children and assert each.
  expected.forEach((exp, i) => {
    getByTestID('TableBody').children().eq(i).should('contain.html', `<div class="Cell">${exp.customer}</div><div class="Cell">${exp.transactions}</div><div class="Cell">${exp.expenditure}</div><div class="Cell">${exp.rewards}</div>`)
  })
});
