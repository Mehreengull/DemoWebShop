import ProductPage from "../support/pages/ProductPage";
import RegisterPage from "../support/pages/RegisterPage";
import SearchPage from "../support/pages/SearchPage";
describe("template spec", () => {
  let logindata;
  const loginPage = new RegisterPage();
  const productPage = new ProductPage();
  const searchPage = new SearchPage();
  before(() => {
    cy.fixture("login.json").then(function (data) {
      logindata = data;
    });
  });
  it("passes", () => {
    cy.visit("register/");

    loginPage.verifyPageHeading();
    loginPage.registerNewUser();
    productPage.completePurchase();
    searchPage.searchUnavailableItem();
  });
});
