const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'regulus.cotuca.unicamp.br',
    user: 'BD23538',
    password: 'BD23538',
    database: 'BD23538',
});

connection.connect(function (erro) {
    if(erro)
        console.log("Erro na conexão com o Banco NODEJS");
    else
        console.log("Conexão com bando nodejs realizada com sucesso");
});

module.exports = connection;