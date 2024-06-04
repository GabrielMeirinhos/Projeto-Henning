const sqlite = require("sqlite3").verbose();
const express = require("express");


const app = express();
const port = 3000;
const db = new sqlite.Database("database.db");

const createDataBase =require("./userModel.js")
const getUsuarios =require("./getUsuarios.js")
const getProdutos =require("./getProdutos.js")

app.use(express.json());

createDataBase(db)

app.get("/", (req, res) => {
	res.send("Estou na minha API");
});

app.get("/usuarios", (req, res) => {
    getUsuarios(db, res)
});

app.post("/usuarios", (req, res) => {
	const { nome_usuario, saldo_usuario, email, senha} = req.body;

	if (!nome_usuario || !saldo_usuario || !email || !senha) {
		res.send("Dados incumpletuss");
		return;
	} else {
		db.run(
			"INSERT INTO usuarios (nome_usuario , saldo_usuario , email, senha) VALUES (?, ?, ?, ?)",
			[nome_usuario, saldo_usuario, email, senha],
			(error) => {
				if (error) {
					res.send(error);
				} else {
					res.send(`Usuário ${nome_usuario} cadastrado com sucesso`);
				}
			}
		);
	}
});

app.put("/usuarios/:id", (req, res) => {
	const id = req.params.id;
	const { nome_usuario, saldo_usuario, email, senha } = req.body;

	if (!nome_usuario || !saldo_usuario || !email || !senha) {
		res.send("Dados incompletos");
		return;
	} else {
		db.run(
			"UPDATE usuarios SET nome_usuario = ?, saldo_usuario = ?, email = ?, senha = ? WHERE id_usuario = ?",
			[nome_usuario, saldo_usuario, email, senha, id],
			(error) => {
				if (error) {
					res.send(error);
				} else {
					res.send(`Usuário ${nome_usuario} atualizado com sucesso`);
				}
			}
		);
	}
});

app.patch("/usuarios/:id", (req, res) => {
	const id = req.params.id;
	const { username, password, telefone } = req.body;

	if (!username || !password || !telefone) {
		res.send("Dados incompletos");
		return;
	} else {
		db.run(
			"UPDATE usuarios SET username = ?, password = ?, telefone = ? WHERE id_usuario = ?",
			[username, password, telefone, id],
			(error) => {
				if (error) {
					res.send(error);
				} else {
					res.send(`Usuário ${username} atualizado com sucesso`);
				}
			}
		);
	}
});

app.delete("/usuarios/:id", (req, res) => {
	const id = req.params.id;
	db.run("DELETE FROM usuarios WHERE id_usuario = ?", id, (error) => {
		if (error) {
			res.send(error);
		} else {
			res.send(`Usuário ${id} deletado com sucesso`);
		}
	});
});

app.get("/produtos", (req, res) => {
	getProdutos(db, res)
});

app.post("/produtos", (req, res) => {
    const { nome_produto, codigo_produto, valor_produto, parcelas_produto, id_usuario } = req.body;

    if (!nome_produto || !codigo_produto || !valor_produto || !parcelas_produto || !id_usuario) {
        res.send("Dados incompletos");
        return;
    } else {
        db.run(
            "INSERT INTO produtos (nome_produto, codigo_produto, valor_produto, parcelas_produto, id_usuario) VALUES (?, ?, ?, ?, ?)",
            [nome_produto, codigo_produto, valor_produto, parcelas_produto, id_usuario],
            (error) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(`Produto ${nome_produto} cadastrado com sucesso`);
                }
            }
        );
    }
});

app.put("/produtos/:id", (req, res) => {
    const id = req.params.id;
    const { nome_produto, codigo_produto, valor_produto, parcelas_produto, id_usuario } = req.body;

    if (!nome_produto || !codigo_produto || !valor_produto || !parcelas_produto || !id_usuario) {
        res.send("Dados incompletos");
        return;
    } else {
        db.run(
            "UPDATE produtos SET nome_produto = ?, codigo_produto = ?, valor_produto = ?, parcelas_produto = ?, id_usuario = ? WHERE id_produto = ?",
            [nome_produto, codigo_produto, valor_produto, parcelas_produto, id_usuario, id],
            (error) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(`Produto ${nome_produto} atualizado com sucesso`);
                }
            }
        );
    }
});

// Rota para deletar um produto existente
app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM produtos WHERE id_produto = ?", id, (error) => {
        if (error) {
            res.send(error);
        } else {
            res.send(`Produto ${id} deletado com sucesso`);
        }
    });
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});