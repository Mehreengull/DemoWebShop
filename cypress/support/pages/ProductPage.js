import { faker } from '@faker-js/faker';

class ProductPage {
  constructor() {
    this.selectedProductName = '';
    this.cartSum = 0;
  }

  selectProduct(productName) {
    cy.get('div.product-grid .title').should('contain.text', 'Featured products');
    cy.get("div.item-box").each((el) => {
      const textMac = el.find('h2.product-title').text();
      if (textMac.includes(productName)) {
        this.selectedProductName = productName; // Store the selected product name
        cy.wrap(el).find("input[value='Add to cart']").click();
      }
    });
    cy.url().should('include', productName.toLowerCase().replace(' ', '-'));
  }

  configureProduct(quantity) {
    cy.get('#product_attribute_75_5_31_96').check();
    cy.get('.qty-input').clear().type(quantity);
    cy.get('#add-to-cart-button-75').click();
    cy.get('#bar-notification').should('contain.text', 'The product has been added to your shopping cart');
    cy.contains('a', 'shopping cart').click();
  }

  verifyCart(quantity) {
    cy.get('tr td.unit-price span.product-unit-price').then((element) => {
      const price = parseFloat(element.text().replace('$', ''));
      cy.get('tr td.qty input').invoke('val').then((value) => {
        const intValue = parseInt(value);
        expect(intValue).to.equal(quantity);
        this.cartSum = price * intValue; // Store the calculated sum
        cy.get('.product-subtotal').contains(this.cartSum);
      });
    });
  }

  proceedToCheckout() {
    cy.get("#termsofservice").check();
    cy.get('#checkout').click();
  }

  fillBillingAddress() {
    const country = faker.location.country().includes('istan')
    cy.log(country)
    //cy.pause()
    cy.get('#BillingNewAddress_CountryId').select('Pakistan');
    cy.get('#BillingNewAddress_City').type('Islamabad');
    cy.get('#BillingNewAddress_Address1').type(faker.location.secondaryAddress());
    cy.get('#BillingNewAddress_ZipPostalCode').type(faker.location.zipCode());
    cy.get('#BillingNewAddress_PhoneNumber').type(faker.phone.number());
    cy.get('#billing-buttons-container > .button-1').click();
  }

  selectShippingMethod() {
    cy.get('#shipping-buttons-container > .button-1').click();
    cy.get('#shippingoption_2').check();
    cy.get('#shipping-method-buttons-container > .button-1').click();
  }

  selectPaymentMethod() {
    cy.get('#paymentmethod_2').check();
    cy.get('#payment-method-buttons-container > .button-1').click();
  }

  fillPaymentDetails() {
    cy.get('#CreditCardType').select('MasterCard');
    cy.get('#CardholderName').type(faker.person.firstName());
    cy.get('#CardNumber').type(faker.finance.creditCardNumber());
    cy.get('#CardCode').type(faker.finance.creditCardCVV());
    cy.get('#payment-info-buttons-container > .button-1').click();
  }

  verifyOrderCompletion() {
    cy.get('.product-name').should('be.visible');
    cy.get('#checkout-step-confirm-order').within(() => {
      cy.contains(this.selectedProductName).should('be.visible'); // Assert the product name
      cy.get('.product-price > strong').contains(this.cartSum).should('be.visible'); // Assert the sum
    });
    cy.get('#confirm-order-buttons-container > .button-1').click()
    cy.get('h1').contains('Thank you')
    cy.get('.button-2').click()
  }

  completePurchase() {
    this.selectProduct('Simple Computer');
    this.configureProduct(3);
    this.verifyCart(3);
    this.proceedToCheckout();
    this.fillBillingAddress();
    this.selectShippingMethod();
    this.selectPaymentMethod();
    this.fillPaymentDetails();
    this.verifyOrderCompletion(); 
  }
}

export default ProductPage;
