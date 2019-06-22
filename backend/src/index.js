const express = require('express');//importar express
const mongoose = require('mongoose');

const app = express();//cria a aplicação chamando o express (criando o servidor)

mongoose.connect('mongodb+srv://office:office@cluster0-2ldqo.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
})

app.use(require('./routes'));

app.listen(3333);//ouvir a porta

