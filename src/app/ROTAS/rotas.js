const app = require("../../confg/express");

module.exports = (app) => {
    //evitar problemas com os CORS
    app.use((req, res, next) => {
        res.header("Access-Control-Allw-Origen", "*");
        next();
    });


    const enigmaController = require("../CONTROLE/CON_frases");
    const criptoController = new enigmaController();

    
    //criando minhas rotas
    app.get("/home", (req, res) => {
        console.log("Utilizando rota /home");
        res.send("Rafaela F. Dos Santos - RA 23538 -- Rebeca Samara Oliveira da Rocha - RA 22587");
    }); //ok

    app.get("/enigma", criptoController.exibeDadosEJS()); //ok
    
    app.get("/inserir", criptoController.InserirDados()); //ok



    //app.get('/editar/:idFrase',  criptoController.editarDadosEJS);
    //app.get("/editar", criptoController.editarDadosEJS());


    //app.get('/excluir/:idFrase', criptoController.excluirDadosEJS);
    //app.get("/excluir", criptoController.excluirDadosEJS);


}