const express = require("express");
const path = require("path");

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//habilita o parse dos application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));

//var urlencodedParser = express.urlencoded({ extended: false })
app.post('/login', (req, res) => {
    res.send(req.body.email + "post enviado");
});

app.listen(48081, () => {
    console.log("server is running");
});