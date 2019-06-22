const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    //Rota de listagem de posts
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    //Cadastrar novos posts 
    async store(req, res){
        const { author, place, description, hashtags} = req.body;
        const { filename: image } = req.file;

        //Separar o nome da varial com o ponto (.)
        const [ name ] = image.split('.');
        const filename = `${name};jpg`;

        await sharp(req.file.path)
            .resize(500) //Tamanho de 500px
            .jpeg({ quality: 70})//Qualidade em 70%
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )
        
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        return res.json(post);
    }
}