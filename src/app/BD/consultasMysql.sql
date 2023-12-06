-- Crie um esquema para armazenar frases criptografadas
-- CREATE DATABASE IF NOT EXISTS criptografia;
-- USE criptografia;

DROP TABLE frases_criptografadas;

-- Crie uma tabela para armazenar frases criptografadas
CREATE TABLE IF NOT EXISTS frases_criptografadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto_criptografado VARBINARY(500)
);

-- Crie uma função para criptografar frases
DELIMITER $$

CREATE FUNCTION `bd23538`.`criptografar_frase` (texto_de_entrada VARCHAR(255), chave_secreta VARCHAR(255))
RETURNS VARBINARY(500)
DETERMINISTIC
BEGIN
    DECLARE resultado_criptografado VARBINARY(500);
    SET resultado_criptografado = AES_ENCRYPT(texto_de_entrada, chave_secreta);
    RETURN resultado_criptografado;
END$$

DELIMITER ;

-- Crie uma função para descriptografar frases
CREATE FUNCTION `bd23538`.`descriptografar_frase` (texto_criptografado VARBINARY(500), chave_secreta VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE resultado_descriptografado VARCHAR(255);
    SET resultado_descriptografado = AES_DECRYPT(texto_criptografado, chave_secreta);
    RETURN resultado_descriptografado;
END$$

DELIMITER ;

-- Inserir frases criptografadas
INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT('Olá, mundo!', 'chave_secreta'));
INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT('Isso é um teste.', 'outra_chave'));
INSERT INTO frases_criptografadas (texto_criptografado) VALUES (AES_ENCRYPT('MySQL é difícil!', 'minha_chave'));

-- Verificar os dados na tabela
SELECT * FROM frases_criptografadas;


-- Consultar frases descriptografadas
SELECT id, CAST(AES_DECRYPT(texto_criptografado, 'chave_secreta') AS CHAR) AS texto_descriptografado FROM frases_criptografadas;
SELECT id, CAST(AES_DECRYPT(texto_criptografado, 'outra_chave') AS CHAR) AS texto_descriptografado FROM frases_criptografadas;
SELECT id, CAST(AES_DECRYPT(texto_criptografado, 'minha_chave') AS CHAR) AS texto_descriptografado FROM frases_criptografadas;


-- views trigger stored procedure -------------------------------------------------------------


-- Tabela EnigmaMachine
CREATE TABLE EnigmaMachine (
    enigma_id INT PRIMARY KEY AUTO_INCREMENT,
    serial_number VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    initial_configuration TEXT NOT NULL
);

-- Tabela Rotor
CREATE TABLE Rotor (
    rotor_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL,
    initial_configuration TEXT NOT NULL
);

-- Tabela Reflector
CREATE TABLE Reflector (
    reflector_id INT PRIMARY KEY AUTO_INCREMENT,
    configuration TEXT NOT NULL
);

-- Tabela Plugboard
CREATE TABLE Plugboard (
    plugboard_id INT PRIMARY KEY AUTO_INCREMENT,
    connection_pairs TEXT NOT NULL
);

-- Tabela Mensagem
CREATE TABLE Mensagem (
    mensagem_id INT PRIMARY KEY AUTO_INCREMENT,
    texto_mensagem TEXT NOT NULL,
    data_envio DATETIME NOT NULL,
    enigma_id INT,
    FOREIGN KEY (enigma_id) REFERENCES EnigmaMachine(enigma_id)
);


INSERT INTO EnigmaMachine (serial_number, model, initial_configuration)
VALUES ('ENIGMA001', 'Model A', 'Initial_Config_A'),
       ('ENIGMA002', 'Model B', 'Initial_Config_B'),
       ('ENIGMA003', 'Model C', 'Initial_Config_C');


INSERT INTO Rotor (type, initial_configuration)
VALUES ('Type1', 'Initial_Config_Type1'),
       ('Type2', 'Initial_Config_Type2'),
       ('Type3', 'Initial_Config_Type3');

INSERT INTO Reflector (configuration)
VALUES ('Reflect_Config_1'),
       ('Reflect_Config_2'),
       ('Reflect_Config_3');

INSERT INTO Plugboard (connection_pairs)
VALUES ('AB CD EF GH'),
       ('IJ KL MN OP'),
       ('QR ST UV WX');


INSERT INTO Mensagem (texto_mensagem, data_envio, enigma_id)
VALUES ('Olá Mundo!', NOW(), 1),
       ('Mensagem de Teste', NOW(), 2),
       ('Mensagem Importante', NOW(), 3);



-- View para mostrar todas as mensagens com informações relacionadas à máquina Enigma
CREATE VIEW TodasMensagens AS
SELECT
    m.mensagem_id,
    m.texto_mensagem,
    m.data_envio,
    em.serial_number AS enigma_serial,
    em.model AS enigma_model,
    em.initial_configuration AS enigma_configuration
FROM Mensagem m
JOIN EnigmaMachine em ON m.enigma_id = em.enigma_id;

-- View para mostrar informações sobre as máquinas Enigma e as mensagens
CREATE VIEW EnigmaMachinesAndMessages AS
SELECT
    em.enigma_id,
    em.serial_number,
    em.model,
    m.mensagem_id,
    m.texto_mensagem,
    m.data_envio
FROM EnigmaMachine em
LEFT JOIN Mensagem m ON em.enigma_id = m.enigma_id;


-- Trigger para atualizar a configuração inicial do rotor ao inserir uma nova mensagem
DELIMITER //
CREATE TRIGGER AtualizarConfigRotor
AFTER INSERT ON Mensagem
FOR EACH ROW
BEGIN
    DECLARE enigmaRotorId INT;

    -- Obter o rotor atualmente associado à máquina Enigma da mensagem
    SELECT em.rotor_id INTO enigmaRotorId
    FROM EnigmaMachine em
    WHERE em.enigma_id = NEW.enigma_id;

    -- Atualizar a configuração inicial do rotor associado à máquina Enigma
    UPDATE Rotor
    SET initial_configuration = 'NOVA_CONFIGURACAO'
    WHERE rotor_id = enigmaRotorId;
end //

DELIMITER ;

-- Stored Procedure para inserir uma mensagem de forma segura
DELIMITER //

CREATE PROCEDURE InserirMensagemSegura
    (IN texto_mensagem TEXT,
     IN data_envio DATETIME,
     IN enigma_serial VARCHAR(255))
BEGIN
    DECLARE enigma_id INT;
    DECLARE enigma_rotor_id INT;

    -- Obter o ID da máquina Enigma associada ao serial fornecido
    SELECT em.enigma_id, em.rotor_id INTO enigma_id, enigma_rotor_id
    FROM EnigmaMachine em
    WHERE em.serial_number = enigma_serial;

    -- Verificar se a máquina Enigma existe
    IF enigma_id IS NOT NULL THEN
        -- Inserir a mensagem
        INSERT INTO Mensagem (texto_mensagem, data_envio, enigma_id)
        VALUES (texto_mensagem, data_envio, enigma_id);

        -- Atualizar a configuração inicial do rotor associado à máquina Enigma
        UPDATE Rotor
        SET initial_configuration = 'NOVA_CONFIGURACAO'
        WHERE rotor_id = enigma_rotor_id;

        SELECT 'Mensagem inserida com sucesso.' AS Resultado;

    ELSE
        SELECT 'Máquina Enigma não encontrada.' AS Resultado;
    END IF;
END //

DELIMITER ;

SELECT DATABASE();
SHOW PROCEDURE STATUS WHERE Db = 'bd23538';


CALL InserirMensagemSegura('Mensagem de Teste', NOW(), 'ENIGMA001');

SELECT * FROM EnigmaMachine;
SELECT * FROM Mensagem;
SELECT * FROM TodasMensagens;
SELECT * FROM EnigmaMachinesAndMessages;

-- Ao inserir uma nova mensagem, a trigger AtualizarConfigRotor deve ser acionada automaticamente
INSERT INTO Mensagem (texto_mensagem, data_envio, enigma_id)
VALUES ('Nova Mensagem', NOW(), 1);


