describe("Favorite Establishment Test", () => {
  it("should allow a user to favorite an establishment and see it in the favorites page", () => {
    // Intercepta a requisição de login
    cy.intercept("POST", "/api/login").as("login");

    // Visita a página de login
    cy.visit("http://localhost:5173/login");

    // Realiza o login
    cy.get('input[name="email"]').type(
      "jandersonglaubermendesantos@hotmail.com"
    );
    cy.get('input[name="password"]').type("senhasenha");
    cy.get('button[type="submit"]').click();

    // Aguarda a requisição de login ser concluída e redireciona para a página inicial
    cy.url().should("include", "/");

    // Navega para a categoria "Bar"
    cy.contains("Bares").click();

    // Intercepta a requisição para obter estabelecimentos
    cy.intercept("GET", "http://localhost:3000/establishments*", {
      fixture: "establishments.json",
    }).as("getEstablishments");

    // Aguarda a requisição ser concluída
    cy.wait("@getEstablishments");

    // Favorita o estabelecimento "The Templo Bar"
    cy.contains("The Temple Bar")
      .parent()
      .parent()
      .find("svg.lucide-star")
      .click({ multiple: true });

    // Navega para a página de favoritos
    cy.get('a[href="/favorites"]').click();

    // Intercepta a requisição para obter favoritos
    cy.intercept("GET", "/api/favorites", { fixture: "favorites.json" }).as(
      "getFavorites"
    );

    // Aguarda a requisição ser concluída
    cy.wait("@getFavorites");

    // Verifica se o estabelecimento "The Templo Bar" está na lista de favoritos
    cy.contains("The Templo Bar").should("exist");
  });
});
