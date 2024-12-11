const API_URL = "http://localhost:8082/api/produtos/listar";
const carrinho = [];
const numeroWhatsApp = "5592995185056"; 

async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        exibirProdutos(data.produtos);
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function exibirProdutos(produtos) {
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";
    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("beer-card");
        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
            <input type="number" min="1" value="1" id="quantidade-${produto.id}">
            <button onclick="adicionarAoCarrinho('${produto.id}', '${produto.nome}', ${produto.preco}, 'quantidade-${produto.id}')">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
    });
}

function adicionarAoCarrinho(id, nome, preco, idQuantidade) {
    const quantidade = parseInt(document.getElementById(idQuantidade).value);
    if (quantidade < 1) {
        alert("Por favor, selecione uma quantidade válida.");
        return;
    }
    const itemIndex = carrinho.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        
        carrinho[itemIndex].quantidade += quantidade;
    } else {
        carrinho.push({ id, nome, preco, quantidade });
    }
    alert(`${quantidade} de ${nome} adicionado ao carrinho!`);
    mostrarCarrinho();
}

function mostrarCarrinho() {
    const listaCarrinho = document.getElementById("listaCarrinho");
    listaCarrinho.innerHTML = "";
    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}
            <button onclick="removerItem(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(li);
    });
}

function removerItem(index) {
    carrinho.splice(index, 1);
    mostrarCarrinho();
}

function enviarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    const enderecoCliente = document.getElementById("enderecoCliente").value;
    if (!enderecoCliente) {
        alert("Por favor, insira seu endereço.");
        return;
    }
    let mensagem = "Olá! Gostaria de fazer meu Pedido:\n";
    carrinho.forEach(item => {
        mensagem += `${item.quantidade} ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    mensagem += `Endereço: ${enderecoCliente}`;
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp);
    carrinho.length = 0;
    mostrarCarrinho();
}

carregarProdutos();