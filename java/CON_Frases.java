public class ControllerEnigma {
    private DAOEnigma daoEnigma;

    // Construtor
    public ControllerEnigma(DAOEnigma daoEnigma) {
        this.daoEnigma = daoEnigma;
    }

    // Método para exibir dados
    public void exibeDadosEJS() {
        try {
            List<String> frases = daoEnigma.listarEJS();

            // Exibindo frases no console
            System.out.println("Frases Criptografadas:");
            for (String frase : frases) {
                System.out.println(frase);
            }
     } catch (SQLException e) {
            System.err.println("Erro ao listar frases: " + e.getMessage());
        }
    }

    // Método para inserir dados
    public void inserirDadosEJS(String textoCriptografado, String chaveSecreta) {
        try {
            daoEnigma.incluirEJS(textoCriptografado, chaveSecreta);
            System.out.println("Frase criptografada inserida com sucesso!");
            // ...
        } catch (SQLException e) {
            System.err.println("Erro ao inserir frase: " + e.getMessage());
        }
    }

    // Método para editar dados
    public void editarDadosEJS(int id, String novoTexto) {
        try {
            daoEnigma.editarEJS(id, novoTexto);
            System.out.println("Frase criptografada editada com sucesso!");
            // ...
        } catch (SQLException e) {
            System.err.println("Erro ao editar frase: " + e.getMessage());
        }
    }

    // Método para excluir dados
    public void excluirDadosEJS(int id) {
        try {
            daoEnigma.excluirEJS(id);
            System.out.println("Frase criptografada excluída com sucesso!");
            // ...
        } catch (SQLException e) {
            System.err.println("Erro ao excluir frase: " + e.getMessage());
        }
    }

////////// sem id

 public void excluirTodasEJS() throws SQLException {
        String sql = "DELETE FROM frases_criptografadas";

        try (Statement statement = connection.createStatement()) {
            statement.executeUpdate(sql);
            System.out.println("Todas as frases criptografadas foram excluídas com sucesso!");
        } catch (SQLException e) {
            System.err.println("Falha ao tentar excluir todas as frases: " + e.getMessage());
            throw e;
        }
    }

   public void inserirEJS(String textoCriptografado, String chaveSecreta) throws SQLException {
        String sql = "INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT(?, ?))";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, textoCriptografado);
            preparedStatement.setString(2, chaveSecreta);
            preparedStatement.executeUpdate();
            System.out.println("Frase criptografada inserida com sucesso!");
        } catch (SQLException e) {
            System.err.println("Erro ao inserir frase criptografada: " + e.getMessage());
            throw e;
        }
    }


     public void editarTodasEJS(String novoTextoCriptografado) throws SQLException {
        String sql = "UPDATE frases_criptografadas SET texto_criptografado = AES_ENCRYPT(?, chaveSecreta)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, novoTextoCriptografado);
            preparedStatement.executeUpdate();
            System.out.println("Todas as frases criptografadas foram editadas com sucesso!");
        } catch (SQLException e) {
            System.err.println("Erro ao editar frases criptografadas: " + e.getMessage());
            throw e;
        }
    }

     public List<String> obterTodasEJS() throws SQLException {
        List<String> frases = new ArrayList<>();
        String sql = "SELECT texto_criptografado FROM frases_criptografadas";

        try (Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {

            while (resultSet.next()) {
                frases.add(resultSet.getString("texto_criptografado"));
            }
            System.out.println("Frases criptografadas obtidas com sucesso:");
            for (String frase : frases) {
                System.out.println(frase);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao obter frases criptografadas: " + e.getMessage());
            throw e;
        }

        return frases;
    }
