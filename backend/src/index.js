//Importação das dependencias que irão precisar para aplicação
const express = require('express');//permite operar rotas parametros e tudo mais dentro da app
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//cria a aplicação chamando o express (criando o servidor)
const app = express();

//Permite trabalhar tanto com http quanto com web socket
const server = require('http').Server(app);
const io = require('socket.io')(server);//O io permite receber e entregar dados

//Faz a conexão com o banco de dados
mongoose.connect('mongodb+srv://office:office@cluster0-2ldqo.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
})

//Criar o proprio middleware para distribuir os dados em realtime
app.use((req, res, next ) => {
    req.io = io;

    next();
})

//Permitir que qualquer url de qualquer servidor possa ter acesso
app.use(cors());

//referenciar algum arquivo dentro da pasta
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);//ouvir a porta

