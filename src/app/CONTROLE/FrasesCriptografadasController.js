const DAO_frases_criptografadas = require("../BD/DAO_frases_criptografadas");
const bd = require("../../confg/database");
class FrasesCriptografadasController {
    constructor() {
        this.dao = new DAO_frases_criptografadas();
    }

    // Método para inserir uma nova frase criptografada na tabela
    async inserirFrase(req, res) {
        try {
            const novaFrase = req.body.frase; // Obtenha a frase do corpo da solicitação
            // Adicione aqui sua lógica de criptografia para `novaFrase`
            const fraseCriptografada = novaFrase; // Aqui estou apenas assumindo que a frase criptografada é igual à frase original para fins de exemplo

            await this.dao.inserirFraseCriptografada(fraseCriptografada);
            res.redirect('/');
        } catch (error) {
            console.error('Erro ao inserir frase criptografada: ', error);
            res.status(500).send('Erro ao inserir frase criptografada');
        }
    }

    // Método para exibir todas as frases criptografadas
    async exibirFrasesCriptografadas(req, res) {
        try {
            const frases = await this.dao.recuperarFrasesCriptografadas();
            res.render('index', { frasesCriptografadas: frases });
        } catch (error) {
            console.error('Erro ao recuperar frases criptografadas: ', error);
            res.status(500).send('Erro ao recuperar frases criptografadas');
        }
    }
}

module.exports = FrasesCriptografadasController;