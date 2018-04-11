import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component { 

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* there <a> tags trigger a reload - need to use <Link> instead
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>*/}
                            <li><NavLink to="/posts/">Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* // this is one way of doing it - using the render method + jsx
                <Route path={"/"} exact render={() => <h1>Home</h1>} />

                Switch is used to make sure that only one, the first route that matches the criteria is rendered
                */}
                <Switch>
                    <Route path={"/new-post"} component={NewPost} />
                    <Route path={"/posts/"} component={Posts} />
                    {/*<Route path={"/"} component={Posts} /> this works too, but Redirect seems cleaner */}
                    <Redirect from="/" to="/posts/" />
                    {/*Empty path would be a fallback, catches anything that wasn't handled */}
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;