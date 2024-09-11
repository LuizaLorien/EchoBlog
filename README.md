### 1. **Visão Geral do Projeto**

O módulo de postagens do blog visa fornecer uma API para gerenciar o conteúdo de postagens, permitindo a criação, leitura, atualização e exclusão (CRUD) de postagens. 
Cada postagem deve ser capaz de incluir um título, conteúdo textual, data de publicação, autor e uma imagem associada. 
Esse módulo deve ser flexível o suficiente para permitir futuras expansões, como a adição de comentários, categorias e tags.


### 2. **Requisitos Funcionais**

### 2.1. **Postagens**

- **RF01 - Criar Postagem**
    - O sistema deve permitir a criação de uma nova postagem com as seguintes informações:
        - `titulo` (obrigatório): Título da postagem.
        - `conteudo` (obrigatório): Texto ou corpo da postagem.
        - `dataPublicacao` (automático): Data e hora da criação da postagem.
        - `autor` (obrigatório): Nome ou identificador do autor da postagem.
        - `imagem` (opcional): URL ou caminho para a imagem associada à postagem.
    - **Endpoint:** `POST /postagens`
    - **Validação:** Os dados de entrada devem ser validados utilizando um esquema de validação adequado (por exemplo, utilizando a biblioteca Zod).
- **RF02 - Listar Postagens**
    - O sistema deve permitir a listagem de todas as postagens, com suporte à paginação.
        - A listagem deve incluir:
            - `totalPostagens`: Total de postagens cadastradas.
            - `totalPaginas`: Número total de páginas.
            - `paginaAtual`: Página atual sendo visualizada.
            - `itemsPorPagina`: Número de postagens por página.
            - `proximaPagina`: URL para acessar a próxima página, se aplicável.
            - `postagens`: Lista de postagens da página atual.
    - **Endpoint:** `GET /postagens`
    - **Parâmetros:**
        - `page` (opcional): Número da página. Valor padrão: `1`.
        - `limit` (opcional): Número de itens por página. Valor padrão: `10`.
- **RF03 - Buscar Postagem por ID**
    - O sistema deve permitir a busca de uma postagem específica pelo seu ID.
        - **Validação:** O ID deve ser validado utilizando um esquema de validação.
        - Se a postagem não for encontrada, o sistema deve retornar uma resposta de `404`.
    - **Endpoint:** `GET /postagens/:id`
- **RF04 - Atualizar Postagem**
    - O sistema deve permitir a atualização de uma postagem específica pelo seu ID.
        - Campos que podem ser atualizados:
            - `titulo`
            - `conteudo`
            - `imagem`
        - **Validação:** O ID e os dados de entrada devem ser validados utilizando esquemas de validação apropriados.
        - Se a postagem não for encontrada, o sistema deve retornar uma resposta de `404`.
    - **Endpoint:** `PUT /postagens/:id`
- **RF05 - Excluir Postagem**
    - O sistema deve permitir a exclusão de uma postagem específica pelo seu ID.
        - **Validação:** O ID deve ser validado utilizando um esquema de validação.
        - Se a postagem não for encontrada, o sistema deve retornar uma resposta de `404`.
    - **Endpoint:** `DELETE /postagens/:id`
- **RF06 - Upload de Imagem para Postagem**
    - O sistema deve permitir o upload de uma imagem associada a uma postagem.
        - O upload da imagem deve ser feito no momento da criação ou atualização da postagem.
        - A imagem deve ser armazenada em um diretório específico no projeto.
    - **Endpoint:** `POST /postagens/:id/imagem`
    - **Validação:** A imagem deve ser validada quanto ao tamanho máximo permitido e tipo de arquivo (por exemplo, JPEG, PNG).
 
    - ### 3. **Requisitos Não Funcionais**

### 3.1. **Performance**

- O sistema deve ser capaz de gerenciar até 10.000 postagens com tempo de resposta inferior a 200ms para operações de leitura.

### 3.2. **Segurança**

- Validação de dados de entrada deve ser realizada para todas as operações utilizando a biblioteca Zod ou similar.
- Implementação de mecanismos de autenticação e autorização para garantir que apenas usuários autorizados possam criar, atualizar ou excluir postagens.

### 3.3. **Manutenibilidade**

- O código deve seguir boas práticas de design de software, como o uso de camadas (controladores, serviços, repositórios).

### 3.4. **Escalabilidade**

- O sistema deve ser desenvolvido de forma modular para permitir a fácil adição de novas funcionalidades, como a gestão de comentários, categorias e tags no futuro.

---

### 4. **Restrições**

- O sistema deve ser implementado utilizando Node.js com Express.
- O banco de dados utilizado será MYSQL.
- O sistema deve estar preparado para integração com bibliotecas de validação (Zod) e ORM (Sequelize ou Prisma).

---

### 5. **Fluxo de Dados**

1. **Criação de Postagem:**
    - O usuário envia uma requisição `POST` com os dados da nova postagem.
    - O sistema valida os dados e cria a postagem com a data de publicação atual.
2. **Listagem de Postagens:**
    - O usuário solicita a listagem de postagens.
    - O sistema retorna uma lista paginada de postagens.
3. **Busca de Postagem por ID:**
    - O usuário solicita uma postagem específica.
    - O sistema valida o ID e retorna a postagem ou um erro `404`.
4. **Atualização de Postagem:**
    - O usuário envia uma requisição `PUT` com dados atualizados da postagem.
    - O sistema valida os dados e atualiza a postagem correspondente.
5. **Exclusão de Postagem:**
    - O usuário envia uma requisição `DELETE` para remover uma postagem específica.
    - O sistema valida o ID e remove a postagem ou retorna um erro `404`.
6. **Upload de Imagem:**
    - O usuário envia uma imagem para ser associada a uma postagem específica.
    - O sistema valida a imagem e a armazena no local apropriado.

---

### 6. **Considerações Finais**

Este documento deve servir como uma base inicial para o desenvolvimento do módulo de postagens do blog. À medida que o projeto evolui, 
novos requisitos e funcionalidades podem ser adicionados para enriquecer o sistema.
Quaisquer mudanças devem ser documentadas e formalizadas em versões futuras deste documento.


-----------------------------------------------------------------------------------------------------------------------------------------


# **Feature/autor-postagem**

### 1. **Usuários**

- **RF01 - Registro de Usuário**
    - O sistema deve permitir que novos usuários se registrem fornecendo:
        - `nome` (obrigatório): Nome completo do usuário.
        - `email` (obrigatório e único): Endereço de email do usuário.
        - `senha` (obrigatório): Senha de acesso.
        - `imagem` (opcional):  URL ou caminho para a imagem associada à usuário.
        - `papel` (opcional): Tipo de usuário (`administrador`, `autor`, `leitor`). O valor padrão é `leitor`.
    - **Endpoint:** `POST /usuarios/registro`
    - **Validação:** Os dados de entrada devem ser validados utilizando um esquema de validação (como Zod). A senha deve ter uma força mínima (ex.: pelo menos 8 caracteres, contendo letras e números).
- **RF02 - Atualização de Perfil de Usuário**
    - O sistema deve permitir que o usuário atualize suas informações de perfil, como nome, imagem, e-mail e senha.
    - **Endpoint:** `PUT /usuarios/:id`
    - **Validação:** Os dados de entrada devem ser validados, e a atualização deve garantir que o e-mail permaneça único.

### 2. **Interações entre Usuários e Postagens**

- **RF03 - Associação de Usuários às Postagens**
    - Cada postagem deve ser associada a um usuário autor.
    - **Regras:**
        - Apenas usuários autenticados com papel de `autor` ou `administrador` podem criar postagens.
        - O sistema deve permitir que os usuários listem postagens filtradas por autor.
    - **Endpoints:**
        - `GET /postagens?autor=:userId` - Lista postagens por autor.
        - `POST /postagens` - Cria uma nova postagem associada ao usuário autenticado.