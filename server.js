const express = require("express");
const session = require("express-session");
const path = require("path");
const lista = require("./public/lista.json");

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: "qualquer frase para segredo",
        resave: false,
        saveUninitialized: false,
    })
);

app.get('/', (req, res) => {
    if (req.session.usuario) {
        //res.send( "Login efetuado por: " + req.session.usuario);
        res.sendFile(path.join(__dirname, 'public', 'lista.html'));
        
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));

    }
});


app.get("/lista", (req,res) => {
    res.end(JSON.stringify(lista));
});

//habilita o parse dos application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));

//var urlencodedParser = express.urlencoded({ extended: false })
app.post('/login', (req, res) => {
    if (req.body.email === 'kadu@cabopec.com.br') {
        req.session.usuario = 'Kadu';
        res.redirect("/");
    } else {

        res.send(req.body.email + "post enviado");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    });
    res.redirect("/");
});

app.listen(48081, () => {
    console.log("server is running");
});