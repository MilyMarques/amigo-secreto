let amigos = [];

function adicionar() {
    let campoNome = document.getElementById('nome-amigo');
    let nome = campoNome.value.trim();

    if (nome === '') {
        alert('Por favor, digite o nome do amigo.');
        return;
    }

    // Verifica se o nome já está na lista:
    let jaExiste = amigos.some(
        amigo => amigo.toLowerCase() === nome.toLowerCase()
    );

    if(jaExiste) {
        alert('Amigo já adicionado.');
        return;
    }

    // Atualiza a lista de amigos na tela:
    amigos.push(nome);
    atualizarLista();

    campoNome.value = '';   // Limpa o campo de entrada
};

function sortear() {
    if(amigos.length < 4) {
        alert('É necessário pelo menos 4 amigos para realizar o sorteio.');
        return;
    };

    // embaralha(amigos);
    
    let amigosSorteados = [...amigos]   // Cria uma cópia do array original:
    embaralha(amigosSorteados);   // Embaralha apenas a cópia

    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';

    for(let i = 0; i < amigos.length; i++) {
        if(i === amigos.length - 1) {
            sorteio.innerHTML = sorteio.innerHTML + amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
            sorteio.innerHTML = sorteio.innerHTML + amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        };
    };
};

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function embaralha(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);

        // atribuição via destructuring
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';   // Limpa o sorteio anterior
};

function atualizarLista() {
    let listaDeAmigos = document.getElementById('lista-amigos');
    listaDeAmigos.innerHTML = '';     // Limpa a lista de amigos

    for(let i = 0; i < amigos.length; i++) {
        // Cria um elemento/item para cada amigo:
        let item = document.createElement('div');
        item.classList.add('amigo-item');

        let nome = document.createElement('span');
        nome.textContent = amigos[i];

        let botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = '❌';
        botaoExcluir.classList.add('botao-excluir');

        // Cria um evento de clique para excluir o amigo:
        botaoExcluir.addEventListener('click', function() {
            excluirAmigo(i)
        });

        // Adiciona item à lista de amigos:
        item.appendChild(nome);
        item.appendChild(botaoExcluir);
        listaDeAmigos.appendChild(item)

    };
};

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
};

// Adicionar Opção de Excluir Amigos da Lista: Essa modificação cria elementos de parágrafo <p> para cada amigo na lista. Em seguida, adiciona um ouvinte de evento de clique a cada parágrafo, que chama a função excluirAmigo com o índice correspondente.