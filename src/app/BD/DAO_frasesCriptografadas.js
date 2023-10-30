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
}

module.exports = DAO_frases_criptografadas;