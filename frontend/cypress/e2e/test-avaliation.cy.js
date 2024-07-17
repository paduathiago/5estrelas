// cypress/integration/view_reviews.spec.js

describe("View Establishment Reviews", () => {
  // Antes de cada teste, definir um alias para a rota que retorna as informações do estabelecimento
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/establishments/8", {
      fixture: "establishment.json",
    }).as("getEstablishment");
    cy.intercept("GET", "http://localhost:3000/review/8", {
      fixture: "reviews.json",
    }).as("getReviews");
  });

  it("should display establishment information and reviews", () => {
    // Visita a página do estabelecimento com id 1
    cy.visit("http://localhost:5173/establishments/bar/8");

    // Espera as requisições serem completadas
    cy.wait("@getEstablishment");
    cy.wait("@getReviews");

    // Verifica se as informações do estabelecimento estão sendo exibidas corretamente
    cy.get(".text-3xl.font-bold").should("contain.text", "The Temple Bar");
    cy.get(".text-gray-600").should("contain.text", "Aberto: 17:00 às 23:00");
    cy.get(".text-gray-700").should("contain.text", "Telefone:  1212121211212");
    cy.get(".text-gray-800").should("contain.text", "Endereço:  Rua dos Bares");
    cy.get(".text-gray-900").should("contain.text", "O templo dos bares!");

    // // Verifica se a galeria de imagens está sendo exibida corretamente
    // cy.get(".carousel-item").should("have.length", 3); // Assumindo que há 3 imagens no fixture

    // // Verifica se as avaliações estão sendo exibidas corretamente
    cy.get(".user-review").should("have.length", 2); // Assumindo que há 2 avaliações no fixture

    // Verifica se o conteúdo de uma avaliação está correto
    cy.get(".user-review")
      .first()
      .within(() => {
        // cy.get(
        //   ".flex h-full w-full items-center justify-center rounded-full bg-muted"
        // )
        //   .should("contain.text", "Usuário 1");
        cy.get("p").should(
          "contain.text",
          "Muito bom restauranteseg., 1 de julho de 2024 - 16:03h"
        );
        cy.get(".text-sm").should(
          "contain.text",
          "seg., 1 de julho de 2024 - 16:03h00"
        );
        // cy.get("flex gap-2").should("exist"); // Verifica se o componente de estrelas está presente
        // cy.get("lucide lucide-thumbs-up").should("exist");
        // cy.get(".dislike-button").should("contain.text", "2");
      });
  });
});
