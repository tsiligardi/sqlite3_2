const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./data.sqlite3")


db.serialize(() => {
  db.run("DROP TABLE IF EXISTS chiamate")
  db.run("CREATE TABLE IF NOT EXISTS chiamate (ip TEXT, n INT)")
})