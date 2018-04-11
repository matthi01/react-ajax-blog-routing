import React, {Component} from 'react';
import Axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Route, Link} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    // componentDidMount() is the best lifecycle hook to use to send an http request
    // * take a look at the axios documentation on github - this is pretty cool

    // axios.get is asynchronus, it will need some time - JS executes synchronously, it won't pause until the axios call is
    // finished - this is actually good because it won't block us. because of this Axios is using promises
    // Promise - using .then() allows JS to execute a function once the promise is fulfilled.
    // this is why we're not setting it to a variable
    componentDidMount() {
        console.log(this.props);
        Axios.get('/posts').then(response => {
            //console.log(response);
            const posts = response.data.slice(0, 4);
            // the test server doesn't have an author field... just add it for each post
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Matthias'
                }
            });
            this.setState({posts: updatedPosts});
        }).catch(error => {
            //console.log(error)
            this.setState({error: true});
        });
    }

    postClickedHandler = (id) => {
        //console.log('clicked id: ' + id);
        this.props.history.push('/posts/' + id)
    }

    // when a post is clicked, bring the post ID into the full post component to display - set this in the state
    render() {

        // add display for error handling
        let posts = <p style={{textAlign: 'center'}}>Something went wrong.</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return  <Link to={'/posts/' + post.id} key={post.id} >
                            <Post 
                                title={post.title} 
                                author={post.author}
                                clicked={() => this.postClickedHandler(post.id)} />
                        </Link>
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* :id tells the browser that something dynamic will be appended to the url  / route parameter */}
                <Route path={this.props.match.url + "/:id"} component={FullPost} />
            </div>
        );
    }
}

export default Posts;