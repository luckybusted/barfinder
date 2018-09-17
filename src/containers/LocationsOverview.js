import React, {Component} from 'react';
import LocationsList from "../components/LocationsList";

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class LocationsOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match
        };
    }


    componentWillMount() {
        let params = {
            longitude: this.props.location.longitude,
            latitude: this.props.location.latitude,
            categories: 'bars'
        };

        {this.props.location.longitude &&
            this.props.testCall(params);
        }

    }

    componentWillReceiveProps(nextProps){
        if (this.props.location !== nextProps.location) {

            let params = {
                longitude: nextProps.location.longitude,
                latitude: nextProps.location.latitude,
                categories: 'bars'
            };

            this.props.testCall(params);

        }
    }

    render() {

        let showSpinner = this.props.showDataLoader;

        return (
            <div className="container">
                <h3>Bars in deiner Nähe:</h3>

                {this.props.apiData && !showSpinner &&
                <LocationsList data={this.props.apiData}/>
                }
            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        location: state.dataReducer.location,
        showDataLoader: state.dataReducer.showDataLoader,
        apiData: state.dataReducer.apiData
    }),
    (dispatch) => ({
        testCall: (params) => dispatch(actions.testCall(params))
    })
)(LocationsOverview);
