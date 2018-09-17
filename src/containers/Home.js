import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import Loader from "../modules/Loader";

let ReactRedux = require('react-redux');

class Home extends Component {

    // how to make a call: https://medium.com/@sparkyevangelista/http-request-to-yelps-api-using-react-native-c567137f534f

    render() {

        let showSpinner = this.props.showLocationLoader;

        return (
            <div className="container">
                HOMEPAGE
                <div className="row">
                    <div className="col-6"><Link to="/LocationDetail" className="btn btn-primary btn-lg">Auf gut Glück</Link></div>
                    <div className="col-6"><Link to="/LocationsOverview" className="btn btn-primary btn-lg">Bars Suchen</Link></div>
                </div>
                {showSpinner &&
                <Loader/>
                }
                {!showSpinner &&
                <div>You are here: {this.props.location.latitude + ', ' + this.props.location.longitude}</div>
                }

            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        location: state.dataReducer.location,
        showLocationLoader: state.dataReducer.showLocationLoader
    }),
    (dispatch) => ({
        //setLocation: (location) => dispatch(actions.setLocation(location)),
        //testCall : (params) => dispatch(actions.testCall(params))
    })
)(Home);