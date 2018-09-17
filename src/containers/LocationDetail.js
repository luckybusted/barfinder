import React, {Component} from 'react';

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class LocationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match
        };
        this.renderDetails = this.renderDetails.bind(this);
    }

    renderDetails() {
        if (this.props.data) {

        } else {
            if (this.props.apiData.businesses) {
                let apiData = this.props.apiData.businesses,
                    dataLength = apiData.length,
                    numX = Math.floor((Math.random() * dataLength)),
                    detail = apiData[numX];

                console.log('APIDATA', apiData);
                console.log('NUM X', numX);
                console.log('DETAIL', detail);

                return <div>{detail.name}</div>

            } else {
                console.log('NO PROPSDATA NO APIDATA');
            }
        }
    }

    render() {
        return (
            <div>LOCATION DETAIL
                {this.renderDetails()}
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
)(LocationDetail);

