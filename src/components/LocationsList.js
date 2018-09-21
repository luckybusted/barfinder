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

        let locations = this.props.data.businesses.map((item, i) => {
                return [<div key={'item' + i} className="locationsListItem card col-sm-4">
                    <Link to={{
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
                        <h5><Link to={'/LocationDetail?id=' + item.id}>{item.name}</Link></h5>
                        <p className="card-text">
                            {item.location.address1}<br/>
                            {item.location.zip_code} {item.location.city}
                        </p>
                        <Link to={{
                            pathname: '/LocationDetail',
                            search: '?id=' + item.id,
                            state: {
                                feelingLucky: false
                            }
                        }} className="btn btn-primary">Let's go</Link>
                    </div>

                </div>,
                    <hr key={'divider' + i} className="card-divider"/>]
            }
        );

        return locations

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
        //testCall : (params) => dispatch(actions.testCall(params))
    })
)(LocationsList);
