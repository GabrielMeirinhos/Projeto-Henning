function getProdutos(db, res, string) {
    db.all("SELECT * FROM produtos", (error, rows) => {
      if (error) {
        res.send(error);
      } else {
        res.send(rows);
      }
    });
  }
  
  module.exports = getProdutos;
  