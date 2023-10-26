const clientesDAO = require("../BD/DAO_clientes");
const bd = require("../../confg/database");

class CON_clientes{

    //metodo - via rota
    exibeDadosClientesEJS(){
        return function(req, res){
            const cliDAO = new clientesDAO(bd);//instancia da classe
            cliDAO.dadosDosClientesEJS()
                .then((resultados) =>{
                    console.log(resultados);
                    res.render('../views/ejs/listaClientes', {clientes: resultados});
                })
                .catch(erro => console.log(erro));
        }
    }
    enigmaEJS() {
        return function(req, res) {
            const cliDAO = new clientesDAO(bd);
            cliDAO.criptoEnigmaEJS()
                .then((resultados) => {
                    console.log(resultados);
                    res.render('../views/ejs/funCripto', { clientes: resultados });
                })
                .catch(erro => console.log(erro));
        }
    }
    

}

module.exports = CON_clientes;