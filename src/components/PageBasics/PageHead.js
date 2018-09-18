import React, {Component} from 'react';
import history from '../../utils/history';
import {NavLink, Link, withRouter} from 'react-router-dom';

class PageHead extends Component {


    render() {

        let home = history.location.pathname === '/';

        return (
            <div className={home ? 'home-header container' : 'header container'} id="header">
                <Link to="/" className="logo">
                    <div className="sign">
                        <div className="neon-blue" id="title">B<span id="fade">ar</span> </div>
                        <div className="neon-blue"> <span className="neon-purple" id="trav">Finder</span></div>
                    </div>
                </Link>
            </div>
        );

    }
}


export default PageHead;
