const express = require('express');//importar express
const mongoose = require('mongoose');
const path = require('path');

const app = express();//cria a aplicação chamando o express (criando o servidor)

mongoose.connect('mongodb+srv://office:office@cluster0-2ldqo.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
})
//referenciar algum arquivo dentro da pasta
app.user('/files', express.static(path.resolve(__dirname, '..', 'upload', 'resized')));

app.use(require('./routes'));

app.listen(3333);//ouvir a porta

