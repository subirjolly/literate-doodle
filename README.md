## Application Knowledge
Now you should be able to see a Rough dropdown menu with Customers listing. You should be able to select a customer and the customer as well as its data should persist across the different pages in this application, not on page reload though.

You should also be able to `Add Customer` and the dropdown should have that `Selected By Default` as soon as you add it. You should also see the Reward points should be 0.

OLD NOTES: Right now I have added some mock data which has 4 customers and 120 transactions per customer. It's currently not intuitive to add a customer. You can use the default customer or just add any string and that will be considered to be a customer id.

Once you are ready, go ahead and start playing with the Transaction Price and the `Order Now` button. You total points for the currently selected customer should be visible on top.

## Testing
To Run all Cypress tests without seeing in Browser
`yarn e2e:all`

To Run and watch E2E tests using Cypress in Browser. Watching this would be fun if you have never used browser based testing.
`yarn e2e` then click on the individual tests.

## Installation/Run Instructions
`yarn`
`yarn start`