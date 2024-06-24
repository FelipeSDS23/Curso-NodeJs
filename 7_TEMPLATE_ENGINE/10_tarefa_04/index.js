const express = require("express")
const exphbs = require("express-handlebars")
const port = 3000

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

const products = [
    {
        "nome": "Caneca",
        "valor": 50,
        "descricao": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia a eos omnis aut? Dolor sapiente tempora suscipit adipisci nihil totam obcaecati! Facere modi ab dolorem fugiat eaque, ipsa expedita ad."
    },
    {
        "nome": "Computador",
        "valor": 4000,
        "descricao": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia a eos omnis aut? Dolor sapiente tempora suscipit adipisci nihil totam obcaecati! Facere modi ab dolorem fugiat eaque, ipsa expedita ad."
    },
    {
        "nome": "Fone",
        "valor": 150,
        "descricao": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia a eos omnis aut? Dolor sapiente tempora suscipit adipisci nihil totam obcaecati! Facere modi ab dolorem fugiat eaque, ipsa expedita ad."
    },
    {
        "nome": "Monitor",
        "valor": 500,
        "descricao": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia a eos omnis aut? Dolor sapiente tempora suscipit adipisci nihil totam obcaecati! Facere modi ab dolorem fugiat eaque, ipsa expedita ad."
    }
]

app.get("/", (req, res) => {
    res.render("home", {products})
})

app.get("/product", (req, res) => {
    const product = req.query
    res.render("product", {product})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})