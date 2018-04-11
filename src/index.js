import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';

// set some defaults - this is pretty neat
Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
Axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
Axios.defaults.headers.post['Content-Type'] = 'application/json';

// Axios Interceptors allow request responses and errors to be handled globally from anywhere in the app
// use also accepts a second function to catch any errors
Axios.interceptors.request.use(request => {
    console.log(request);
    // need to return the request - otherwise it will be blocked... could edit it too though... pretty cool
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

Axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
