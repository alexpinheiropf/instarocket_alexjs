const Post = require('../models/Post');

module.exports = {

    //Cadastrar novos Likes 
    async store(req, res){
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        //Enviar os dados do like
        req.io.emit('like', post);
       
        return res.json(post);
    }
}