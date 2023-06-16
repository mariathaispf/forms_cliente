function submitForm(event) {
    event.preventDefault();

    try {
        const nome = document.getElementById('nome').value;
        const id = document.getElementById('id').value;
        const tipoCliente = document.getElementById('tipoCliente').value;
        const endereco = document.getElementById('endereco').value;
        const cep = document.getElementById('cep').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const telefone = document.getElementById('telefone').value;
        const vendedor = document.getElementById('vendedor').value;
        const limiteCredito = document.getElementById('limiteCredito').value;

        const errorMessages = [];

        if (!/^[a-zA-Z\s]+$/.test(nome)) {
            errorMessages.push('O nome deve conter apenas letras.');
        }
        if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9\s,]+$/.test(endereco)) {
            errorMessages.push('O Endereço deve conter letras e números.');
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

        if (telefone.length < 6 || telefone.length > 14){
            errorMessages.push('Insira um telefone válido. Entre 6 e 14 caracteres');
            }

        if (errorMessages.length > 0) {
            throw new Error(errorMessages.join('\n'));
        }
            
        
        setCookie("nome", nome, 0.001);
        setCookie("id", id, 0.001);

        alert('Cadastro realizado com sucesso!');
        document.getElementById('cadastroForm').reset();

        // Exibir o nome do usuário no elemento com o id "bemvindo"
        const bemvindoElement = document.getElementById("bemvindo");
        if (bemvindoElement) {
            bemvindoElement.textContent = "Olá, " + nome + "! Bem-vindo(a).";
        }
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

// Função para definir um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  }
  
  // Função para obter o valor do cookie
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  
  // Função para verificar se o cookie existe
  function checkCookie() {
    const nome = getCookie("nome");
    const id = getCookie("id");
    if (nome && id) {
      const bemvindoElement = document.getElementById("bemvindo");
      if (bemvindoElement) {
        bemvindoElement.textContent = "Olá, " + nome + "! Bem-vindo(a).";
      }
    }
  }