import React, {Component} from 'react';
import history from '../../utils/history';
import {NavLink, Link, withRouter} from 'react-router-dom';

class PageHead extends Component {


    render() {

        let home = history.location.pathname === '/';

        return (
            <div className={home ? 'home-header container' : 'header container'} id="header">
                <Link to="/" className="logo">BAR FINDER</Link>
            </div>
        );

    }
}


export default PageHead;
