const express = require('express');

const app = express();

app.get('/', (req, res) => { //interceptando a rota raiz
    return res.send(`Olá ${req.query.name}`);
});

app.listen(3333);//ouvir a porta

