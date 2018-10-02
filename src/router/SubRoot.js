import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from '../containers/Home';
import LocationDetail from '../containers/LocationDetail';
import LocationsOverview from '../containers/LocationsOverview';
import Imprint from '../containers/Imprint';
import About from '../containers/About';

import MainLayout from './MainLayout.js';
import api from '../utils/api';

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
        this.getPosition = this.getPosition.bind(this);
    }

    success(pos) {
        let location = {
            longitude: pos.longitude,
            latitude: pos.latitude,
        },
        params = {
            longitude: pos.longitude,
            latitude: pos.latitude,
            categories: 'bars',
            //attributes: Alcohol.full_bar
        };

        this.props.setLocation(location);
        this.props.apiCall(params);

    }

    getPosition(posOptions) {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, posOptions);
        });
    }

    componentWillMount() {

        let posOptions = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        this.getPosition(posOptions)
            .then((position) => {
                console.log(position);
                this.success(position.coords);
            })
            .catch((err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);

                //fallback get location
                api.getLocation()
                    .then((response) => {
                        let loc = response.loc.split(','),
                            coords = {
                                latitude: loc[0],
                                longitude: loc[1]
                            };
                        this.success(coords);
                    })
                    .catch((err) => {

                    });

            });

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
                    <Route path={'/Imprint'}
                           component={Imprint}
                           key='Imprint'/>,
                    <Route path={'/About'}
                           component={About}
                           key='About'/>,
                    <Route component={Home}
                           key='NotFound'/>
                </Switch>

            </MainLayout>
        )
    }
}

export default ReactRedux.connect(
    (state) => ({}),
    (dispatch) => ({
        setLocation: (location) => dispatch(actions.setLocation(location)),
        apiCall: (params) => dispatch(actions.apiCall(params))
    })
)(SubRoot);