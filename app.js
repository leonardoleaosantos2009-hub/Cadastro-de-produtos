const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Elementos da interface
const formproduto = document.getElementById("formproduto");
const inputId = document.getElementById("produtoId");
const inputNome = document.getElementById("nome");
const inputDescricao = document.getElementById("descricao");
const inputQuantidade = document.getElementById("quantidade");
const inputPreco = document.getElementById("preco");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tabelaCorpo = document.getElementById("tabelaCorpo");
const statusMensagem = document.getElementById("statusMensagem");

function exibirFeedback(texto, sucesso = true) {
  statusMensagem.style.display = "block";
  statusMensagem.style.backgroundColor = sucesso ? "#d4edda" : "#f8d7da";
  statusMensagem.style.color = sucesso ? "#155724" : "#721c24";
  statusMensagem.textContent = texto;
  setTimeout(() => {
    statusMensagem.style.display = "none";
  }, 3500);
}

// 1. GET: Carregar e renderizar produtos ativas
async function listarprodutos() {
  try {
    const response = await api.get("/produtos");
    tabelaCorpo.innerHTML = "";

    response.data.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.nome}</td>
        <td>${p.descricao}</td>
        <td>${p.quantidade}</td>
        <td>${p.preco}</td>
        <td>
          <button class="btn-edit" onclick="prepararEdicao(${p.id}, '${p.nome}', '${p.descricao}', '${p.quantidade}', '${p.preco}')">Editar</button>
          <button class="btn-delete" onclick="desativarproduto(${p.id})">Desativar</button>
        </td>
      `;
      tabelaCorpo.appendChild(tr);
    });
  } catch (error) {
    const msg = error.response?.data?.erro || "Erro ao carregar produtos.";
    exibirFeedback(msg, false);
  }
}

// 2. POST / PUT: Salvar cadastro (novo ou atualização)
formproduto.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = inputId.value;
  const payload = {
    nome: inputNome.value,
    descricao: inputDescricao.value,
    quantidade: inputQuantidade.value,
    preco: inputPreco.value,
  };

  try {
    if (id) {
      // PUT: Atualização
      await api.put(`/produtos/${id}`, payload);
      exibirFeedback("produto atualizado com sucesso!");
    } else {
      // POST: Novo cadastro
      await api.post("/produtos", payload);
      exibirFeedback("produto cadastrado com sucesso!");
    }
    resetarFormulario();
    listarprodutos();
  } catch (error) {
    const msg = error.response?.data?.erro || "Erro ao salvar dados.";
    exibirFeedback(msg, false);
  }
});

// 3. PATCH: Soft Delete - Desativando uma produto 0
window.desativarproduto = async function (id) {
  if (!confirm("Deseja realmente desativar este cadastro?")) return;

  try {
    const response = await api.patch(`/produtos/${id}/desativar`);
    exibirFeedback(response.data.mensagem);
    listarprodutos();
  } catch (error) {
    const msg = error.response?.data?.erro || "Erro ao desativar cadastro.";
    exibirFeedback(msg, false);
  }
};

// Preparação e Reset do formulário
window.prepararEdicao = function (id, nome, descricao, quantidade, preco) {
  inputId.value = id;
  inputNome.value = nome;
  inputDescricao.value = descricao;
  inputQuantidade.value = quantidade;
  inputPreco.value = preco;
  btnSalvar.textContent = "Atualizar";
  btnCancelar.style.display = "inline-block";
};

function resetarFormulario() {
  inputId.value = "";
  formproduto.reset();
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.style.display = "none";
}

btnCancelar.addEventListener("click", resetarFormulario);

// Carregamento inicial
listarprodutos();
