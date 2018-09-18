import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import Loader from "../modules/Loader";

let ReactRedux = require('react-redux');

class Home extends Component {

    render() {

        let showSpinner = this.props.showLocationLoader;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Link to={{
                            pathname: '/LocationDetail',
                            state: {
                                feelingLucky: true
                            }
                        }} className="btn btn-primary btn-lg">Auf gut Glück</Link></div>
                    <div className="col-6">
                        <Link to="/LocationsOverview"
                              className="btn btn-primary btn-lg">Bars Suchen</Link>
                    </div>
                </div>
                {showSpinner &&
                <Loader/>
                }
                {!showSpinner &&
                <div>You are here: {this.props.userLocation.latitude + ', ' + this.props.userLocation.longitude}</div>
                }

            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        userLocation: state.dataReducer.userLocation,
        showLocationLoader: state.dataReducer.showLocationLoader
    }),
    (dispatch) => ({
        //setLocation: (location) => dispatch(actions.setLocation(location)),
        //testCall : (params) => dispatch(actions.testCall(params))
    })
)(Home);