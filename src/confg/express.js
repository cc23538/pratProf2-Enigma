const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const expressLayout = require("express-ejs-layouts");
app.set("view engine" , "ejs");
app.use(expressLayout);


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//const rotas = require("../app/rotas/rotas");
const rotas = require('../app/rotas/rotas');
rotas(app);

const rotasCripto = require('../app/ROTAS/rotasCripto');
rotas(app);

module.exports = app;