import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';

class PageHead extends Component {

    componentDidMount() {

    }


    render() {


        return (
            <div className="header container" id="header">
                <Link to="/" className="logo">BAR FINDER</Link>
            </div>
        );
    }
}


export default PageHead;
