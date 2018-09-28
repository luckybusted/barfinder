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
            image: ''
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

    componentWillMount() {
        this.setState({image: ''})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.apiData !== nextProps.apiData) {
            this.gamble(nextProps);
        }
    }

    componentDidMount() {
        let detailData = this.props.detailData;

        const {feelingLucky} = this.props.location.state;
        !feelingLucky ? this.setDetailId() : this.gamble();

        if (detailData.photos) {
            this.setState({image: detailData.photos[0]});
        }
    }

    renderDetails() {
        if (this.props.detailData) {

            let detailData = this.props.detailData;
            let images = detailData.photos.map((img, i) => {
                return <li key={'subImage' + i}>
                    <img onClick={() => this.setState({image: img})} src={img} alt=""/>
                </li>
            });

            return [
                <div key={'main-image-container'} className="main-image-container">
                    <img src={this.state.image ? this.state.image : detailData.image_url} alt=""/>
                </div>,
                <ul className="sub-images" key='sub-images'>
                    {images}
                </ul>,
                <div key={'container'} className="container">
                    <h2>{detailData.name}</h2>
                    <div className="row">
                        <div className="col-6">
                            <p className="price">{detailData.price}</p>
                            <p className="rating">
                                <span className="ratingStars"
                                      style={{width: 18 * detailData.rating}}/>{detailData.rating}</p>
                        </div>
                        <div
                            className={`col-6 ${detailData.hours ? (detailData.hours[0].is_open_now ? 'alert-success' : 'alert-danger') : ''}`}>
                            {detailData.hours ? (detailData.hours[0].is_open_now ? 'Geöffnet' : 'Geschlossen') : ''}
                        </div>
                    </div>
                    <p>
                        {detailData.location ? detailData.location.address1 : ''}<br/>
                        {detailData.location ? detailData.location.zip_code : ''} {detailData.location ? detailData.location.city : ''}<br/>
                        {detailData.display_phone}
                    </p>

                    <a href={`http://maps.google.de/maps?q=${detailData.coordinates.latitude},${detailData.coordinates.longitude}&z=19`} className="btn btn-block btn-primary">Route anzeigen</a>

                </div>
            ]

        }
    }

    render() {

        let detailLoader = this.props.showDetailLoader;

        return (
            <div>
                {detailLoader &&
                <Loader/>
                }

                {!detailLoader &&
                this.renderDetails()
                }
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
        apiCall: (params) => dispatch(actions.apiCall(params)),
        detailCallAction: (id) => dispatch(actions.detailCallAction(id))
    })
)(LocationDetail);

