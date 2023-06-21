
# Blogs Api

Blogs Api é um projeto da Trybe que visa desenvolver uma API em Back-End para administrar um blog.


## Autores

- [@lucasolib](https://www.github.com/lucasolib)


## Aprendizados

Este projeto se mostrou desafiador por ser um projeto em que desenvolvi um CRUD's para uma aplicação e fazer um bano de dados funcional além de validar os usuários com token JWT, fazendo uma aplicação RESTful.


## Stack utilizada

**Back-end:** Node.js, Sequelize.

## Funcionalidades

- CRUD de usuários (Login e registro funcionais)
- Criar e ler Categorias
- CRUD de posts no blog
- Pesquisa por query


## Instalação

Verifique a funcionalidade do código, rodando o mesmo na sua máquina ou via docker, copiando este repositório, instale as dependências, rode o back-end e o banco de dados.


```bash
  git clone git@github.com:lucasolib/lucasolib-blogs-api.git-manager.git
  cd lucasolib-blogs-api


```
  
  ## 👉 Com Docker
  
 <details>
  **Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja na documentação](https://docs.docker.com/compose/install/) como instalá-lo.**


  > Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  >  Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências com `npm install`. (Instale dentro do container)
  
  - **Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.
  </details>
  
  ## 👉 Sem Docker

<details>
  > Instale as dependências com `npm install`
  
  - **Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.
</details>

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as variáveis de ambiente no seu .env para o Back-End entrar em contato com o banco de dados.


## Documentação da API

#### Permit logar na aplicação

```http
  POST /login
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O email da conta que deseja acessar |
| `senha`      | `string` | **Obrigatório**. A senha da conta que deseja acessar |

#### Cadastra um usuário

```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `displayName`      | `string` | **Obrigatório**. O nome que irá aparecer no blog |
| `email`      | `string` | **Obrigatório**. O email que se deseja cadastrar |
| `senha`      | `string` | **Obrigatório**. A senha que será usada para acessar a conta |
| `imagem`      | `string` | Imagem de perfil |

#### Retorna todos usuários do banco de dados

```http
  GET /user
```

#### Retorna um usuário específico do banco de dados

```http
  GET /user/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O id que deseja retornar|

#### Cria uma nova categoria

```http
  POST /categories
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome da categoria que se deseja criar |


#### Retorna todas as categorias

```http
  GET /categories
```

#### Cria um novo post

```http
  POST /post
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. O título do post |
| `content`      | `string` | **Obrigatório**. O conteúdo do post |
| `categoryIds`      | `Array de int` | **Obrigatório**. Os IDs das categorias que o post inclui |

#### Retorna todos os posts

```http
  GET /post
```

#### Retorna um post específico
```http
  GET /post/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O id do post que deseja acessar |

#### Atualiza uma venda no banco de dados

```http
  PUT /post/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do post que você quer atualizar |
| `title`      | `string` | **Obrigatório**. O título do post |
| `content`      | `string` | **Obrigatório**. O conteúdo do post |

#### Deleta um post baseado no seu ID

```http
  DELETE /post/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `int` | **Obrigatório**. O ID do post que você quer deletar |

#### Deleta o seu usuário do banco de dados

```http
  DELETE /user/me
``` 

#### Procura posts com base no termo pesquisado

```http
  GET /post/search?q=:searchTerm
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `searchTerm`      | `string` | **Obrigatório**. O termo que deseja pesquisar |


## Referência

 - Trybe -> Todos os arquivos que não estão na pasta Src, excluindo os 'config', 'seeders' e 'servers' foram fornecidos pela Trybe.

