import React, { Component } from 'react';
import Axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    // having the same problem as before with get request taking longer than the execution of the rest of the code...
    // add a loading phase if the id is set, but not the post itself
    state = {
        loadedPost: null
    }

    //get the post
    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id != null) {
            // running into an infinite loop here... check to make sure the id has changed before making the request.
            // reason for the loop, state updates the component, hence executing this function... F***
            // first time around the loaded post will be null**
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id)) {
                Axios.get('/posts/' + this.props.match.params.id)
                .then(response => this.setState({loadedPost: response.data}));
            }
        }
    }

    // JSON test server site doesn't actually store the post requests, and it doesn't actually delete.. but normally this should work
    deletePostHandler = () => {
        Axios.delete('/posts/' + this.props.match.params.id)
            .then(response => console.log(response));
    }

    render () {
        //handle the default
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        // add a loading phase if the axios request has not finished yet
        if (this.props.match.params.id != null && this.state.loadedPost === null) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        
        if (this.state.loadedPost !== null) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }
        
        return post;
    }
}

export default FullPost;