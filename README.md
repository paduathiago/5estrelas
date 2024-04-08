# 5estrelas
Projeto de Rede social utilizada para avaliação de produtos e serviços

## Escopo e Proposta de Projeto
A ideia do sistema é ser um ambiente de compartilhamento de experiências, promoção de serviços e estabelecimentos. O 5 estrelas funciona como um ambiente em que empresas publicam sua marca e recebem feedbacks. Os usuários então trocam experiências e dicas, de modo a incentivar melhoras no atendimento e garantir indicações de boa qualidade.

### Principais Features
 - Publicação dos prestadores de serviços
 - Avaliações por partes dos usuários
 - Publicações feitas por usuários
 - Comentários nas publicações
 - Busca de produtos por categoria

### Principais Tecnologias

 - Javascript: Principal linguagem de programação usada para a lógica e interações no lado do cliente e do servidor.
 - Node.js: Plataforma que permite a execução de JavaScript no servidor.
 - Sequelize: ORM( Object-Relational Mapping) para interagir com o banco de dados, fornecendo uma abstração para trabalhar com a base de dados
 - Express: Framework web para Node.js utilizado para configurar rotas, middlewares, e manipular requisições HTTP.
 - SQlite: Banco de dados escolhido para armazenar os dados da aplicação. É um banco de dados leve e altamente eficiente para sistemas de menor escala.
 - React: O react é uma biblioteca front-end Javascript de código aberto com foco em criar interfaces de usuário em páginas web.

## Membros e Tarefas
 - Janderson Santos: Desenvolvedor Front-end
 - Thiago Pádua: Desenvolvedor Fullstack
 - Mariano Fernandes: Desenvolvedor Back-end
 - Gabriel Fialho: Desenvolvedor Front-end

## Backlog do Produto
 - Como usuário, eu quero poder me cadastrar na plataforma fornecendo informações como nome, e-mail e senha.
 - Como usuário, eu quero poder visualizar as avaliações deixadas para um determinado estabelecimento.
 - Como usuário, eu quero poder filtrar a lista de estabelecimentos por categoria (produto/serviço/lugar) para encontrar facilmente o que estou procurando.
 - Como usuário, eu gostaria de reportar um comentário ofensivo.
 - Como cliente, eu quero poder avaliar um estabelecimento adicionando uma classificação em estrelas e deixando um comentário opcional sobre minha experiência.
 - Como cliente, eu gostaria de adicionar imagens em minhas avaliações.
 - Como cliente, eu gostaria de poder ordenar as avaliações de um estabelecimento pela nota, relevância ou data de postagem.
 - Como cliente, eu gostaria de manter uma lista de estabelecimentos favoritos.
 - Como cliente, eu gostaria de compartilhar um estabelecimento.
 - Como cliente, eu gostaria de poder votar (Like ou dislike) em uma avaliação.
 - Como cliente, eu gostaria de poder adicionar a faixa de preço média do estabelecimento.
 - Como cliente, eu gostaria de receber recomendações personalizadas de estabelecimentos com base nas minhas preferências e histórico de avaliações.
 - Como dono de estabelecimento, eu quero poder adicionar um novo estabelecimento à plataforma, incluindo informações como nome, categoria (produto/serviço/lugar), endereço e descrição.
 - Como dono de estabelecimento, eu gostaria de adicionar o horário de funcionamento e telefone de contato.
 - Como dono de estabelecimento, eu gostaria de adicionar fotos do local.
 - Como dono de estabelecimento, eu gostaria de responder comentários de clientes.
 - Como dono de estabelecimento, eu gostaria de linkar o perfil do meu estabelecimento em diferentes redes sociais (como Facebook e Instagram).
   
## Backlog da Sprint
- História #1: Como usuário, eu quero poder me cadastrar na plataforma fornecendo informações como nome, e-mail e senha.
	- Tarefas e responsáveis:
 		- Front-end: Inicializar rotas de cadastro e login (Janderson)
		- Front-end: Criar tela de login, cadastro e lógica de autenticação, criptografia e cookies (Gabriel)
  		- Back-end: Desenvolver lógica de cadastro (Thiago)
		- Back-end: Desenvolver lógica de autenticação, utilizando token de autenticação ou e-mail e senha (Thiago)

- História #2: Como usuário, eu quero poder visualizar as avaliações deixadas para um determinado estabelecimento.
	- Tarefas e responsáveis:
 		- Front-end: Criar página para visualização de informações do estabelecimento (Janderson) 
		- Front-end: Criar componente para visualização de avaliações (Janderson)
		- Back-end: Criar rota para inserção e obtenção de avaliações (Mariano)
 
- História #3: Como usuário, eu quero poder filtrar a lista de estabelecimentos por categoria (produto/serviço/lugar) para encontrar facilmente o que estou procurando.
	- Tarefas e responsáveis:
		- Front-end: Criar componente de listagem de estabelecimentos, com filtros (Gabriel)
		- Back-end: Criar rota para obtenção de estabelecimentos, com opção de ordenação e filtragem (Thiago)

- História #4: Como cliente, eu quero poder avaliar um estabelecimento adicionando uma classificação em estrelas e deixando um comentário opcional sobre minha experiência.
	- Tarefas e responsáveis:
		- Front-end: Criar componente de formulário de avaliação do usuário (Gabriel)
		- Back-end: Criar rota para inserção de avaliações e recalcular média de avaliação dos estabelecimentos (Mariano)
 
- História #5: Como cliente, eu gostaria de manter uma lista de estabelecimentos favoritos.
	- Tarefas e responsáveis:
		- Front-end: Criar componente de lista de favoritos e opção de adiçionar estabelecimento aos favoritos em sua página (Janderson)
		- Back-end: Criar rota para inserção de estabelecimento na lista de favoritos de um usuário (Mariano)
  		- Back-end: Criar rota para obtenção de lista de favoritos de determinado usuário (Mariano)

- História #6: Como cliente, eu gostaria de poder votar (Like ou dislike) em uma avaliação.
	- Tarefas e responsáveis:
		- Front-end: Adicionar opções de Like e dislike no componente de avaliação (Gabriel)
		- Back-end: Criar rota para inserção de estabelecimento na lista de favoritos de um usuário (Mariano)
  		- Back-end: Criar rota para obtenção de lista de favoritos de determinado usuário (Mariano)
 
- História #7: Como dono de estabelecimento, eu quero poder adicionar um novo estabelecimento à plataforma, incluindo informações como nome, categoria (produto/serviço/lugar), endereço e descrição.
	- Tarefas e responsáveis:
		- Front-end: Criar formulário de cadastro de novos estabelecimentos (Gabriel)
		- Back-end: Criar rota para inserção de novos estabelecimentos (Mariano)
 
- História #8: Como dono de estabelecimento, eu gostaria de responder comentários de clientes.
	- Tarefas e responsáveis:
		- Front-end: Criar componente de formulário para resposta de avaliação, disponível apenas para o dono do estabelecimento (Janderson)
		- Back-end: Criar rotas para inserção e obtenção de comentários em avaliações (Thiago)
