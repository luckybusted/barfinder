import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loader from "../modules/Loader";

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class Home extends Component {

    componentWillMount() {
        this.props.setEnv('Home');
    }

    componentWillUnmount() {
        this.props.setEnv('');
    }

    render() {

        let showSpinner = this.props.showLocationLoader,
            noLocation = this.props.noLocation;

        return (
            <div className="container">
                {noLocation &&
                <div className='alert-danger p-4 d-flex align-content-center justify-content-center'>
                    Wir konnten Ihren Standort nicht ermitteln. Bitte Versuchen Sie es erneut.
                </div>
                }
                {!noLocation &&
                <div className="row">
                    <div className="col-sm-6 mb-4">
                        <Link to={{
                            pathname: '/LocationDetail',
                            state: {
                                feelingLucky: true
                            }
                        }} className="btn btn-block text-uppercase p-4 btn-primary btn-lg">Auf gut Glück</Link>
                    </div>
                    <div className="col-sm-6">
                        <Link to="/LocationsOverview"
                              className="btn btn-block text-uppercase p-4 btn-primary btn-lg">Bars Suchen</Link>
                    </div>
                </div>
                }
                {showSpinner &&
                <Loader/>
                }
                {/*
                <div>You are here: {this.props.userLocation.latitude + ', ' + this.props.userLocation.longitude}</div>
                */}

            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        userLocation: state.dataReducer.userLocation,
        showLocationLoader: state.dataReducer.showLocationLoader,
        noLocation: state.dataReducer.noLocation
    }),
    (dispatch) => ({
        setEnv: (env) => dispatch(actions.setEnv(env))
    })
)(Home);
