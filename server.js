require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// 1. GET: Listar apenas produtos ativas
app.get("/api/produtos", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM produtos WHERE ativo = TRUE ORDER BY id DESC",
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: "Falha ao buscar produtos." });
  }
});

// 2. POST: Cadastrar novo produto
app.post("/api/produtos", async (req, res) => {
  const { nome, descricao, quantidade, preco } = req.body;
  if (!nome || !descricao || !quantidade || !preco) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO produtos (nome, descricao, quantidade, preco, ativo) VALUES (?, ?, ?, ?, TRUE)",
      [nome, descricao, quantidade, preco],
    );
    res.status(201).json({ id: result.insertId, nome, descricao, quantidade, preco});
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ erro: "Este produto já está cadastrado." });
    }
    res.status(500).json({ erro: "Falha ao cadastrar produto." });
  }
});

// 3. PUT: Atualizar dados de uma produto
app.put("/api/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, quantidade, preco } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE produtos SET nome = ?, descricao = ?, quantidade = ?, preco = ? WHERE id = ?",
      [nome, descricao, quantidade, preco, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "produto não encontrado." });
    }
    res.json({ mensagem: "Cadastro atualizado com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao atualizar dados." });
  }
});

// 4. PATCH: Soft delete (desativação lógica)
app.patch("/api/produtos/:id/desativar", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      "UPDATE produtos SET ativo = FALSE WHERE id = ?",
      [id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "produto não encontrado." });
    }
    res.json({ mensagem: "produto desativado com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao desativar registro." })
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
