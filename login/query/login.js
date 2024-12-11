document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Obtendo os valores do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Criando o objeto com os dados do login
    const authData = {
        email: email,
        password: password
    };

    try {
        // Enviando a requisição POST para o backend
        const response = await fetch('http://localhost:8085/auth/login', {  // Atualize a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authData),
        });

        // Verificando o status da resposta
        if (response.ok) {
            // Se o login for bem-sucedido
            const data = await response.json(); 
            const token = data.token; 
            const tokenType = data.type; 

            // Aqui você pode armazenar o token em localStorage ou sessionStorage
            localStorage.setItem('token', token);
            localStorage.setItem('tokenType', tokenType); 

            window.location.href = "../produtos/produtos.html"; // Redireciona para a página de produtos
        } else {
            // Se a resposta não for 2xx (erro)
            const errorMessage = await response.text();
            alert(errorMessage); // Exibe a mensagem de erro retornada
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
});