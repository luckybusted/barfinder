import React, {Component} from 'react';
import Loader from "../modules/Loader";

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
        this.setDetailId = this.setDetailId.bind(this);
        this.gamble = this.gamble.bind(this);
    }

    setDetailId() {
        let search = window.location.search,
            sliced = search.slice(1),
            splitted = sliced.split('&'),
            obj = {};

        splitted.map((query) => {
                let key,
                    value;

                query = query.split('=');
                key = query[0];
                value = query[1];

                obj[key] = value;

            }
        );

        this.props.detailCallAction(obj.id);
    }

    gamble(nextProps) {
        let apiData = nextProps ? nextProps.apiData.businesses : this.props.apiData.businesses;

        if (apiData) {
            let dataLength = apiData.length,
                numX = Math.floor((Math.random() * dataLength)),
                detailId = apiData[numX].id;

            //todo: push id to the URL bar '?id=' + detailId

            this.props.detailCallAction(detailId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.apiData !== nextProps.apiData) {
            this.gamble(nextProps);
        }
    }

    componentDidMount() {
        const {feelingLucky} = this.props.location.state;
        !feelingLucky ? this.setDetailId() : this.gamble();
    }

    renderDetails() {
        if (this.props.detailData) {

            let detailData = this.props.detailData;

            return [
                <div key={'main-image-container'} className="main-image-container">
                    <img src={detailData.image_url} alt=""/>
                </div>,
                <div key={'container'} className="container">
                    <h2>{detailData.name}</h2>
                    <div className="row">
                        <div className="col-3">{detailData.price}</div>
                        <div className="col-3">{detailData.rating}</div>
                        <div
                            className={`col-3 ${detailData.hours ? (detailData.hours[0].is_open_now ? 'alert-success' : 'alert-danger') : ''}`}>
                            {detailData.hours ? (detailData.hours[0].is_open_now ? 'Geöffnet' : 'Geschlossen') : ''}
                        </div>
                    </div>
                    <p>
                        {detailData.location ? detailData.location.address1 : ''}<br/>
                        {detailData.location ? detailData.location.zip_code : ''} {detailData.location ? detailData.location.city : ''}<br/>
                        {detailData.display_phone}
                    </p>
                </div>
            ]

        }
    }

    render() {
        return (
            <div>
                {this.renderDetails()}
            </div>

        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        userLocation: state.dataReducer.userLocation,
        showDataLoader: state.dataReducer.showDataLoader,
        showDetailLoader: state.dataReducer.showDetailLoader,
        apiData: state.dataReducer.apiData,
        detailData: state.dataReducer.detailData
    }),
    (dispatch) => ({
        testCall: (params) => dispatch(actions.testCall(params)),
        detailCallAction: (id) => dispatch(actions.detailCallAction(id))
    })
)(LocationDetail);

