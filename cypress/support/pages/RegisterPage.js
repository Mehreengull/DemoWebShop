import { faker, th } from "@faker-js/faker";
class RegisterPage {
  constructor() {
    this.firstname = "";
    this.lastname = "";
  }
  verifyPageHeading() {
    cy.get("h1").should("be.visible").and("include.text", "Register");
  }

  checkGender(gender) {
    if (gender == "M") {
      cy.get("#gender-male").check();
    } else {
      cy.get("#gender-female").check();
    }
  }

  fillNameEmail() {
    this.firstname = faker.person.firstName();
    this.lastname = faker.person.lastName().toLocaleLowerCase();
    cy.get("#FirstName").type(this.firstname);
    cy.get("#LastName").type(this.lastname);
    let email = faker.internet.email({
      firstName: this.firstname,
      lastName: this.lastname,
      provider: "automation.com",
    });
    cy.get("#Email").type(email);
  }

  fillPassword() {
    let password = faker.internet.password({ length: 8 });
    cy.get("#Password").type(password);
    cy.get("#ConfirmPassword").type(password);
  }

  clickRegister() {
    cy.get("#register-button").click();
  }

  verifyRegistration() {
    cy.get(".result").should("contain.text", "Your registration completed");
    cy.get('[value="Continue"]').click();
  }

  verifyCustomerDetails() {
    cy.get("#gender-male").should("be.checked");
    cy.get("#FirstName").contains(this.firstname).should("be.visible");
  }

  registerNewUser() {
    this.checkGender("M");
    this.fillNameEmail();
    this.fillPassword();
    this.clickRegister();
    this.verifyRegistration();
  }
}

export default RegisterPage;
