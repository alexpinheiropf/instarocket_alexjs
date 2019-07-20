const mongoose = require('mongoose');

//Criação da base de dados no Mongo DB
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes:{
        type: Number,
        default: 0,
    }
}, {
        timestamps: true, //serve como create e update
    }
);
module.exports = mongoose.model('Post', PostSchema);//Exportando com o nome de Post