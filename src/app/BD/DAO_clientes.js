class DAO_clientes{

    //construtor
    constructor(bd){
        this._bd = bd;
    }
    //metodos para interação com o bando de dados

    

    //metodo - select na tabela clientes
    dadosDosClientesEJS(){
        return new Promise((resolve, reject) => {
            var sql = 'SELECT idClie, cpfClie, emailClie, nomeClie, DATE_FORMAT(dataNiverClie,"%d/%m/%Y") as dataNiverClie FROM CLIENTES ORDER BY idClie';
            this._bd.query(sql, function (erro, recordset){//conexão com o banco
                
                if(erro){
                    console.log(erro);
                    return reject("Lista de clientes falhou!!");
                }
                resolve(recordset); // retorna os dados da tabela
            });
        });
    }
    criptoEnigmaEJS() {
        return new Promise((resolve, reject) => {
            // Simulando dados do banco de dados
            const dadosDoBanco = [
                { id: 1, nome: 'Cliente 1', dado: 'valor1' },
                { id: 2, nome: 'Cliente 2', dado: 'valor2' },
                { id: 3, nome: 'Cliente 3', dado: 'valor3' }
            ];

            // Simulando o processo de criptografia
            const resultadosCriptografados = dadosDoBanco.map(item => {
                // Lógica de criptografia aqui
                return {
                    id: item.id,
                    nome: item.nome,
                    dadoCriptografado: `cripto_${item.dado}` // Exemplo de criptografia simples
                };
            });

            // Resolvendo a Promise com os resultados criptografados
            resolve(resultadosCriptografados);
        });
    }

    
        
}

module.exports = DAO_clientes;