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

  continueShopping() {
    cy.contains("Continue Shopping").click();
  }
}

export default new CartPage();