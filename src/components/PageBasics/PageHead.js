import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
        this.props.filterToggleAction();
    }

    render() {

        let home = this.props.env === 'Home',
            filterShown = this.props.filterShown;

        return (
            <div className={home ? 'home-header' : 'header'} id="header">
                <Link to="/" className="logo">
                    <div className="sign">
                        <div className="neon-blue" id="title">B<span id="fade">ar</span> </div>
                        <div className="neon-blue"> <span className="neon-purple">Finder</span></div>
                    </div>
                </Link>
                {home ? '' :
                <a className={`filter-toggle ${!filterShown ? 'bf-filter' : 'bf-cancel'}`} onClick={this.filterToggle}/>
                }
            </div>
        );

    }
}

export default ReactRedux.connect(
    (state) => ({
        env: state.dataReducer.env,
        filterShown: state.uiReducer.filterShown
    }),
    (dispatch) => ({
        filterToggleAction : () => dispatch(actions.filterToggleAction())
    })
)(PageHead);

