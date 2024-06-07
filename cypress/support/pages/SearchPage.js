import { faker } from "@faker-js/faker";

class SearchPage {
  searchUnavailableItem() {
    const item = faker.commerce.product();
    cy.get("#small-searchterms").type(item);
    cy.get("form > .button-1").click();
    cy.get(".result").contains(
      "No products were found that matched your criteria."
    );
  }

  //   searchAvailableItem() {
  //     cy.get("#small-searchterms").type("gift");
  //   }
}

export default SearchPage;
