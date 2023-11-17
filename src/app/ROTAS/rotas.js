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
        res.send("Olá a console");
    });

    app.get("/enigma", criptoController.exibeDadosEJS());

    app.get("/enigma", criptoController.IncluirDadosEJS());
    app.get("/enigma", criptoController.editarDadosEJS());
    app.get("/enigma", criptoController.excluirDadosEJS);

    

}