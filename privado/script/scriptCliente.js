document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", function() {
        cadastrarCliente();
        alert('Cliente cadastrado com sucesso!'); // Chama a função cadastrarCliente() quando o botão for clicado
    });

    function obterIdDoCookie() {
        const cookies = document.cookie.split(';');
        let id = null;
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'id') {
                id = value;
            }
        });
        return id;
    }

    function topFunction() {
        document.body.scrollTop = 0; // Para navegadores Safari
        document.documentElement.scrollTop = 0; // Para navegadores modernos
    }
    
    var btnCadastrar = document.getElementById("btnEditar");
    // Adicionar evento de clique ao botão de cadastrar
    btnCadastrar.addEventListener("click", function() {
        const id = obterIdDoCookie();
        console.log("ID DA URL DENTRO NA HORA QUE CLICA NO BOTAO",id);
            Editar(id)
    });

    function Editar(id) {
        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;
    
        const cliente = { id, nome, cpf, endereco, email, telefone };
        console.log(cliente);
    
        fetch(`http://localhost:3000/clientes/${id}`, { // Use interpolação de strings (`) aqui
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((dados) => {
                if (dados.status) {
                   // formularioCliente.reset();
                    alert('Cliente atualizado com sucesso!');
                     location.reload();
                   // mostrarMensagem(dados.mensagem, true);
                    // buscarClientes();
                } else {
                    mostrarMensagem(dados.mensagem, false);
                }
            })
            .catch((erro) => {
                mostrarMensagem(erro.message, false);
            });
            
    }
    

function cadastrarCliente(){

    const cpf =document.getElementById('cpf') .value;
    const nome =document.getElementById('nome') .value;
    const email =document.getElementById('email') .value;
    const endereco =document.getElementById('endereco') .value;
    const telefone =document.getElementById('telefone') .value;

    const cliente = { nome,cpf,endereco,email,telefone};
    console.log(cliente);

   // cadastrarCliente(cliente);
    fetch('http://localhost:3000/clientes/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(cliente)
    })
    .then((resposta)=>{
        return resposta.json();
    })
    .then((dados)=>{
        if (dados.status){
            formularioCliente.reset();
            mostrarMensagem(dados.mensagem, true);
         //   buscarClientes();
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
    })
    .catch((erro)=>{
        mostrarMensagem(erro.message, false);
    });
    location.reload();

}

function buscarClientes() {
    fetch('http://localhost:3000/clientes', { method: 'GET' })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados)) {
                montarTabela(dados);
            }
        })
        .catch((erro) => {
            mostrarMensagem(erro.mensagem, false);
        });
}
window.onload = function() {
    buscarClientes(); // Chame sua função aqui
};
//---------------------------------------------------------------------------------EXECLUIR----------------------------------------------
function excluir(id) {
    fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Erro ao excluir cliente');
            }
        })
        .then((dados) => {
            // Aqui você pode tratar a resposta, se necessário
            alert('Cliente excluído com sucesso!');
            // Depois que o cliente for excluído, você pode atualizar a tabela
            buscarClientes();
        })
        .catch((erro) => {
            // Trate o erro aqui
            console.error('Erro ao excluir cliente:', erro);
            mostrarMensagem(erro.message, false);
        });
        location.reload();
}


//-------------------------------------------------------------------------------consultar
window.onload = function() {
    buscarClientes(); // Chame sua função aqui
};

function montarTabela(dados) {
    var corpoTabela = document.getElementById('corpo-tabela');

    // Limpa qualquer conteúdo pré-existente na tabela
    corpoTabela.innerHTML = '';

    // Loop pelos dados e cria as linhas da tabela
    dados.forEach(function(item) {
        var tr = document.createElement('tr');

        // Loop pelos campos e cria as células da linha
        Object.keys(item).forEach(function(key) {
            var td = document.createElement('td');
            td.textContent = item[key];
            tr.appendChild(td);
        });

        // Criação de botões para atualizar e excluir
        var tdAcoes = document.createElement('td');
        var btnAtualizar = document.createElement('button');
        btnAtualizar.textContent = 'Atualizar';
        btnAtualizar.className = 'btn btn-editar';
        btnAtualizar.onclick = function() {
            topFunction();
            document.getElementById("btnCadastrar").disabled = true;
            // Chamada da função para preencher os inputs com os dados do cliente selecionado
            selecionarCliente(item.codigo, item.cpf, item.nome, item.email, item.endereco, item.telefone);
        };
        var btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn btn-excluir';
        btnExcluir.onclick = function() {
            // Chamada da função para excluir o cliente com o ID correspondente
            excluir(item.codigo);
        };
        tdAcoes.appendChild(btnAtualizar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);

        corpoTabela.appendChild(tr);
    });
}

// Função para preencher os inputs com os dados do cliente selecionado
function selecionarCliente(id, cpf, nome, email, endereco, telefone) {
    // Verifica se os elementos HTML existem
    if (document.getElementById('cpf') && 
        document.getElementById('nome') && document.getElementById('email') && 
        document.getElementById('endereco') && document.getElementById('telefone')) {
        // Define os valores nos campos de entrada
        document.getElementById('cpf').value = cpf;
        document.getElementById('nome').value = nome;
        document.getElementById('email').value = email;
        document.getElementById('endereco').value = endereco;
        document.getElementById('telefone').value = telefone;

        // Redireciona para a página de edição com o id como parâmetro na URL
        document.cookie = `id=${id}`;
    } else {
        console.error('Elementos HTML não encontrados.');
    }
}
});
