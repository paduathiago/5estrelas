describe("Create Service Test", () => {
  it("should allow a user to create an establishment and see it", () => {
    cy.intercept("POST", "/api/login").as("login");
    cy.intercept("POST", "/api/establishments").as("createEstablishment");

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

    // Navega para a página de cadastrar serviço
    cy.contains("Cadastrar serviço").click();
    cy.url().should("include", "/new-establishment");

    // Preenche o formulário de cadastro do estabelecimento
    cy.get('input[name="name"]').type("Teste Estabelecimento");
    cy.get('textarea[name="description"]').type(
      "Descrição do Teste Estabelecimento"
    );
    cy.get('input[name="phone"]').type("123456789");
    cy.get('input[name="address"]').type("Endereço Teste");

    // Seleciona a categoria
    cy.contains("Selecione categoria").click();
    cy.contains("Bar").click({ force: true });

    // Seleciona dias da semana
    cy.get("div").contains("Dias da semana").parent().find("input").click();
    cy.contains("Segunda-feira").click();
    cy.contains("Sexta-feira").click();

    // Seleciona horário de início
    cy.contains("Selecione horário de início").click();
    cy.contains("09:00").click({ force: true });

    // Seleciona horário de fim
    cy.contains("Selecione horário de fim").click();
    cy.contains("18:00").click({ force: true });

    // Submete o formulário
    cy.get('button[type="submit"]').click();

    cy.visit("http://localhost:5173/establishments");

    // Verifica se o estabelecimento foi criado e listado corretamente
    cy.contains("Teste Estabelecimento").should("exist");
  });
});
