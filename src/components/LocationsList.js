import React, {Component} from 'react';
import {Link} from 'react-router-dom';

let ReactRedux = require('react-redux');

class LocationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match
        };
        this.renderLocations = this.renderLocations.bind(this);
    }

    renderLocations() {

        if(this.props.data.businesses.length > 0){

            return this.props.data.businesses.map((item, i) => {
                return [<div key={'item' + i} className="locationsListItem card col-12">
                    <Link className="image-wrapper"
                        to={{
                        pathname: '/LocationDetail',
                        search: '?id=' + item.id,
                        state: {
                            feelingLucky: false
                        }
                    }}>
                        <img className="card-img-top"
                             src={item.image_url}
                             alt={item.name}/>
                    </Link>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <p className="address">{item.location.address1}</p>
                                <Link className="name" to={{
                                    pathname: '/LocationDetail',
                                    search: '?id=' + item.id,
                                    state: {
                                        feelingLucky: false
                                    }
                                }}><h3 className='my-3'>{item.name}</h3></Link>
                            </div>
                            <div className="col-12 d-flex justify-content-between">
                                <p className="rating">
                                    <span className="ratingStars" style={{width: 18*item.rating}}/>({item.review_count})</p>

                                <p className="price">{item.price}</p>
                                <p className="distance">{Math.floor(item.distance)} m</p>
                            </div>

                        </div>

                    </div>

                </div>,
                    <hr key={'divider' + i} className="card-divider"/>]
            }
        );

        } else {
            return <div className="error-message"><p><span role="img" aria-label='oh no!!!!'>😱😱😱</span></p><p>Keine Locations in deiner Nähe gefunden. Bitte versuche die Suchkriterien zu erweitern.</p></div>
        }

    }

    render() {

        return (
            <div className="locations-list row">

                {this.renderLocations()}

            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        showDataLoader: state.dataReducer.showDataLoader
    }),
    (dispatch) => ({
        //setLocation: (location) => dispatch(actions.setLocation(location)),
        //apiCall : (params) => dispatch(actions.apiCall(params))
    })
)(LocationsList);
