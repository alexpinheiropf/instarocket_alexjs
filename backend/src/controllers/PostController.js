const Post = require('../models/Post');

module.exports = {
    //Rota de listagem de posts
    async indexedDB(req, res){

    },

    //Cadastrar novos posts 
    async store(req, res){
        console.log(req.body);//teste de retorno

        return res.json({ok : true});
    }
}