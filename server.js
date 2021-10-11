const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
//app.set("layout", "./layout")
app.use(expressLayouts); 
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('loginForm');
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//habilita o parse dos application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));

//var urlencodedParser = express.urlencoded({ extended: false })
app.post('/login', (req, res) => {
    res.send(req.body.email + "post enviado");
});

app.get('/lista', (req, res) => {
    const data = require('./public/listaCompras.json');
    res.send(JSON.stringify(data));
});

app.listen(48081, () => {
    console.log("server is running");
});