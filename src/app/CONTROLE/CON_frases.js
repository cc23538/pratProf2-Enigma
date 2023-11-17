const enigmaDAO = require("../BD/DAO_frasesCriptografadas");
const bd = require("../../confg/database");

class CON_enigma{

    //metodo - via rota
    exibeDadosEJS(){
        return function(req, res){
            const criptoDAO = new enigmaDAO (bd);//instancia da classe
            criptoDAO.listarEJS()
                .then((resultados) =>{
                    console.log(resultados);
                    res.render('../views/ejs/enigma', {frases: resultados});
                })
                .catch(erro => console.log(erro));
        }
    }

    IncluirDadosEJS(){
        return function(req, res){
            const criptoDAO = new enigmaDAO (bd);//instancia da classe
            criptoDAO.incluirEJS()
                .then((resultados) =>{
                    console.log(resultados);
                    res.render('../views/ejs/enigma', {frases: resultados});
                })
                .catch(erro => console.log(erro));
        }
    }

    editarDadosEJS(){
        return function(req, res){
            const criptoDAO = new enigmaDAO (bd);//instancia da classe
            criptoDAO.editarEJS()
                .then((resultados) =>{
                    console.log(resultados);
                    res.render('../views/ejs/enigma', {frases: resultados});
                })
                .catch(erro => console.log(erro));
        }
    }
    excluirDadosEJS(idFrase){
        return function(req, res){
            const criptoDAO = new enigmaDAO (bd); // instancia da classe
            criptoDAO.excluirEJS(idFrase)
                .then((resultados) =>{
                    console.log(resultados);
                    res.render('../views/ejs/enigma', {frases: resultados});
                })
                .catch(erro => console.log(erro));
        }
    }

    


}

module.exports = CON_enigma;