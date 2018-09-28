import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';

let ReactRedux = require('react-redux');
let actions = require('../../actions/actions');

class PageHead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match
        };
        this.filterToggle = this.filterToggle.bind(this);
    }

    filterToggle(){
        console.log('FILTER TOGGLE');
        this.props.filterToggleAction();
    }

    render() {

        let home = this.props.env === 'Home';

        return (
            <div className={home ? 'home-header' : 'header'} id="header">
                <Link to="/" className="logo">
                    <div className="sign">
                        <div className="neon-blue" id="title">B<span id="fade">ar</span> </div>
                        <div className="neon-blue"> <span className="neon-purple" id="trav">Finder</span></div>
                    </div>
                </Link>
                {home ? '' :
                <a className="filter-toggle bf-filter" onClick={this.filterToggle}/>
                }
            </div>
        );

    }
}

export default ReactRedux.connect(
    (state) => ({
        env: state.dataReducer.env
    }),
    (dispatch) => ({
        filterToggleAction : () => dispatch(actions.filterToggleAction())
    })
)(PageHead);

