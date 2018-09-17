import React, {Component} from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import Loader from "../modules/Loader";

let ReactRedux = require('react-redux');

class Home extends Component {

    // how to make a call: https://medium.com/@sparkyevangelista/http-request-to-yelps-api-using-react-native-c567137f534f

    render() {

        let showSpinner = this.props.showLocationLoader;

        return (
            <div>
                THIS IS THE HOMEPAGE
                <ul>
                    <li><Link to="/LocationDetail" href="">Auf gut Glück</Link></li>
                    <li><Link to="/LocationsOverview" href="">Bars Suchen</Link></li>
                </ul>
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