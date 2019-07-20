const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');//Dependencia do Node
const fs = require('fs');//Dependencia do Node

module.exports = {
    //Rota de listagem de posts
    async index(req, res){//Rota no modo de Middleware
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    //Cadastrar novos posts 
    async store(req, res){
        const { author, place, description, hashtags} = req.body;
        const { filename: image } = req.file;

        //Separar o nome da varial com o ponto (.)
        const [ name ] = image.split('.');
        const filename = `${name}.jpg`;

        //Redimensiona o arquivo para 500 px
        await sharp(req.file.path)
            .resize(500) //Tamanho de 500px
            .jpeg({ quality: 70})//Qualidade em 70%
            .toFile(//Exporta para novo arquivo
                path.resolve(req.file.destination, 'resized', filename)
            )
        
        //Deleta o arquivo original
        fs.unlinkSync(req.file.path);

        //Salva tudo no nosso Banco de Dados (MongoDB)
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        //Emitir a requisição para todos os usuarios que estão na aplicação
        req.io.emit('post', post);

        return res.json(post);
    }
}