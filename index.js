const sqlite3 = require("sqlite3")
const express = require ("express")
const app = new express()
app.use(express.json())
const db = new sqlite3.Database("./data.sqlite3")

db.run("CREATE TABLE IF NOT EXISTS chiamate (ip TEXT, n INT)")

app.get("/", (req, res) => {
  const ip = req.ip
  db.get("SELECT * FROM chiamate WHERE ip = ? ", ip, (err, row) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "error" })
    }

    if (row) {
      res.status(200).json({ n: row.n + 1 })
      db.run("UPDATE chiamate SET n = ? WHERE ip = ? ", row.n + 1, ip)

    } else {
      db.run("INSERT INTO chiamate VALUES (?,?)", ip, 1)
      res.status(200).json({ n: 1 })
    }
  })

})


app.listen(8080, () => console.log("server listening on port 8080"))