import React, { Component } from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';

class Home extends Component {

    // how to make a call: https://medium.com/@sparkyevangelista/http-request-to-yelps-api-using-react-native-c567137f534f

    render() {
        return (
            <div>
                THIS IS THE HOMEPAGE
                <a href="">Auf gut Glück</a>
                <a href="">Bars Suchen</a>
            </div>
        );
    }
}

export default Home;