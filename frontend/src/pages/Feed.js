import React, { Component } from 'react';
import api from '../services/api';

import './Feed.css';
import more from '../assets/more.png';
import like from '../assets/like.png';
import send from '../assets/send.png';
import comment from '../assets/comment.png';

class Feed extends Component {
    //Variavel dentro do componente para armazenar informações
    state = {
        feed : [],
    };

    async componentDidMount(){
        //Chamando a API do localhost/posts
        const response = await api.get('posts');

        this.setState({ feed : response.data });
    }

    render () {
        return(
            <section id="post-list">
                { this.state.feed.map(post => ( //Map => Percorre um vetor
                    <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>

                            
                        </div>
                        <img src={more} alt="Mais" />
                    </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="Mais" />

                       <footer>
                            <div className="actions">
                                <img src={like} alt=""/>
                                <img src={comment} alt=""/>
                                <img src={send} alt=""/>
                            </div>

                            <strong>{post.likes} curtidas</strong>

                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                       </footer> 
                </article>
                ) )}
            </section>
        );
    }
}

export default Feed;