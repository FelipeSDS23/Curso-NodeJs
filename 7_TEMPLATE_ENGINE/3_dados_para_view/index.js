const express = require('express')
const exphbs = require('express-handlebars')
 
const app = express()
 
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')
 
app.get('/', (req,res) => {
    const user = {
        name: "Felipe",
        surname: "Silva", 
        age: 25
    }

    const palavra = "Teste"

    res.render('home', {user: user, palavra})
})
 
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.')
}) 