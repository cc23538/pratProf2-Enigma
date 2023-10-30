const express = require('express');
const app = express();

// Definir o mecanismo de visualização EJS
app.set('view engine', 'ejs');

// Rota para renderizar a página EJS
app.get('/cripto', (req, res) => {
    const frasesCriptografadas = [
        // Insira aqui as frases criptografadas que você deseja exibir na página
        // Certifique-se de passar as frases criptografadas como variáveis para o arquivo EJS
        'Frases criptografadas aqui', // Adicione as frases criptografadas que você deseja exibir
        'Outra frase criptografada',
        'Mais uma frase criptografada'
    ];
    res.render('index', { frasesCriptografadas: frasesCriptografadas });
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});