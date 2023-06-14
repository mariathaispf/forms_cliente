function submitForm(event) {
    event.preventDefault();

    try {
        const nome = document.getElementById('nome').value;
        const id = document.getElementById('id').value;
        const tipoCliente = document.getElementById('tipoCliente').value;
        const endereco = document.getElementById('endereco').value;
        const cep = document.getElementById('cep').value;
        const rua = document.getElementById('rua').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const telefone = document.getElementById('dataNascimento').value;
        const vendedor = document.getElementById('vendedor').value;
        const limiteCredito = document.getElementById('limiteCredito').value;

        const errorMessages = [];

        if (!/^[a-zA-Z\s]+$/.test(nome)) {
            errorMessages.push('O nome deve conter apenas letras.');
        }
        if (!/^[a-zA-Z\s]+$/.test(rua)) {
            errorMessages.push('O nome deve conter apenas letras.');
        }
        if (!telefone || isNaN(telefone)) {
            errorMessages.push('O telefone deve ser somente números.');
        }

        if (!id || isNaN(id)) {
            errorMessages.push('O ID deve ser um número válido.');
        }

        if (isNaN(cep)) {
            errorMessages.push('O CEP deve conter apenas números.');
        }

        if (isNaN(limiteCredito) || limiteCredito < 0) {
            errorMessages.push('O limite de crédito deve ser um número válido e não negativo.');
        }

        if (errorMessages.length > 0) {
            throw new Error(errorMessages.join('\n'));
        }

        document.cookie = `nome=${nome}`;
        document.cookie = `id=${id}`;

        alert('Cadastro realizado com sucesso!');

        document.getElementById('cadastroForm').reset();
    } catch (error) {
        alert('Ocorreram os seguintes erros no cadastro:\n' + error.message);
        console.error(error);
    }
}
function validateEmail(email) {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    return atIndex > 0 && dotIndex > atIndex;
}

window.onload = function() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('nome=')) {
            document.getElementById('nome').value = cookie.substring(5);
        } else if (cookie.startsWith('id=')) {
            document.getElementById('id').value = cookie.substring(3);
        }
    }
};