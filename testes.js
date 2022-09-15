function som_rolar_dados() {
    const dado = new Audio('roll_dice.wav');
    dado.play();
}

function som_pegar_dados() {
    const dado = new Audio('get_dice.wav');
    dado.play();
}

/* -------------------------
    TESTE
    ------------------------- */
function teste_de_pericia() {
    const dados_atributo = document.querySelector('#dados-teste-atributo').value;
    const dados_pericia = document.querySelector('#dados-teste-pericia').value;
    const modificador = document.querySelector('#modificador').value;
    let resultado = 0;
    let dado_atributo = d(dados_atributo);
    let dado_pericia = d(dados_pericia);

    resultado = dado_atributo + dado_pericia + parseInt(modificador);


    document.querySelector('#resultado-nivel-sucesso').innerHTML = nivel_de_sucesso(resultado);
    document.querySelector('#resultado-dados-da-rolagem').innerHTML = resultado;
    document.querySelector('#resultado-rolagem-teste-pericia').innerHTML = `${dado_atributo} e ${dado_pericia}`;
}


function limpar_teste_pericia() {
    document.querySelector('#resultado-nivel-sucesso').innerHTML = '-';
    document.querySelector('#resultado-dados-da-rolagem').innerHTML = '-';
    document.querySelector('#resultado-rolagem-teste-pericia').innerHTML = '-';
}


/* -------------------------
    FUNÇÕES GERAIS
    ------------------------- */

function d66() {
    return dn(6) + '' + dn(6)
}

function d(n) {
    if (n == 1)
        return parseInt(Math.random() * 4 + 1);

    if (n == 2)
        return parseInt(Math.random() * 6 + 1);

    if (n == 3)
        return parseInt(Math.random() * 8 + 1);

    if (n == 4)
        return parseInt(Math.random() * 10 + 1);

    if (n == 5)
        return parseInt(Math.random() * 12 + 1);

    if (n == 6)
        return parseInt(Math.random() * 12 + 3);

    return 0;
}

function dn(n) {
    return parseInt(Math.random() * n + 1);
}

function nivel_de_sucesso(resultado_do_teste) {
    const SUCESSO_COMPLETO = 9;
    const SUCESSO_PARCIAL = 6;
    const FALHA = 4;

    if (resultado_do_teste >= SUCESSO_COMPLETO)
        return 'Sucesso Completo';

    if (resultado_do_teste >= SUCESSO_PARCIAL)
        return 'Sucesso Parcial';

    if (resultado_do_teste >= FALHA)
        return 'Falha';

    return 'Falha Crítica';
}