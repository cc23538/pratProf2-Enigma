import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DAOEnigma {
    private Connection connection;

    // Construtor
    public DAOEnigma(Connection connection) {
        this.connection = connection;
    }

    // Método para listar frases criptografadas
    public List<String> listarEJS() throws SQLException {
        List<String> frases = new ArrayList<>();
        String sql = "SELECT * FROM frases_criptografadas;";

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {

            while (resultSet.next()) {
                frases.add(resultSet.getString("texto_criptografado"));
            }
        } catch (SQLException e) {
            System.err.println("Lista de frases falhou!!");
            throw e;
        }
        return frases;
    }

    // Método para incluir frases criptografadas
    public void incluirEJS(String textoCriptografado, String chaveSecreta) throws SQLException {
        String sql = "INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT(?, ?));";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, textoCriptografado);
            preparedStatement.setString(2, chaveSecreta);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Tentativa de incluir frases falhou!!");
            throw e;
        }
    }

    // Método para editar frases criptografadas
    public void editarEJS(int id, String novoTexto) throws SQLException {
        String sql = "UPDATE frases_criptografadas SET texto_criptografado = ? WHERE id = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, novoTexto);
            preparedStatement.setInt(2, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Tentativa de editar frases falhou!!");
            throw e;
        }
    }

    // Método para excluir frases criptografadas
    public void excluirEJS(int id) throws SQLException {
        String sql = "DELETE FROM frases_criptografadas WHERE id = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Falha ao tentar excluir uma frase!!");
            throw e;
        }
    }
}
