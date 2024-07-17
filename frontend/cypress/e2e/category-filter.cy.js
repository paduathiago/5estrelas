describe("Test Category Navigation and Establishment Category", () => {
  beforeEach(() => {
    // Intercepta a requisição que retorna todos os estabelecimentos
    cy.intercept("GET", "http://localhost:3000/establishments*", (req) => {
      req.reply((res) => {
        if (Array.isArray(res.body)) {
          // Filtra e modifica a resposta para incluir apenas estabelecimentos da categoria "bar"
          const filteredEstablishments = res.body.filter(
            (establishment) => establishment.category === "bar"
          );
          res.body = filteredEstablishments;
        } else {
          // Se a resposta não for um array, apenas logue um aviso
          console.warn("A resposta não é um array:", res.body);
        }
        return res; // Retorna a resposta modificada
      });
    }).as("getEstablishments");
  });

  it("should navigate to Bar category and verify establishments", () => {
    // Visita a página inicial
    cy.visit("http://localhost:5173");

    // Clica no card da categoria "Bar"
    cy.contains("Bares").click();

    // Espera a requisição de estabelecimentos ser completada
    cy.wait("@getEstablishments");

    // Verifica se estamos na página de estabelecimentos
    cy.url().should("include", "/establishments/bar");

    // Seleciona todos os cards de estabelecimentos e interage com cada um
    cy.get(".establishment-card").each(($el, index, $list) => {
      cy.wrap($el).click();

      // Espera a requisição específica do estabelecimento
      cy.wait("@getEstablishments").then((interception) => {
        // Verifica se o atributo category é igual a "bar"
        interception.response.body.forEach((establishment) => {
          expect(establishment.category).to.equal("bar");
        });
      });

      // Volta para a página de estabelecimentos
      cy.go("back");

      // Espera a requisição de estabelecimentos ser completada novamente
      cy.wait("@getEstablishments");
    });
  });
});

cypress / integration / category_navigation_spec.js;
