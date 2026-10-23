# Cadastro-de-produtos
Sistema Full Stack de cadastro de produtos

# Sistema de Cadastro de Produtos (Full Stack)

Aplicação Full Stack para gerenciamento e cadastro de produtos com operações de criação, consulta, atualização e desativação lógica (soft delete)[cite: 1, 8]. O projeto é estruturado de forma dividida em backend (`Node.js`, `Express`, `MySQL`) e frontend (`HTML`, `CSS`, `JavaScript`)[cite: 1, 2, 3, 8, 9].

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5 & CSS3**: Estrutura e estilização da interface gráfica[cite: 2, 3].
- **JavaScript (ES6+)**: Manipulação dinâmica de elementos e controle de estado[cite: 1].
- **Axios (CDN)**: Realização das requisições HTTP para a API RESTful[cite: 1, 2].

### Backend
- **Node.js**: Ambiente de execução para o servidor.
- **Express.js**: Criação do servidor web e gerenciamento de rotas[cite: 6, 8].
- **MySQL2**: Comunicação com banco de dados MySQL via pool de conexões[cite: 5, 6].
- **CORS**: Liberação de requisições de origens cruzadas[cite: 6, 8].
- **Dotenv**: Gerenciamento de variáveis de ambiente[cite: 4, 6].

---

## ✨ Funcionalidades

- **Listagem de Produtos**: Exibição dos produtos armazenados com status ativo no banco de dados[cite: 1, 8].
- **Cadastro de Produto**: Formulário dinâmico para inclusão de novos itens[cite: 1, 2, 8].
- **Edição de Produto**: Preenchimento do formulário com dados existentes para alteração[cite: 1, 2, 8].
- **Desativação Lógica (Soft Delete)**: Alteração do estado do registro para inativo (`ativo = false`) sem exclusão física[cite: 1, 8].
- **Feedback ao Usuário**: Alertas visuais temporários de confirmação e de erro nas operações[cite: 1, 2, 3].

---

## 🗄️ Estrutura do Banco de Dados

Execute o script SQL abaixo em seu servidor MySQL para criar o banco de dados e a tabela necessária[cite: 4, 8]:

```sql
CREATE DATABASE IF NOT EXISTS app_cadastro_produto;
USE app_cadastro_produto;

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  quantidade INT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE
);
