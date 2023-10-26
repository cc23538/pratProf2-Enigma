module.exports =(app) =>{
    // evitar problemas com CORS
    app.use((req,res,next) =>{
        res.header("Access-Control-Allow-Origin","*");
        next();
    });

    const clientesController = require("../CONTROLE/CON_clientes");
    const cliController = new clientesController();

    //ROTAS COM BARRA
    app.get("/home", (req,res) =>{
        console.log("Acabou de usar a rota /home");
        res.send("OLHE NA CONSOLE!! - ROTAS FUNCIONANDO!!");
    });
    

    app.get("/listaClientesEJS", cliController.exibeDadosClientesEJS());
   
    //app.get("/listafuncaoCripto", cliController.exibefuncaoCripto());
    
    app.get("/enigma", cliController.enigmaEJS());
    
}
