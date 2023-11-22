class DAO_enigma{

    //construtor
    constructor(bd){
        this._bd = bd;
    }

    //metodo 
    listarEJS() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM frases_criptografadas;";
            this._bd.query(sql, function (erro, recordset) { // conexão com o banco
                if (erro) {
                    console.log(erro);
                    return reject("Lista de frases falhou!!");
                }
                resolve(recordset);
            });
        });
    }
    /*
    incluirEJS(data) {
        return new Promise((resolve, reject) => {
            var sql = 'INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT(?, ?));';
            this._bd.query(sql, data, function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("tentativa de incluir frases falhou!!");
                }
                resolve(recordset);
            });
        });
    }*/

    incluirEJS(data) {
        return new Promise((resolve, reject) => {
          const sql = 'INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT(?, ?));';
          this._bd.query(sql, data, function (erro, recordset) {
            if (erro) {
              console.error(erro);
              return reject("tentativa de incluir frases falhou!!"); 
            }
            resolve(recordset);
          });
        });
      }


    editarEJS(id, newData) {
    return new Promise((resolve, reject) => {
        var sql = 'UPDATE frases_criptografadas SET ? WHERE id = ?';
            this._bd.query(sql, [newData, id], function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Tentativa de editar frases falhou!!");
                }
                resolve(recordset);
            });
        });
    }
    excluirEJS(id) {
        return new Promise((resolve, reject) => {
            var sql = 'DELETE FROM frases_criptografadas WHERE id = ?';
            this._bd.query(sql, [id], function (erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao tentar excluir uma frase!!");
                }
                resolve(recordset);
            });
        });
    }

}

module.exports = DAO_enigma;