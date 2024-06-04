function createDataBase(db) {
    db.serialize(() => {
        // habilitando as restrições
        db.run("PRAGMA foreign_keys = ON;");
        
        db.run(
            "CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nome_usuario TEXT NOT NULL, saldo_usuario DECIMAL(10, 2), email TEXT UNIQUE NOT NULL, senha TEXT NOT NULL)"
        );
        db.run(
            "CREATE TABLE IF NOT EXISTS produtos (id_produto INTEGER PRIMARY KEY AUTOINCREMENT, nome_produto TEXT NOT NULL, codigo_produto VARCHAR(12) NOT NULL, valor_produto DECIMAL(10,2) NOT NULL, parcelas_produto INTEGER, id_usuario INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario))"
        );
    });
}

module.exports = createDataBase;