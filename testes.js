function som_rolar_dados() {
    const dado = new Audio('roll_dice.wav');
    dado.play();
}

function som_pegar_dados() {
    const dado = new Audio('get_dice.wav');
    dado.play();
}

/* -------------------------
    TESTE DE PERÍCIA
    ------------------------- */
function teste_de_pericia() {
    const quantidade_de_dados = document.querySelector('#dados-teste-pericia').value;
    const modificador = document.querySelector('#modificador-teste-pericia').value;

    const teste = rolagem_teste_de_pericia(quantidade_de_dados, modificador);

    document.querySelector('#resultado-nivel-sucesso').innerHTML = teste.nivel_de_sucesso;
    document.querySelector('#resultado-dados-da-rolagem').innerHTML = teste.rolagem;
    document.querySelector('#resultado-rolagem-teste-pericia').innerHTML = teste.total;
}

function rolagem_teste_de_pericia(quantidade_de_dados, modificador) {
    let MAXIMO_DE_DADOS_LIDOS = 3;
    let rolagem_inicial = [];
    let rolagem_valida = [];
    let total = 0;

    if (quantidade_de_dados < MAXIMO_DE_DADOS_LIDOS)
        MAXIMO_DE_DADOS_LIDOS = quantidade_de_dados;

    for (i = 0; i < quantidade_de_dados; i++) {
        rolagem_inicial.push(d6());
    }

    rolagem_inicial = ordenar_rolagem(rolagem_inicial);

    for (i = 0; i < MAXIMO_DE_DADOS_LIDOS; i++) {
        rolagem_valida.push(rolagem_inicial[i]);
        total += rolagem_inicial[i];
    }

    total = total + parseInt(modificador);
    nivel_sucesso = nivel_de_sucesso(total);

    return {
        'rolagem': rolagem_valida,
        'total': total,
        'nivel_de_sucesso': nivel_sucesso,
    };
}

function limpar_teste_de_pericia() {
    document.querySelector('#resultado-nivel-sucesso').innerHTML = '-';
    document.querySelector('#resultado-dados-da-rolagem').innerHTML = '-';
    document.querySelector('#resultado-rolagem-teste-pericia').innerHTML = '-';
}

/* -------------------------
    TESTE DE ATRIBUTO
    ------------------------- */
function teste_de_atributo() {
    const valor = document.querySelector('#valor-teste-atributo').value;
    const modificador = document.querySelector('#modificador-teste-atributo').value;
    const teste = rolagem_teste_de_atributo(valor, modificador);

    document.querySelector('#resultado-atributo').innerHTML = teste.nivel_de_sucesso;
    document.querySelector('#resultado-rolagem-atributo').innerHTML = teste.rolagem;
    document.querySelector('#total-atributo').innerHTML = teste.total;
}

function rolagem_teste_de_atributo(quantidade_de_dados, modificador) {

    let MAXIMO_DE_DADOS_LIDOS = 3;
    let dados = quantidade_de_dados.split('d')[0];

    let pre_modificador = quantidade_de_dados.split('+')[1];

    if (isNaN(pre_modificador))
        pre_modificador = parseInt(quantidade_de_dados.split('-')[1] * (-1));

    let rolagem_inicial = [];
    let rolagem_valida = [];
    let total = 0;

    for (i = 0; i < dados; i++) {
        rolagem_inicial.push(d6());
    }

    rolagem_inicial = ordenar_rolagem(rolagem_inicial);

    for (i = 0; i < MAXIMO_DE_DADOS_LIDOS; i++) {
        rolagem_valida.push(rolagem_inicial[i]);
        total += rolagem_inicial[i];
    }

    total = total + parseInt(pre_modificador) + parseInt(modificador);
    sucesso = nivel_de_sucesso(total);

    return {
        'rolagem': rolagem_valida,
        'total': total,
        'nivel_de_sucesso': sucesso,
    };
}

function limpar_teste_de_atributo() {
    document.querySelector('#resultado-atributo').innerHTML = '-';
    document.querySelector('#resultado-rolagem-atributo').innerHTML = '-';
    document.querySelector('#total-atributo').innerHTML = '-';
}

/* -------------------------
    TESTE DE PROBABILIDADE 
   ------------------------- */

function teste_de_probabilidade() {
    const quantidade_de_dados = document.querySelector('#teste-dados').value;
    const modificador = document.querySelector('#teste-modificador').value;

    let teste_sucesso_completo = document.querySelector('#teste-sucesso-completo');
    let teste_sucesso_parcial = document.querySelector('#teste-sucesso-parcial');
    let teste_sucesso_com_custo = document.querySelector('#teste-sucesso-com-custo');
    let teste_falha = document.querySelector('#teste-falha');
    let teste_falha_com_complicacao = document.querySelector('#teste-falha-com-complicacao');

    const sucessos = rolagem_teste_de_probabilidade(quantidade_de_dados, modificador);

    teste_sucesso_completo.innerHTML = sucessos.sucesso_completo +
        '(' + sucessos.porcentagem_sucesso_completo + '%)';

    teste_sucesso_parcial.innerHTML = sucessos.sucesso_parcial +
        '(' + sucessos.porcentagem_sucesso_parcial + '%)';

    teste_sucesso_com_custo.innerHTML = sucessos.sucesso_com_custo +
        '(' + sucessos.porcentagem_sucesso_com_custo + '%)';

    teste_falha.innerHTML = sucessos.falha +
        '(' + sucessos.porcentagem_falha + '%)';

    teste_falha_com_complicacao.innerHTML = sucessos.falha_com_complicacao +
        '(' + sucessos.porcentagem_falha_com_complicacao + '%)';
}

function rolagem_teste_de_probabilidade(quantidade_de_dados, modificador) {
    return rolar_n_testes(quantidade_de_dados, modificador)
}

function limpar_teste_de_probabilidade() {
    let teste_sucesso_completo = document.querySelector('#teste-sucesso-completo');
    let teste_sucesso_parcial = document.querySelector('#teste-sucesso-parcial');
    let teste_sucesso_com_custo = document.querySelector('#teste-sucesso-com-custo');
    let teste_falha = document.querySelector('#teste-falha');
    let teste_falha_compliacao = document.querySelector('#teste-falha-com-complicacao');

    teste_sucesso_completo.innerHTML = '-';
    teste_sucesso_parcial.innerHTML = '-';
    teste_sucesso_com_custo.innerHTML = '-';
    teste_falha.innerHTML = '-';
    teste_falha_compliacao.innerHTML = '-';
}

/* -------------------------
    FUNÇÕES GERAIS
    ------------------------- */

function d6() {
    return parseInt(Math.random() * 6 + 1);
}

function d66() {
    return parseInt(d6() + '' + d6())
}

function d100() {
    return parseInt(Math.random() * 100 + 1);
}

function dn(n) {
    return parseInt(Math.random() * n + 1);
}

function ordenar_rolagem(dados_da_rolagem) {
    return dados_da_rolagem.sort().reverse();
}

function nivel_de_sucesso(resultado_do_teste) {
    const SUCESSO_COMPLETO = 16;
    const SUCESSO_PARCIAL = 13;
    const SUCESSO_COM_CUSTO = 9;
    const FALHA = 6;

    if (resultado_do_teste >= SUCESSO_COMPLETO)
        return 'Sucesso Completo';

    if (resultado_do_teste >= SUCESSO_PARCIAL &&
        resultado_do_teste < SUCESSO_COMPLETO
    )
        return 'Sucesso Parcial';

    if (resultado_do_teste >= SUCESSO_COM_CUSTO &&
        resultado_do_teste < SUCESSO_PARCIAL
    )
        return 'Sucesso Com Custo';

    if (resultado_do_teste >= FALHA &&
        resultado_do_teste < SUCESSO_COM_CUSTO
    )
        return 'Falha';

    return 'Falha com Complicação';
}

function rolar_n_testes(quantidade_de_dados, modificador) {
    let total_de_testes = 5000000;

    let sucessos = {
        'sucesso_completo': 0,
        'sucesso_parcial': 0,
        'sucesso_com_custo': 0,
        'falha': 0,
        'falha_com_complicacao': 0,
        'porcentagem_sucesso_completo': 0,
        'porcentagem_sucesso_parcial': 0,
        'porcentagem_sucesso_com_custo': 0,
        'porcentagem_falha': 0,
        'porcentagem_falha_com_complicacao': 0
    };

    let rolagens = [];

    for (let i = 0; i < total_de_testes; i++) {
        rolagens.push(rolagem_teste_de_pericia(quantidade_de_dados, modificador));
        let sucesso = rolagens[i].nivel_de_sucesso;

        if (sucesso === 'Sucesso Completo') sucessos.sucesso_completo++;
        if (sucesso === 'Sucesso Parcial') sucessos.sucesso_parcial++;
        if (sucesso === 'Sucesso Com Custo') sucessos.sucesso_com_custo++;
        if (sucesso === 'Falha') sucessos.falha++;
        if (sucesso === 'Falha com Complicação') sucessos.falha_com_complicacao++;
    }

    let porcentagem_sucesso_completo = sucessos.sucesso_completo / total_de_testes * 100;
    sucessos.porcentagem_sucesso_completo = arredondar(porcentagem_sucesso_completo, 2);

    let porcentagem_sucesso_parcial = sucessos.sucesso_parcial / total_de_testes * 100;
    sucessos.porcentagem_sucesso_parcial = arredondar(porcentagem_sucesso_parcial, 2);

    let porcentagem_sucesso_com_custo = sucessos.sucesso_com_custo / total_de_testes * 100;
    sucessos.porcentagem_sucesso_com_custo = arredondar(porcentagem_sucesso_com_custo, 2);

    let porcentagem_falha = sucessos.falha / total_de_testes * 100;
    sucessos.porcentagem_falha = arredondar(porcentagem_falha, 2);

    let porcentagem_falha_com_complicacao = sucessos.falha_com_complicacao / total_de_testes * 100;
    sucessos.porcentagem_falha_com_complicacao = arredondar(porcentagem_falha_com_complicacao, 2);

    return sucessos;
}

function arredondar(numero, precisao) {
    let f = Math.pow(10, precisao);
    let temp = numero * f;
    let resultado = Math.round(temp);
    return resultado / f;
};