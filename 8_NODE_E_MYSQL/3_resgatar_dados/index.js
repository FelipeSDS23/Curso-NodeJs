const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

// ler o body
app.use(
    express.urlencoded({
        extended: true
    }), 
);

app.use(express.json());

app.post("/books/insertbook",(req, res) => {

    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) Values ('${title}', '${pageqty}')`

    conn.query(sql, (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect("/books")
    })

})

app.get("/books",(req, res) => {
    const sql = "SELECT * FROM books"

    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err)
            return
        }

        const books = data
        console.log(books)

        res.render("books", {books})
    })
})

app.get("/", (req, res) => {
    res.render("home")
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql2"
})

conn.connect((err) => {
    if(err) {
        console.log(err)
        return
    }
    
    console.log("Conectado!")

    app.listen(3000)
})