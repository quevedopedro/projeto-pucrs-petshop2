// ===== FUNÇÃO TEMPORAL: RELÓGIO NO RODAPÉ =====
// Atualiza a data e hora no rodapé a cada segundo
function atualizarDataHora() {
    var agora = new Date();
    var diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
                      'Quinta-feira', 'Sexta-feira', 'Sábado'];
    var diaSemana = diasSemana[agora.getDay()];
    var dia = String(agora.getDate()).padStart(2, '0');
    var mes = String(agora.getMonth() + 1).padStart(2, '0');
    var ano = agora.getFullYear();
    var horas = String(agora.getHours()).padStart(2, '0');
    var minutos = String(agora.getMinutes()).padStart(2, '0');
    var segundos = String(agora.getSeconds()).padStart(2, '0');

    var dataFormatada = diaSemana + ', ' + dia + '/' + mes + '/' + ano +
                        ' - ' + horas + ':' + minutos + ':' + segundos;

    var elemento = document.getElementById('data-hora');
    if (elemento) {
        elemento.textContent = dataFormatada;
    }
}

// ===== FUNÇÃO TEMPORAL: SAUDAÇÃO DINÂMICA =====
// Exibe "Bom dia", "Boa tarde" ou "Boa noite" conforme o horário
function exibirSaudacao() {
    var hora = new Date().getHours();
    var saudacao = '';

    if (hora >= 6 && hora < 12) {
        saudacao = 'Bom dia! 🌅';
    } else if (hora >= 12 && hora < 18) {
        saudacao = 'Boa tarde! ☀️';
    } else {
        saudacao = 'Boa noite! 🌙';
    }

    var elemento = document.getElementById('saudacao');
    if (elemento) {
        elemento.textContent = saudacao;
    }
}

// ===== VALIDAÇÃO DO FORMULÁRIO DE CADASTRO =====
function validarCadastro() {
    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var nomePet = document.getElementById('nome-pet').value;
    var racaPet = document.getElementById('raca-pet').value;

    // Verifica campos obrigatórios do cliente
    if (nome === '' || cpf === '' || email === '' || telefone === '') {
        exibirMensagem('mensagem-cadastro',
            'Por favor, preencha todos os campos obrigatórios do cliente.', 'danger');
        return false;
    }

    // Verifica campos obrigatórios do pet
    if (nomePet === '' || racaPet === '') {
        exibirMensagem('mensagem-cadastro',
            'Por favor, preencha os campos obrigatórios do pet.', 'danger');
        return false;
    }

    // Valida formato de e-mail
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        exibirMensagem('mensagem-cadastro',
            'Por favor, informe um e-mail válido.', 'danger');
        return false;
    }

    // Valida CPF (11 dígitos, com ou sem pontuação)
    var regexCPF = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    if (!regexCPF.test(cpf)) {
        exibirMensagem('mensagem-cadastro',
            'Por favor, informe um CPF válido (11 dígitos).', 'danger');
        return false;
    }

    // Sucesso
    exibirMensagem('mensagem-cadastro',
        '✅ Cadastro realizado com sucesso! Bem-vindo(a) à família PetShop Maomao, ' + nome + '!',
        'success');

    document.getElementById('form-cadastro').reset();
    return false;
}

// ===== VALIDAÇÃO DO AGENDAMENTO =====
function validarAgendamento() {
    var servico = document.getElementById('servico-agendamento').value;
    var metodo = document.querySelector('input[name="metodo"]:checked');
    var data = document.getElementById('data-agendamento').value;
    var horario = document.getElementById('horario-agendamento').value;

    if (servico === '') {
        exibirMensagem('mensagem-agendamento',
            'Por favor, selecione um serviço.', 'danger');
        return false;
    }

    if (!metodo) {
        exibirMensagem('mensagem-agendamento',
            'Por favor, selecione o método: tele-busca ou entrega no local.', 'danger');
        return false;
    }

    if (data === '') {
        exibirMensagem('mensagem-agendamento',
            'Por favor, selecione uma data para o agendamento.', 'danger');
        return false;
    }

    // Valida se a data não é no passado
    var dataSelecionada = new Date(data + 'T' + horario);
    var agora = new Date();
    if (dataSelecionada < agora) {
        exibirMensagem('mensagem-agendamento',
            'Não é possível agendar para uma data passada. Escolha uma data futura.', 'danger');
        return false;
    }

    if (horario === '') {
        exibirMensagem('mensagem-agendamento',
            'Por favor, selecione um horário para o agendamento.', 'danger');
        return false;
    }

    // Tudo válido - exibe confirmação
    var metodoTexto = metodo.value === 'tele-busca' ?
        'Tele-busca (buscamos seu pet em casa)' :
        'Entrega no local (você traz seu pet)';
    var servicoTexto = servico === 'banho-tosa-sem' ?
        'Banho e Tosa - Sem Tele-busca (R$ 70,00)' :
        'Banho e Tosa - Com Tele-busca (R$ 100,00)';

    var dataObj = new Date(data + 'T00:00:00');
    var dataFormatada = dataObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    exibirMensagem('mensagem-agendamento',
        '✅ Agendamento confirmado!\n\n' +
        'Serviço: ' + servicoTexto + '\n' +
        'Método: ' + metodoTexto + '\n' +
        'Data: ' + dataFormatada + '\n' +
        'Horário: ' + horario + '\n\n' +
        'Aguardamos você e seu pet!',
        'success');

    document.getElementById('form-agendamento').reset();
    return false;
}

// ===== FUNÇÃO AUXILIAR: EXIBIR MENSAGENS =====
function exibirMensagem(elementoId, texto, tipo) {
    var elemento = document.getElementById(elementoId);
    if (!elemento) return;

    elemento.style.display = 'block';
    elemento.className = 'alert alert-' + tipo + ' mt-3';
    elemento.style.whiteSpace = 'pre-line';

    if (tipo === 'success') {
        elemento.style.backgroundColor = '#d4edda';
        elemento.style.borderColor = '#c3e6cb';
        elemento.style.color = '#155724';
    } else {
        elemento.style.backgroundColor = '#f8d7da';
        elemento.style.borderColor = '#f5c6cb';
        elemento.style.color = '#721c24';
    }

    elemento.textContent = texto;
    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== DEFINIR DATA MÍNIMA NO AGENDAMENTO (hoje) =====
function definirDataMinima() {
    var campoData = document.getElementById('data-agendamento');
    if (campoData) {
        var hoje = new Date();
        var dataMinima = hoje.toISOString().split('T')[0];
        campoData.min = dataMinima;
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    exibirSaudacao();
    atualizarDataHora();
    setInterval(atualizarDataHora, 1000);
    definirDataMinima();
});