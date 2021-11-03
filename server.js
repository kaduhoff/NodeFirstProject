const express = require("express");
const sessions = require("express-session");
const path = require("path");
//const bcrypt = require('bcryptjs');
const listaJson = require('./listaCompras.json');
const fs = require("fs");


const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')))

//habilita o parse dos application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));

app.use(sessions({
  secret: 'PossoColocarer',
  resave: false,
  saveUninitialized: false,
}));















app.get("/", 
    function (req, res) {
        if (req.session.emailLogado) {
            //entra aqui se já tiver logado na sessão
            res.sendFile( __dirname + '/public/lista.html' , {teste: "oi"}, (err) => console.log(err));
            req.session.save();
        } else {
            //aqui se não tiver logado, então mostra a tela de login
            res.sendFile( __dirname + '/public/index.html' );
        }
    }
);

app.get("/listaJson", (req, res) => {
    if (req.session.emailLogado) {
        res.send(JSON.stringify(listaJson));
    } else {
        res.end();
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});


//var urlencodedParser = express.urlencoded({ extended: false })
app.post('/login', 
    function (requisicao, resposta) {

        if (
            (requisicao.body.email === 'aleskaph@gmail.com' && requisicao.body.senha === '1425') ||
            (requisicao.body.email === 'kadu@cabopec.com.br' && requisicao.body.senha === '1234') ||
            (requisicao.body.email === 'vinickhoff@gmail.com' && requisicao.body.senha === '2243') 
            ) {
                requisicao.session.emailLogado = requisicao.body.email;
                //resposta.send("Olá " + requisicao.body.email + ", seja bem vindo ao nosso site. ");
                resposta.redirect("/");
            } else {
                resposta.send("Usuário/senha inválidos");
            }
            
    }
);


app.get("/calc", (req, res) => {
    res.sendFile(__dirname + "/public/calc.html");
});




app.get("/colorir", (req, res) => {
    res.sendFile(__dirname + "/public/colorir.html");
});

app.get("/cartas", (req, res) => {
    res.sendFile(__dirname + "/public/cartas.html");
});


app.get("/novoItem", (req, res) => {
    listaJson.itens.push(req.query);
    fs.writeFile("./listaCompras.json", JSON.stringify(listaJson), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.redirect("/"); 
});

app.get("/removeItem", (req, res) => {
    var itens = listaJson.itens;
    var novosItens = [];
    for (let index = 0; index < itens.length; index++) {
        if (itens[index].descricao != req.query.descricao) {
            novosItens.push(itens[index]);
        }
        
    }
    listaJson.itens = novosItens;
    fs.writeFile("./listaCompras.json", JSON.stringify(listaJson), function(err) {
        if (err) {
            console.log(err);
        }
    }); 
    res.redirect("/"); 
});





app.listen(48081, () => {
    console.log("server is running");
});




