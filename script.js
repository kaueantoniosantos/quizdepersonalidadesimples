//cada alternativa vai ser direcionada a uma categoria, por exemplo, a pergunta é: o que você faria se fosse mordido por um animal? ai tem as alternativa, a primeira é: eu manteria a calma, e a segunda é: eu gritaria, seguindo as alternativas, a primeira seria direcionada para as pessoas mais calmas e a segunda para as pessoas mais estressadas, e por ai vai.

//agora eu vou definir as respostas finais, que foram obtidas a partir das alternativas escolhidas. 

const finalResults = {
    'Guerreiro': {
        titulo: 'Você é um Guerreiro!',
        descricao: 'Corajoso, destemido e sempre pronto para a batalha.'
    }, 
    'Mago': {
        titulo: 'Você é um Mago!',
        descricao: 'Sábio, misterioso e com um conhecimento vasto.'
    }, 
    'Ladrão': {
        titulo: 'Você é um Ladrão',
        descricao: 'Ágil, discreto e mestre em se adaptar a qualquer situação.'
    }
};

//agora eu vou fazer um array(lista) de perguntas que vão estar associadas as categorias que eu pré estabeleci

const quizData = [
    {
        pergunta: "Em uma situação de perigo, o que você faz primeiro?",
        opcoes: [
            { texto: "Parte para o confronto direto.", categoria: 'Guerreiro' },
            { texto: "Procura uma solução mágica ou tática.", categoria: 'Mago' },
            { texto: "Tenta fugir ou se esconder discretamente.", categoria: 'Ladrão' }
        ]
    },
    {
        pergunta: "Qual objeto você carregaria em uma aventura?",
        opcoes: [
            { texto: "Uma espada pesada e um escudo.", categoria: 'Guerreiro' },
            { texto: "Um cajado antigo e livros de feitiços.", categoria: 'Mago' },
            { texto: "Um capuz, um par de adagas e uma corda.", categoria: 'Ladrão' }
        ]
    },
    {
        pergunta: "Você encontra um obstáculo intransponível (um muro alto) em seu caminho. Qual sua abordagem?",
        opcoes: [
            { texto: "Arrombar ou escalar à força, chamando a atenção se necessário.", categoria: 'Guerreiro' },
            { texto: "Procurar uma forma de transpor (levitar, teletransportar ou criar uma passagem).", categoria: 'Mago' },
            { texto: "Buscar uma rota alternativa discreta ou esperar a oportunidade certa para passar sem ser visto.", categoria: 'Ladrão' }
        ]
    },
    {
        pergunta: "Você precisa convencer um guarda a deixá-lo passar. O que você faz?",
        opcoes: [
            { texto: "Desafia-o para um duelo justo: a vitória é a passagem.", categoria: 'Guerreiro' },
            { texto: "Usa palavras persuasivas e, se preciso, uma pequena ilusão para confundi-lo.", categoria: 'Mago' },
            { texto: "Oferece um suborno generoso ou o distrai rapidamente com uma manobra.", categoria: 'Ladrão' }
        ]
    },
    {
        pergunta: "Qual recurso é o mais valioso para você em uma missão?",
        opcoes: [
            { texto: "Sua força física e resistência.", categoria: 'Guerreiro' },
            { texto: "Seu intelecto e conhecimento de segredos antigos.", categoria: 'Mago' },
            { texto: "Sua agilidade e a capacidade de se misturar às sombras.", categoria: 'Ladrão' }
        ]
    }
]

//agora eu vou descobrir qual foi a maior contagem de respostas associadas a uma categoria.

function calcularResultado() {
    //aqui eu vou falar que cada categoria vai iniciar com zero, ou seja sem nenhum peso para interferir na resposta
    const categoryCounts = { 'Guerreiro': 0, 'Mago': 0, 'Ladrão': 0 };

    //aqui eu vou pegar todas as alternativas que foram escolhidas (radio buttons)
    const checkedOptions = document.querySelectorAll('input[type="radio"]:checked');

    //isso aqui me permite ver se EXISTE alguma coisa escolhida no quiz e caso isso for ao contrario, pode mandar um alerta falando que é para enviar tudo estando selecionado
    if (checkedOptions.length !== quizData.length){
        alert('Por favor, responda a todas as perguntas!');
        return;
    }

    //o forEach serve para analisar cada item de uma lista. nesse caso ele vai vereficar se existe algum item com valor, e caso esse mesmo item obtenha valor ele vai adicionar mais uma coisa, independente do que for vai existir o número 1 nele
    checkedOptions.forEach(input => {
        const categoriaEscolhida = input.value;
        categoryCounts[categoriaEscolhida]++;
    });

    let resultadoFinal = '';
    let maxContagem = -1;

    //um laço de repetição, para as categorias do categoryCounts, ele só vai repetir se alguma categoria do categoryCounts for maior que a maxContagem, ou seja a categoria foi definida como 0 lá em cima e o maxContagem como -1, ou seja a categoria do categoryCounts é maior que o maxContagem, então é verdadeiro e ele vai rolar o laço de repetição, fazendo o maxContagem alterar seu valor virando 0, e o resultado final é igual a 0
    for(const categoria in categoryCounts) {
        if (categoryCounts[categoria] > maxContagem) {
            maxContagem = categoryCounts[categoria];
            resultadoFinal = categoria;
        }
    }

    //vamos exibir toda essa bagaça 
    const result = finalResults[resultadoFinal];
    document.getElementById('final-result').innerHTML = ` <strong>${result.titulo}</strong>
    <p>${result.descricao}</p>
    `;

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('submit-button').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

document.getElementById('submit-button').addEventListener('click', calcularResultado);

function renderQuiz() {
    const container = document.getElementById('quiz-container');
    let htmlContent = '';

    quizData.forEach((item, index) => {
        htmlContent += `<div class="question-block"><h4>${index + 1}. ${item.pergunta}</h4>`;
        item.opcoes.forEach(opcao => {
            htmlContent += `
            <label class="option-label">
                <input type="radio" name="q${index}" value="${opcao.categoria}">
                ${opcao.texto}
            </label><br>
            `;
        })
        htmlContent += `</div>`;
    });

    container.innerHTML = htmlContent;
    document.getElementById('submit-button').style.display = 'block';
}

renderQuiz();