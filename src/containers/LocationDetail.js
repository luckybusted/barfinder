import React, {Component} from 'react';
import Loader from "../modules/Loader";

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class LocationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match,
            detailID: {}
        };
        this.renderDetails = this.renderDetails.bind(this);
    }

    componentWillMount() {
        let search = window.location.search,
            sliced = search.slice(1),
            splitted = sliced.split('&'),
            obj = {};

        if (search === '') {
            return obj
        } else {

            splitted.map((query) => {
                    let key,
                        value;

                    query = query.split('=');
                    key = query[0];
                    value = query[1];

                    if (!obj[key]) {
                        obj[key] = value;
                    } else {
                        // Key already exists!
                    }

                }
            );
        }
        console.log('SEARCH PARAMS', splitted);
        console.log('OBJ', obj);

        this.setState({
            detailID: obj
        });

    }

    renderDetails() {
        if (this.state.detailID.id) {

            console.log('THIS STATE GOT ID');
            this.props.detailCall(this.state.detailID.id);

        } else { // coming from the get-lucky link
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
                <Loader/>
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
        testCall: (params) => dispatch(actions.testCall(params)),
        detailCall: (id) => dispatch(actions.detailCall(id))
    })
)(LocationDetail);

