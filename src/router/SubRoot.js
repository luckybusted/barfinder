import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import Home from '../containers/Home';
import LocationDetail from '../containers/LocationDetail';
import LocationsOverview from '../containers/LocationsOverview';
import Error from '../containers/Error';

import MainLayout from './MainLayout.js';
import history from '../utils/history';

let ReactRedux = require('react-redux');
let locale = require('browser-locale');
let actions = require('../actions/actions');


class SubRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match
        };
        this.success = this.success.bind(this);
    }

    success(pos) {
        let crd = pos.coords,
            latlng = crd.latitude + ',' + crd.longitude;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        this.props.setLocation(latlng);

    }

    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    componentWillMount() {
        let options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this.success, this.error, options);

        this.props.testCall();

    }

    componentDidMount() {

        //this.props.setLocation(history.location);

        /*history.listen(location => {
            this.props.setLocation(location);
        });*/
    }

    render() {

        return (
            <MainLayout params={this.state.params} props={this.state.props}>

                <Switch>
                    <Route exact path={'/'}
                           component={Home}
                           key='Home'/>,
                    <Route path={'/LocationsOverview'}
                           component={LocationsOverview}
                           key='LocationsOverview'/>,
                    <Route path={'/LocationDetail'}
                           component={LocationDetail}
                           key='LocationDetail'/>,
                    <Route component={Error}
                           key='Error'/>
                </Switch>

            </MainLayout>
        )
    }
}

export default ReactRedux.connect(
    (state) => ({

    }),
    (dispatch) => ({
        setLocation: (location) => dispatch(actions.setLocation(location)),
        testCall : () => dispatch(actions.testCall())
    })
)(SubRoot);
