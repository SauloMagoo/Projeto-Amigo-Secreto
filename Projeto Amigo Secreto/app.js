// Array para armazenar os nomes
let amigos = [];

function adicionarAmigo() {
    let inputElement = document.getElementById('amigo');
    let nome = inputElement.value.trim();

    if (!nome) {
        alert('Por favor, insira um nome');
        return;
    }

    if (amigos.includes(nome)) {
        alert('O nome já existe, por favor digite outro');
        return;
    }

    amigos.push(nome);
    console.log(amigos);
    atualizarAmigos();
    limparCampo();
}

function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

// Atualizar lista de amigos 
function atualizarAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    for (let amigo of amigos) {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    }

    // Desativa o botão de sorteio se houver menos de 2 amigos
    document.getElementById('botaoSortear').disabled = amigos.length < 2;
}

// Função para embaralhar os nomes e criar pares sem repetições
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 nomes para realizar o sorteio.');
        return;
    }

    let sorteio = [...amigos];
    let resultado = [];

    // Embaralhar a lista
    for (let i = sorteio.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
    }

    // Criar pares (evitando que alguém tire a si mesmo)
    for (let i = 0; i < amigos.length; i++) {
        let amigoSecreto = sorteio[i];
        let sorteado = sorteio[(i + 1) % sorteio.length]; // Garante um ciclo
        resultado.push(`${amigoSecreto} → ${sorteado}`);
    }

    // Exibir o resultado
    const ul = document.getElementById('resultado');
    ul.innerHTML = '';

    for (let par of resultado) {
        const li = document.createElement('li');
        li.textContent = par;
        ul.appendChild(li);
    }

    dispararConfete();
}

// Função que dispara confete ao sortear o amigo
function dispararConfete() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}
