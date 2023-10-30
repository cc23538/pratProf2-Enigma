const app = require("./src/confg/express");

const express = require("express");

// Adicione o mecanismo de visualização EJS
app.set('view engine', 'ejs');

// Rota para renderizar a página EJS
app.get('/', (req, res) => {
    const frasesCriptografadas = [
        'Frases criptografadas aqui', // Adicione as frases criptografadas que você deseja exibir
        'Outra frase criptografada',
        'Mais uma frase criptografada'
    ];
    res.render('index', { frasesCriptografadas: frasesCriptografadas });
});



app.listen(3000, function(){
    console.log("Servidor NODEJS rodando na porta 3000");
});

module.exports = app;