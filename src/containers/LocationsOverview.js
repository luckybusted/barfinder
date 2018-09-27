import React, {Component} from 'react';
import LocationsList from "../components/LocationsList";
import Loader from "../modules/Loader";

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
        let params = this.props.searchParams;

        {this.props.userLocation.longitude &&
            this.props.testCall(params);
        }

    }

    componentWillReceiveProps(nextProps){
        if (this.props.userLocation !== nextProps.userLocation) {
            let params = nextProps.searchParams;
            this.props.testCall(params);
        }
    }

    render() {

        let showSpinner = this.props.showDataLoader;

        return (
            <div className="container">

                {showSpinner &&
                    <Loader/>
                }

                {this.props.apiData && !showSpinner &&
                <LocationsList data={this.props.apiData}/>
                }
            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        userLocation: state.dataReducer.userLocation,
        showDataLoader: state.dataReducer.showDataLoader,
        apiData: state.dataReducer.apiData,
        searchParams: state.dataReducer.searchParams
    }),
    (dispatch) => ({
        testCall: (params) => dispatch(actions.testCall(params))
    })
)(LocationsOverview);
