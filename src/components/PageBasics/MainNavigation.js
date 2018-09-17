import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';

let actions = require('../../actions/actions');
let ReactRedux = require('react-redux');


class MainNavigation extends Component {

    componentDidMount() {
        //this.props.requestNavigation();
    }

    render() {

        return (
            <div className="mainNaviContainer" id="mainNaviContainer">
                <div className="mainNavi" id="mainNavi">
                    <ul className="leftnav-top-level">
                        <li><NavLink exact={true} activeClassName='active' to='/'>HOME</NavLink></li>
                        <li><NavLink activeClassName='active' to='/Informationen'>Informationen</NavLink></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(ReactRedux.connect(
    /*(state) => ({
        navigationData: state.dataReducer.navigationData
    }),
    (dispatch) => ({
        requestNavigation: () => dispatch(actions.requestNavigation())
    })*/
)(MainNavigation));
