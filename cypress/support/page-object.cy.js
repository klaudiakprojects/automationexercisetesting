class CartPage {
    get addProductToTheCart() {
      return cy.get(".add-to-cart").eq(0);
    }
  
    addProductToTheCartClick() {
      this.addProductToTheCart.click();
    }
  
    addMultipleProductsClick() {
      cy.get(".add-to-cart").eq(0).click();
      cy.get(".add-to-cart").eq(1).click();
    }
  }
  
  class HomePage {
    get mainSlider() {
      return cy.get("#slider");
    }
  
    get newsletterInput() {
      return cy.get("#susbscribe_email");
    }
  
    get firstProductPrice() {
      return cy.get(".productinfo>h2").eq(0);
    }
  }
  
  export const Cart = new CartPage();
  export const Home = new HomePage();
  