describe("Write Review Test", () => {
  it("should allow a user to write a review for an establishment", () => {
    // Visita a página do estabelecimento
    cy.visit(`http://localhost:5173/establishments/bar/8`);

    // Abre o diálogo para escrever uma avaliação
    cy.get("button").contains("Escrever Avaliação").click();

    // Preenche o formulário de avaliação
    cy.get(
      'textarea[placeholder="Escreva aqui o que você acha do serviço"]'
    ).type("Ótimo serviço!");
    cy.get('button[role="combobox"]').click(); // Abre o dropdown de seleção
    cy.contains("5").click({ force: true }); // Seleciona a nota 5

    // Submete o formulário
    cy.get('button[type="submit"]').contains("Enviar Avaliação").click();

    // Verifica se a avaliação foi submetida corretamente
    cy.wait(1000); // Aguarda um momento para a avaliação ser enviada
    cy.contains("Ótimo serviço!"); // Verifica se a avaliação aparece na página
    cy.contains("5"); // Verifica se a nota 5 aparece na página
  });
});
