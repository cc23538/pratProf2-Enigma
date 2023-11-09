const sql = require('mssql');

const config = {
    user: 'BD23538',
    password: 'BD23538',
    server: 'regulus.cotuca.unicamp.br',
    database: 'BD23538',
};

const connection = new sql.ConnectionPool(config);

connection.connect(err => {
    if (err) {
        console.error("Erro na conexão com o SQL Server:", err);
    } else {
        console.log("Conexão com o SQL Server realizada com sucesso.");
        
    }
});

module.exports = connection;