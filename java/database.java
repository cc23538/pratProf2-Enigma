public class DatabaseConnection {
    public Connection getConnection() throws SQLException {
        String url = "jdbc:mysql://regulus.cotuca.unicamp.br/BD23538";
        String user = "BD23538";
        String password = "BD23538";

        return DriverManager.getConnection(url, user, password);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            DatabaseConnection databaseConnection = new DatabaseConnection();
            Connection connection = databaseConnection.getConnection();

            DAOEnigma daoEnigma = new DAOEnigma(connection);
            ControllerEnigma controllerEnigma = new ControllerEnigma(daoEnigma);

            controllerEnigma.exibeDadosEJS();

            // Inserindo uma nova frase criptografada
            controllerEnigma.inserirDadosEJS("Nova frase criptografada", "Chave secreta");

            // Editando uma frase criptografada existente
            controllerEnigma.editarDadosEJS(1, "Nova frase editada");

            // Excluindo uma frase criptografada existente por ID
            controllerEnigma.excluirDadosEJS(2);

            connection.close(); 
        } catch (SQLException e) {
            System.err.println("Erro na conexão com o banco: " + e.getMessage());
        }
    }
}
