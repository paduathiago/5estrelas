Descrição dos Componentes

    adapters/express/: Contém os adaptadores específicos para o framework Express.

        controllers/: Controladores que lidam com as requisições HTTP.

        server.ts: Configuração do servidor Express.

    core/domain/: Define os modelos de domínio (entidades) da aplicação.
        models/: Classes que representam os modelos de domínio, como User.

    core/services/: Contém os serviços da aplicação, que encapsulam a lógica de negócio.
        userService.ts: Serviço que implementa as operações relacionadas aos usuários.

    repositories/: Repositórios que lidam com o acesso aos dados.
        userRepository.ts: Implementação concreta do repositório para usuários.

    interfaces/: Define as interfaces necessárias para promover a separação de preocupações e permitir a injeção de dependência.
        IUserRepository.ts: Interface que descreve as operações que um repositório de usuário deve implementar.

    index.ts: Ponto de entrada da aplicação, onde o servidor Express é iniciado.

    config.ts: Arquivo de configuração com variáveis de ambiente, configurações do banco de dados, etc.
