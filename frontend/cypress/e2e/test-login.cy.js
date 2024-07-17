// cypress/integration/login.spec.js

describe("Login Test", () => {
  it("should allow a user to log in", () => {
    // Visita a página de login
    cy.visit("http://localhost:5173/login"); // Altere a URL para corresponder ao caminho da sua página de login

    // Insere o email
    cy.get('input[name="email"]').type(
      "jandersonglaubermendesantos@hotmail.com"
    );

    // Insere a senha
    cy.get('input[name="password"]').type("senhasenha");

    // Submete o formulário
    cy.clearAllCookies();
    cy.get('button[type="submit"]').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should("include", "/"); // Verifica se a URL mudou para a página principal
    cy.wait(1000); // Aguarda um segundo para garantir que o cookie seja definido
    cy.getCookies().then((cookies) => {
      console.log("Cookies após login:", cookies); // Loga todos os cookies para depuração
    });
    cy.getCookie("AuthToken").should("exist"); // Verifica se o cookie de autenticação foi definido
  });
});
