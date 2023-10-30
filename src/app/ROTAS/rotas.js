module.exports =(app) =>{
    // evitar problemas com CORS
    app.use((req,res,next) =>{
        res.header("Access-Control-Allow-Origin","*");
        next();
    });

    const clientesController = require("../CONTROLE/CON_clientes");
    const cliController = new clientesController();


    
    //const frasesController = require("../CONTROLE/FrasesCriptografadasController");
    //const fraController = new frasesCriptografadasDAO();

    //ROTAS COM BARRA
    app.get("/home", (req,res) =>{
        console.log("Acabou de usar a rota /home");
        res.send("OLHE NA CONSOLE!! - ROTAS FUNCIONANDO!!");
    });
    

    app.get("/listaClientesEJS", cliController.exibeDadosClientesEJS());
   
    //app.get("/listafuncaoCripto", cliController.exibefuncaoCripto());
    
    app.get("/enigma", cliController.enigmaEJS());

    //exibir as frases que estão salva no bd
    app.get('/frases', (req, res) => {
        // Executar consulta no banco de dados
        const query = 'SELECT texto_criptografado FROM frases_criptografadas';
        connection.query(query, (error, results) => {
            if (error) throw error;
            const frasesCriptografadas = results.map(result => result.texto_criptografado);
    
            // Renderizar a página EJS com os resultados
            res.render('index', { frasesCriptografadas: frasesCriptografadas });
        });
    });

    //app.get("/frases", fraController.inserirFrase());
    //app.get("/frases", fraController.inserirFraseCriptografada());
    
}
