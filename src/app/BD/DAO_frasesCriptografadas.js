class DAO_frases_criptografadas {
    constructor(bd) {
        this._bd = bd;
    }

    // Método para inserir uma nova frase criptografada na tabela
    inserirFraseCriptografada(fraseCriptografada) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO frases_criptografadas (texto_criptografado) VALUES (?)';
            this._bd.query(sql, [fraseCriptografada], (erro, resultado) => {
                if (erro) {
                    console.error('Erro ao inserir frase criptografada: ', erro);
                    return reject(erro);
                }
                resolve(resultado);
            });
        });
    }

    // Método para recuperar todas as frases criptografadas da tabela
    recuperarFrasesCriptografadas() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM frases_criptografadas';
            this._bd.query(sql, (erro, resultado) => {
                if (erro) {
                    console.error('Erro ao recuperar frases criptografadas: ', erro);
                    return reject(erro);
                }
                resolve(resultado);
            });
        });
    }
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

    Listar(req, res) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM produtos";
            this._bd.query(sql, function (erro, result) {
                if (erro) {
                    console.error("Erro na Listagem : ", erro);
                    return reject(erro);
                }
                resolve(res.json(result));
            });
        });
    }

    Criar(req, res) {
        return new Promise((resolve, reject) => {
            const { Codigo, Descricao, DataCriacao } = req.body;
            const sql = `INSERT INTO produtos (Codigo, Descricao, DataCriacao) VALUES (${Codigo}, '${Descricao}', '${DataCriacao}')`;
            this._bd.query(sql, function (erro, result) {
                if (erro) {
                    console.error("erro na Criação do novo registro : ", erro);
                    return reject(erro);
                }
                resolve(res.json(result));
            });
        });
    }
    
    Update(req, res) {
        return new Promise((resolve, reject) => {
            const { Codigo, Descricao } = req.body;
            const sql = `UPDATE produtos SET Descricao = '${Descricao}', DataAtualizacao = '${new Date().toISOString()}' WHERE Codigo = ${Codigo}`;
            this._bd.query(sql, function (erro, result) {
                if (erro) {
                    console.error("erro na update : ", erro);
                    return reject(erro);
                }
                resolve(res.json(result));
            });
        });
    }

    GetOne(req, res) {
        return new Promise((resolve, reject) => {
            try {
                const { Codigo } = req.body;
                const sql = `SELECT * FROM produtos WHERE Codigo = ${Codigo}`;
                this._bd.query(sql, function (erro, result) {
                    if (erro) {
                        console.error("erro na update : ", erro);
                        reject(erro);
                    } else {
                        resolve(res.json(result));
                    }
                });
            } catch (erro) {
                console.error("erro na update : ", erro);
                reject(erro);
            }
        });
    }

    Delete(req, res) {
        return new Promise((resolve, reject) => {
            const { Codigo } = req.body;
            const sql = `DELETE FROM produtos WHERE Codigo = ${Codigo}`;
            this._bd.query(sql, function (erro, result) {
                if (erro) {
                    console.error("erro na update : ", erro);
                    reject(erro);
                } else {
                    resolve(res.json(result));
                }
            });
        });
    }
}

module.exports = DAO_frases_criptografadas;