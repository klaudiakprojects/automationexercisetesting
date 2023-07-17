/// <reference types="cypress" />

import { CartPage } from "../support/page-object.cy";

describe('E2E testing - Automation Exercise store', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com/');
  })

  //HOME PAGE TESTING
  it('should verify if the slider is visible', () => {
    cy.get("#slider").should('be.visible');
  })

  it('should verify if the newsletter input is visible', () => {
    cy.get("#susbscribe_email").should('be.visible');
  })

  it('should show if the prices of products are visible', () => {
    cy.get(".productinfo>h2").eq(0).should('be.visible');
  })

  //BUYING ITEMS TESTING
  it('should be able to add product to the cart from home page', () => {
    cy.get(".add-to-cart").eq(0).click();
    cy.contains("Your product has been added to cart.").should('be.visible');
    cy.contains("Continue Shopping").click();
    cy.contains("Cart").click()
    cy.get(".cart_product").should('be.visible');
    cy.get(".cart_quantity").find("button").contains('1');
  })

  //DELETE ITEM TESTING
  it('should be able to delete item from the cart', () => {
    cy.get(".add-to-cart").eq(0).click();
    cy.contains("Your product has been added to cart.").should('be.visible');
    cy.contains("Continue Shopping").click();
    cy.contains("Cart").click()
    cy.get(".cart_product").should('be.visible');
    cy.get(".cart_quantity_delete").click();
    cy.contains("Cart is empty!").should('be.visible');
  })


  //ITEM PAGE
  it('should verify if product page has all needed information', () => {
    cy.contains("View Product").first().click();
    cy.get(".view-product").find('img').should('have.attr', 'src').should('include', 'product');

  })

  //SEARCHING ITEMS
  it('should check if searching works correctly', () => {
    cy.get("li>a").contains("Products").click();
    cy.get("#search_product").type("dress");
    cy.get("#submit_search").click();
    cy.get(".text-center").contains(/dress|Dress/)
  })

  it('should check if it is possible to search with special characters', () => {
    cy.get("li>a").contains("Products").click();
    cy.get("#submit_search").click();
    cy.get("#search_product").type("dre$$");
    cy.get("#submit_search").click();
    cy.get(".text-center").contains(/Dress|dress/).should('not.exist');
  })

  //ADDING MULTIPLE ITEMS
  it('should check if it is possible to add multiple times one product with typing the number', () => {
    cy.get("li>a").contains("Products").click();
    cy.contains("View Product").first().click();
    cy.get("input[type=number]").clear().type("5");
    cy.contains("Add to cart").click();
    cy.contains("View Cart").click();
    cy.get("#product-1 > .cart_quantity").contains("5")
  })

  //USING FILTERS
  it('should check if it is possible to use filters', () => {
    cy.get(".panel-title").contains("Women").click();
    cy.contains("Dress ").click();
    cy.get(".text-center").contains(/dress|Dress/);
  })


  //VERIFYING  IF SUMMARY IS CORRECT
  it('should verify the summary', () => {
    cy.get("li>a").contains("Products").click();
  
    cy.get(".productinfo h2").first().invoke("text").then((txt) => {
      let firstProductPrice = txt;
      let priceString = firstProductPrice.replace(/[^0-9]/g, '');
      let productPrice = parseInt(priceString);
      cy.log(productPrice);
  
      cy.get(".productinfo p").first().invoke("text").then((txt) => {
        let firstProductName = txt;
        cy.log(firstProductName);
  
        cy.get(".add-to-cart").eq(0).click();
        cy.contains("Your product has been added to cart.").should('be.visible');
        cy.contains("View Cart").click();
  
        cy.get("tbody tr").should("have.length", 1);
  
        cy.get(".cart_description h4").invoke("text").should((txt) => {
          expect(txt).to.eq(firstProductName);
        });
  
        cy.get(".cart_price p")
          .invoke("text")
          .should((txt) => {
            let cartPriceString = txt.replace(/[^0-9]/g, '');
            let cartPrice = parseInt(cartPriceString);
            expect(cartPrice).to.eq(productPrice);
          });
      });
    });
  });

  it('should be able to buy something from "recommended" module', () => {
    cy.get("#recommended-item-carousel a").first().click({force:true});
    cy.contains("Your product has been added to cart.").should('be.visible');
    cy.contains("View Cart").click();
    cy.get("tbody tr").should("have.length", 1);

  })

  it('should be able to filter through producents', () => {
    cy.get(".brands-name li a").first().then((el) => {
      let brandName = el.text().replace(/\(\d+\)/g, '').trim();
      cy.wrap(el).click();
      cy.get("h2.text-center").invoke("text").should("contain", brandName)
      cy.url().should("contain", brandName)
    });
  });
  
  it('should check if the products number in producent filter is the same as on the result page', () => {
    cy.get(".brands-name li a").first().then((el) => {
      const productsQuantity = el.text().match(/\d+/g);
      cy.wrap(el).click();
      cy.get(".single-products").should("have.length", productsQuantity)
    })
  })
  


})