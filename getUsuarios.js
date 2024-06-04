function getUsuarios(db, res) {
    db.all("SELECT * FROM usuarios", (error, rows) => {
      if (error) {
        res.send(error);
      } else {
        res.send(rows);
      }
    });
  }
  module.exports = getUsuarios;
  