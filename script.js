/* =========================================
   ELEMENTOS E CONFIGURAÇÕES
========================================= */

const $ = (id) => document.getElementById(id);

const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

let usuario = JSON.parse(localStorage.getItem("usuarioRaizes")) || null;

let carrinho = JSON.parse(localStorage.getItem("carrinhoRaizes")) || [];

let pedidos = JSON.parse(localStorage.getItem("pedidosRaizes")) || [];

let pontos = Number(localStorage.getItem("pontosRaizes")) || 0;

let consentimentos = JSON.parse(
    localStorage.getItem("consentimentosRaizes")
) || {
    marketing: false,
    perfil: false
};

let categoriaAtual = "Todos";

let exigeLoginParaPedido = false;

/* =========================================
   UNIDADES
========================================= */

const unidades = {
    recife: {
        nome: "Recife - Espinheiro",
        horario: "Segunda a sábado: 07h às 19h",
        indisponiveis: []
    },

    olinda: {
        nome: "Olinda - Centro",
        horario: "Segunda a sábado: 07h às 18h",
        indisponiveis: ["Cuscuz recheado"]
    },

    "joao-pessoa": {
        nome: "João Pessoa - Centro",
        horario: "Segunda a domingo: 07h às 20h",
        indisponiveis: ["Tapioca de frango"]
    }
};

/* =========================================
   CARDÁPIO
========================================= */

const produtos = [
    {
        id: 1,
        nome: "Tapioca tradicional",
        categoria: "Tapiocas",
        descricao: "Tapioca quentinha com manteiga.",
        preco: 8.00,
        imagem: "imgs/tapioca.jpg"
    },

    {
        id: 2,
        nome: "Tapioca de frango",
        categoria: "Tapiocas",
        descricao: "Recheada com frango temperado.",
        preco: 14.00,
        imagem: "imgs/tapioca-frango.jpg"
    },

    {
        id: 3,
        nome: "Cuscuz tradicional",
        categoria: "Cuscuz",
        descricao: "Cuscuz nordestino com manteiga.",
        preco: 9.00,
        imagem: "imgs/cuscuz.jpg"
    },

    {
        id: 4,
        nome: "Cuscuz recheado",
        categoria: "Cuscuz",
        descricao: "Cuscuz recheado com queijo e ovos.",
        preco: 16.00,
        imagem: "imgs/cuscuz-recheado.jpg"
    },

    {
        id: 5,
        nome: "Bolo de macaxeira",
        categoria: "Bolos",
        descricao: "Bolo caseiro tradicional.",
        preco: 7.00,
        imagem: "imgs/bolo-macaxeira.jpg"
    },

    {
        id: 6,
        nome: "Suco de cajá",
        categoria: "Bebidas",
        descricao: "Suco natural de cajá geladinho.",
        preco: 8.00,
        imagem: "imgs/suco-caja.jpg"
    },

    {
        id: 7,
        nome: "Suco de graviola",
        categoria: "Bebidas",
        descricao: "Suco natural de graviola, cremoso e refrescante.",
        preco: 9.00,
        imagem: "imgs/suco-graviola.jpg"
    },

    {
        id: 8,
        nome: "Café nordestino",
        categoria: "Cafés",
        descricao: "Café passado na hora.",
        preco: 5.00,
        imagem: "imgs/cafe.jpg"
    }
];

/* =========================================
   MENSAGENS
========================================= */

function mostrarMensagem(texto) {
    const mensagem = $("mensagem");

    if (!mensagem) return;

    mensagem.textContent = texto;
    mensagem.classList.add("visivel");

    clearTimeout(window.timerMensagem);

    window.timerMensagem = setTimeout(() => {
        mensagem.classList.remove("visivel");
    }, 3000);
}

/* =========================================
   ARMAZENAMENTO
========================================= */

function salvarDados() {
    localStorage.setItem(
        "usuarioRaizes",
        JSON.stringify(usuario)
    );

    localStorage.setItem(
        "carrinhoRaizes",
        JSON.stringify(carrinho)
    );

    localStorage.setItem(
        "pedidosRaizes",
        JSON.stringify(pedidos)
    );

    localStorage.setItem(
        "pontosRaizes",
        pontos
    );

    localStorage.setItem(
        "consentimentosRaizes",
        JSON.stringify(consentimentos)
    );
}

/* =========================================
   CARROSSEL AUTOMÁTICO
========================================= */

const imagensCarrossel = [
    {
        imagem: "imgs/tapioca.jpg",
        titulo: "Tapioca tradicional",
        descricao: "Uma delícia nordestina preparada com carinho!"
    },

    {
        imagem: "imgs/tapioca-frango.jpg",
        titulo: "Tapioca de frango",
        descricao: "Muito sabor em cada pedacinho."
    },

    {
        imagem: "imgs/cuscuz.jpg",
        titulo: "Cuscuz nordestino",
        descricao: "O sabor que faz parte da nossa história."
    },

    {
        imagem: "imgs/cuscuz-recheado.jpg",
        titulo: "Cuscuz recheado",
        descricao: "Uma combinação deliciosa e especial."
    },

    {
        imagem: "imgs/bolo-macaxeira.jpg",
        titulo: "Bolo de macaxeira",
        descricao: "Aquele gostinho de receita de família."
    },

    {
        imagem: "imgs/suco-caja.jpg",
        titulo: "Suco de cajá",
        descricao: "Refrescância e sabor regional."
    },

    {
        imagem: "imgs/suco-graviola.jpg",
        titulo: "Suco de graviola",
        descricao: "Uma bebida cremosa e refrescante."
    }
];

let indiceCarrossel = 0;

function atualizarCarrossel() {
    const imagem = $("imagem-carrossel");
    const titulo = $("titulo-carrossel");
    const descricao = $("descricao-carrossel");

    if (!imagem || !titulo || !descricao) return;

    const item = imagensCarrossel[indiceCarrossel];

    imagem.style.opacity = "0";

    setTimeout(() => {
        imagem.src = item.imagem;
        imagem.alt = item.titulo;

        titulo.textContent = item.titulo;
        descricao.textContent = item.descricao;

        imagem.style.opacity = "1";
    }, 350);
}

function iniciarCarrossel() {
    atualizarCarrossel();

    setInterval(() => {
        indiceCarrossel =
            (indiceCarrossel + 1) % imagensCarrossel.length;

        atualizarCarrossel();
    }, 4000);
}

/* =========================================
   CARDÁPIO E CATEGORIAS
========================================= */

function renderizarCardapio() {
    const cardapio = $("cardapio");

    if (!cardapio) return;

    const pesquisa = $("pesquisa").value.toLowerCase();

    const unidadeSelecionada = $("unidade").value;

    const unidade = unidades[unidadeSelecionada];

    cardapio.innerHTML = "";

    const filtrados = produtos.filter(produto => {
        const combinaCategoria =
            categoriaAtual === "Todos" ||
            produto.categoria === categoriaAtual;

        const combinaPesquisa =
            produto.nome.toLowerCase().includes(pesquisa) ||
            produto.descricao.toLowerCase().includes(pesquisa);

        return combinaCategoria && combinaPesquisa;
    });

    if (filtrados.length === 0) {
        cardapio.innerHTML = `
            <p class="vazio">
                Nenhum produto encontrado.
            </p>
        `;
        return;
    }

    filtrados.forEach(produto => {
        const indisponivel =
            unidade.indisponiveis.includes(produto.nome);

        const elemento = document.createElement("article");

        elemento.className = "produto";

        elemento.innerHTML = `
            <div class="produto-imagem">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    onerror="this.style.display='none'; this.parentElement.textContent='🍽️';"
                >
            </div>

            <div class="produto-conteudo">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <strong class="preco">
                    ${formatarMoeda(produto.preco)}
                </strong>

                ${
                    indisponivel
                    ? `<p class="indisponivel">Indisponível nesta unidade</p>`
                    : `<button
                        class="btn-adicionar"
                        onclick="adicionarCarrinho(${produto.id})">
                        + Adicionar
                    </button>`
                }

            </div>
        `;

        cardapio.appendChild(elemento);
    });
}

function configurarCategorias() {
    document.querySelectorAll(".categoria").forEach(botao => {
        botao.addEventListener("click", () => {

            document.querySelectorAll(".categoria")
                .forEach(item => item.classList.remove("ativa"));

            botao.classList.add("ativa");

            categoriaAtual = botao.dataset.categoria;

            renderizarCardapio();
        });
    });
}

/* =========================================
   PROMOÇÕES
========================================= */

function renderizarPromocoes() {
    const promocoes = $("promocoes");

    if (!promocoes) return;

    const ofertas = [
        {
            titulo: "☕ Café da manhã",
            descricao: "Comece o dia com o sabor do Nordeste!"
        },

        {
            titulo: "🥥 Tapioca especial",
            descricao: "Aproveite nossas deliciosas tapiocas."
        },

        {
            titulo: "🥤 Bebidas regionais",
            descricao: "Experimente nossos sucos de frutas nordestinas."
        }
    ];

    promocoes.innerHTML = ofertas.map(oferta => `
        <div class="promocao">
            <strong>${oferta.titulo}</strong>
            <p>${oferta.descricao}</p>
        </div>
    `).join("");
}

/* =========================================
   UNIDADES
========================================= */

function atualizarUnidade() {
    const unidade = $("unidade");

    if (!unidade) return;

    const informacao = unidades[unidade.value];

    $("horarioUnidade").textContent =
        informacao.horario;

    renderizarCardapio();
}

$("unidade").addEventListener("change", atualizarUnidade);

/* =========================================
   CARRINHO
========================================= */

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    const unidade = unidades[$("unidade").value];

    if (unidade.indisponiveis.includes(produto.nome)) {
        mostrarMensagem("Produto indisponível nesta unidade.");
        return;
    }

    const existente = carrinho.find(item => item.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    salvarDados();
    renderizarCarrinho();

    mostrarMensagem("Produto adicionado ao carrinho!");
}

function alterarQuantidade(id, alteracao) {
    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    item.quantidade += alteracao;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    salvarDados();
    renderizarCarrinho();
}

function calcularTotal() {
    return carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );
}

function renderizarCarrinho() {
    const elemento = $("carrinho");

    if (!elemento) return;

    if (carrinho.length === 0) {
        elemento.innerHTML = `
            <p class="vazio">
                Seu carrinho está vazio.
                Que tal escolher alguma delícia?
            </p>
        `;
    } else {
        elemento.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">

                <div>
                    <strong>${item.nome}</strong>
                    <p>${formatarMoeda(item.preco)}</p>
                </div>

                <div class="controles">

                    <button onclick="alterarQuantidade(${item.id}, -1)">
                        -
                    </button>

                    <strong>${item.quantidade}</strong>

                    <button onclick="alterarQuantidade(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>
        `).join("");
    }

    $("total").textContent = formatarMoeda(calcularTotal());
}

/* =========================================
   CHECKOUT - EXIGE LOGIN
========================================= */

function abrirCheckout() {

    // Impede a finalização sem uma conta conectada
    if (!usuario) {
        exigeLoginParaPedido = true;

        mostrarMensagem(
            "Para finalizar seu pedido, entre ou crie uma conta."
        );

        mostrarTela("telaAuth");
        return;
    }

    if (carrinho.length === 0) {
        mostrarMensagem("Adicione produtos antes de finalizar.");
        return;
    }

    exigeLoginParaPedido = false;

    const resumo = $("resumoCheckout");

    resumo.innerHTML = `
        <div class="pedido">

            <h3>Resumo do pedido</h3>

            ${carrinho.map(item => `
                <p>
                    ${item.quantidade}x ${item.nome}
                    - ${formatarMoeda(item.preco * item.quantidade)}
                </p>
            `).join("")}

            <hr>

            <div class="total">
                <strong>Total:</strong>
                <strong>${formatarMoeda(calcularTotal())}</strong>
            </div>

            <p>Unidade: ${unidades[$("unidade").value].nome}</p>

        </div>
    `;

    mostrarTela("telaCheckout");
}

$("btnFinalizar").addEventListener("click", abrirCheckout);

/* =========================================
   CONFIRMAÇÃO DO PEDIDO
========================================= */

function confirmarPedido() {

    // Segunda verificação para impedir pedidos sem login
    if (!usuario) {
        exigeLoginParaPedido = true;

        mostrarMensagem(
            "Você precisa entrar em uma conta para realizar um pedido."
        );

        mostrarTela("telaAuth");
        return;
    }

    if (carrinho.length === 0) {
        mostrarMensagem("Seu carrinho está vazio.");
        return;
    }

    const pagamento = $("pagamento").value;

    const total = calcularTotal();

    const novoPedido = {
        numero: Date.now(),
        cliente: usuario.nome,
        email: usuario.email,
        itens: [...carrinho],
        total: total,
        pagamento: pagamento,
        unidade: unidades[$("unidade").value].nome,
        data: new Date().toLocaleString("pt-BR"),
        status: "Pedido recebido"
    };

    pedidos.unshift(novoPedido);

    // Demonstração do programa de fidelidade:

    pontos += Math.floor(total);

    carrinho = [];

    exigeLoginParaPedido = false;

    salvarDados();

    renderizarCarrinho();
    renderizarPedidos();
    atualizarPontos();

    mostrarTela("telaPrincipal");

    mostrarMensagem("Pedido realizado com sucesso!");

    $("secaoCarrinho").scrollIntoView({
        behavior: "smooth"
    });
}

$("confirmarPedido").addEventListener(
    "click",
    confirmarPedido
);

/* =========================================
   HISTÓRICO DE PEDIDOS
========================================= */

function renderizarPedidos() {
    const elemento = $("meusPedidos");

    if (!elemento) return;

    if (pedidos.length === 0) {
        elemento.innerHTML = `
            <p class="vazio">
                Você ainda não possui pedidos.
            </p>
        `;
        return;
    }

    elemento.innerHTML = pedidos.map(pedido => `
        <div class="pedido">

            <h3>Pedido #${String(pedido.numero).slice(-6)}</h3>

            <p><strong>Data:</strong> ${pedido.data}</p>

            <p><strong>Unidade:</strong> ${pedido.unidade}</p>

            <p><strong>Pagamento:</strong> ${pedido.pagamento}</p>

            <p><strong>Total:</strong> ${formatarMoeda(pedido.total)}</p>

            <p>
                <strong>Produtos:</strong>
                ${pedido.itens.map(item =>
                    `${item.quantidade}x ${item.nome}`
                ).join(", ")}
            </p>

            <span class="status">${pedido.status}</span>

        </div>
    `).join("");
}

/* =========================================
   FIDELIDADE
========================================= */

function atualizarPontos() {
    $("pontos").textContent = pontos;
}

/* =========================================
   LOGIN E CADASTRO
========================================= */

let modoCadastro = false;

function configurarAbas() {
    $("abaLogin").addEventListener("click", () => {
        modoCadastro = false;

        $("abaLogin").classList.add("ativa");
        $("abaCadastro").classList.remove("ativa");

        $("nome").hidden = true;
        $("telefone").hidden = true;

        $("nome").required = false;
        $("telefone").required = false;

        $("btnAuth").textContent = "Entrar";
    });

    $("abaCadastro").addEventListener("click", () => {
        modoCadastro = true;

        $("abaCadastro").classList.add("ativa");
        $("abaLogin").classList.remove("ativa");

        $("nome").hidden = false;
        $("telefone").hidden = false;

        $("nome").required = true;
        $("telefone").required = true;

        $("btnAuth").textContent = "Criar conta";
    });
}

$("formAuth").addEventListener("submit", event => {
    event.preventDefault();

    const email = $("email").value.trim();
    const senha = $("senha").value;

    if (modoCadastro) {

        usuario = {
            nome: $("nome").value.trim(),
            email: email,
            telefone: $("telefone").value.trim(),
            senha: senha
        };

        salvarDados();

        mostrarMensagem("Cadastro realizado com sucesso!");

    } else {

        if (
            !usuario ||
            usuario.email !== email ||
            usuario.senha !== senha
        ) {
            mostrarMensagem("E-mail ou senha incorretos.");
            return;
        }

        mostrarMensagem("Bem-vindo de volta!");
    }

    atualizarUsuario();

    $("formAuth").reset();

    // Depois do login, libera a finalização do pedido
    if (exigeLoginParaPedido) {
        exigeLoginParaPedido = false;

        mostrarTela("telaPrincipal");

        setTimeout(() => {
            abrirCheckout();
        }, 300);

        return;
    }

    mostrarTela("telaPrincipal");
});

function atualizarUsuario() {
    $("btnLogin").textContent =
        usuario ? "Minha conta" : "Entrar";
}

$("btnLogin").addEventListener("click", () => {
    exigeLoginParaPedido = false;
    mostrarTela("telaAuth");
});

// Impede fechar a tela de login se ela foi aberta
// obrigatoriamente durante a tentativa de finalizar um pedido.
$("fecharAuth").addEventListener("click", () => {

    if (exigeLoginParaPedido && !usuario) {
        mostrarMensagem(
            "Entre ou crie uma conta para continuar com seu pedido."
        );
        return;
    }

    exigeLoginParaPedido = false;

    mostrarTela("telaPrincipal");
});

/* =========================================
   LGPD - CONSENTIMENTOS
========================================= */

function abrirAvisoLGPD() {
    const jaEscolheu = localStorage.getItem(
        "lgpdEscolhidaRaizes"
    );

    if (!jaEscolheu) {
        $("avisoLGPD").classList.add("aberto");
    }
}

$("aceitarLGPD").addEventListener("click", () => {
    consentimentos.marketing =
        $("aceiteMarketingInicial").checked;

    salvarDados();

    localStorage.setItem("lgpdEscolhidaRaizes", "true");

    $("avisoLGPD").classList.remove("aberto");

    mostrarMensagem("Preferências de privacidade salvas!");
});

function abrirPrivacidade() {
    atualizarDadosPrivacidade();

    mostrarTela("telaPrivacidade");
}

function atualizarDadosPrivacidade() {
    const dados = $("dadosUsuario");

    dados.innerHTML = usuario
        ? `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>E-mail:</strong> ${usuario.email}</p>
            <p><strong>Telefone:</strong> ${usuario.telefone}</p>
        `
        : `
            <p>Você ainda não entrou em uma conta.</p>
        `;

    $("consentimentoMarketing").checked =
        consentimentos.marketing;

    $("consentimentoPerfil").checked =
        consentimentos.perfil;
}

$("btnPrivacidade").addEventListener(
    "click",
    abrirPrivacidade
);

$("salvarConsentimentos").addEventListener("click", () => {
    consentimentos.marketing =
        $("consentimentoMarketing").checked;

    consentimentos.perfil =
        $("consentimentoPerfil").checked;

    salvarDados();

    mostrarMensagem("Suas preferências foram atualizadas!");
});

$("solicitarDados").addEventListener("click", () => {
    atualizarDadosPrivacidade();

    mostrarMensagem("Seus dados cadastrados estão exibidos acima.");
});

$("excluirDados").addEventListener("click", () => {
    const confirmar = confirm(
        "Deseja realmente excluir os dados desta conta neste protótipo? Esta ação não poderá ser desfeita."
    );

    if (!confirmar) return;

    usuario = null;
    carrinho = [];
    pedidos = [];
    pontos = 0;
    exigeLoginParaPedido = false;

    consentimentos = {
        marketing: false,
        perfil: false
    };

    salvarDados();

    localStorage.removeItem("lgpdEscolhidaRaizes");

    renderizarCarrinho();
    renderizarPedidos();
    atualizarPontos();
    atualizarUsuario();
    atualizarDadosPrivacidade();

    mostrarMensagem("Dados locais da conta excluídos.");

    mostrarTela("telaPrincipal");
});

/* =========================================
   NAVEGAÇÃO
========================================= */

function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("visivel");
    });

    const tela = $(id);

    if (tela) {
        tela.classList.add("visivel");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.querySelectorAll("[data-voltar]").forEach(botao => {
    botao.addEventListener("click", () => {
        mostrarTela("telaPrincipal");
    });
});

document.querySelectorAll("[data-atalho]").forEach(botao => {
    botao.addEventListener("click", () => {

        const destino = botao.dataset.atalho;

        if (destino === "inicio") {
            mostrarTela("telaPrincipal");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (destino === "cardapio") {
            mostrarTela("telaPrincipal");
            $("cardapio").scrollIntoView({ behavior: "smooth" });
        }

        if (destino === "carrinho") {
            mostrarTela("telaPrincipal");
            $("secaoCarrinho").scrollIntoView({ behavior: "smooth" });
        }

        if (destino === "pedidos") {
            mostrarTela("telaPrincipal");
            $("meusPedidos").scrollIntoView({ behavior: "smooth" });
        }

        if (destino === "privacidade") {
            abrirPrivacidade();
        }
    });
});

/* =========================================
   PESQUISA
========================================= */

$("pesquisa").addEventListener("input", renderizarCardapio);

/* =========================================
   INICIALIZAÇÃO
========================================= */

function iniciarAplicativo() {

    configurarAbas();
    configurarCategorias();

    iniciarCarrossel();

    renderizarPromocoes();
    renderizarCardapio();
    renderizarCarrinho();
    renderizarPedidos();

    atualizarUnidade();
    atualizarPontos();
    atualizarUsuario();

    if (!$("telaPrincipal").classList.contains("visivel")) {
        mostrarTela("telaPrincipal");
    }

    abrirAvisoLGPD();
}

document.addEventListener("DOMContentLoaded", iniciarAplicativo);
