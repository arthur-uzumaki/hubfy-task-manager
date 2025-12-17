-- Dropa o banco de testes se existir
DROP DATABASE IF EXISTS test;

-- Cria banco de testes
CREATE DATABASE IF NOT EXISTS test;

-- Dá permissão total para o usuário da aplicação
GRANT ALL PRIVILEGES ON test.* TO 'mysql'@'%';

-- Garante que as permissões sejam aplicadas
FLUSH PRIVILEGES;