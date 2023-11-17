const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const expressLayout = require("express-ejs-layouts");
app.set("view engine" , "ejs");
app.use(expressLayout);


//habilitar o body-parser a receber os dados em json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//chamar o arquivo rotas
const rotas = require("../app/ROTAS/rotas");
rotas(app);


module.exports= app;