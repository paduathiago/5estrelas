describe("Like Establishment Test", () => {
  it("should allow a user to like an establishment", () => {
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

    cy.visit("http://localhost:5173/establishments/bar/8");
  });
});
