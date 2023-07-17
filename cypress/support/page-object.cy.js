class CartPage {
    get product() {
        return cy.get(".add-to-cart").eq(0).click();
    }

    get addMultipleProducts() {
        cy.get(".add-to-cart").eq(0).click();
        cy.get(".add-to-cart").eq(1).click();
    }
}
export const Cart = new CartPage();