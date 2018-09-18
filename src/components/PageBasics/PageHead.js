import React, {Component} from 'react';
import history from '../../utils/history';
import {NavLink, Link, withRouter} from 'react-router-dom';

class PageHead extends Component {


    render() {

        let home = history.location.pathname === '/';

        return (
            <div className={home ? 'home-header container' : 'header container'} id="header">
                <Link to="/" className="logo">
                    <div class="sign">
                        <div class="neon-blue" id="title">B<span id="fade">ar</span> </div>
                        <div class="neon-blue"> <span class="neon-purple" id="trav">Finder</span></div>
                    </div>
                </Link>
            </div>
        );

    }
}


export default PageHead;
