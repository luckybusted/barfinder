import React, {Component} from 'react';
import Loader from "../modules/Loader";
import Carousel from 'nuka-carousel';


let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class LocationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match,
            image: '',
            feelingLucky: this.props.location.state.feelingLucky
        };
        this.renderDetails = this.renderDetails.bind(this);
        this.setDetailId = this.setDetailId.bind(this);
        this.gamble = this.gamble.bind(this);
    }

    setDetailId() {

        let search = window.location.search.substring(1),
            searchParams = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
                return key === "" ? value : decodeURIComponent(value)
            });

        this.props.detailCallAction(searchParams.id);
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

        if (this.props.apiData !== nextProps.apiData && this.state.feelingLucky) {
            this.gamble(nextProps);
        }
    }

    componentDidMount() {
        let detailData = this.props.detailData;

        this.state.feelingLucky ? this.gamble() : this.setDetailId();

        if (detailData.photos) {
            this.setState({image: detailData.photos[0]});
        }
    }

    renderDetails() {
        if (this.props.detailData) {

            let detailData = this.props.detailData;
            let images = detailData.photos.map((img, i) => {
                return <img src={img} alt="" key={img}/>
            });

            return [
                <Carousel key={'main-image-container'}>
                    {images}
                </Carousel>,
                <div key={'container'} className="container">
                    <h2>{detailData.name}</h2>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <p className="price">{detailData.price}</p>
                            <p className="rating">
                                <span className="ratingStars"
                                      style={{width: 18 * detailData.rating}}/>{detailData.rating}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>
                                {detailData.location ? detailData.location.address1 : ''}<br/>
                                {detailData.location ? detailData.location.zip_code : ''} {detailData.location ? detailData.location.city : ''}<br/>
                                {detailData.display_phone}
                            </p>
                        </div>
                        <div
                            className='col-6'>
                            <div className={`opening ${detailData.hours ? (detailData.hours[0].is_open_now ? 'alert-success' : 'alert-danger') : ''}`}>
                            {detailData.hours ? (detailData.hours[0].is_open_now ? 'Geöffnet' : 'Geschlossen') : ''}
                            </div>
                        </div>
                    </div>


                    <a href={`http://maps.google.de/maps?q=${detailData.coordinates.latitude},${detailData.coordinates.longitude}&z=19`}
                       className="btn my-4 py-3 btn-block btn-primary text-uppercase">Route anzeigen</a>

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

