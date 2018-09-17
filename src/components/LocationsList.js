import React, {Component} from 'react';
import LocationsListItem from "../modules/LocationsListItem";
import {NavLink, Link, withRouter} from 'react-router-dom';
import Loader from "../modules/Loader";

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
        console.log('THIS PROPS DATA', this.props.data);

        let locations = this.props.data.businesses.map((item, i) => {
                return <div key={'item' + i} className="locationsListItem card col-sm-4">
                    <img className="card-img-top" src={item.image_url} alt={item.name}/>
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

                </div>
            }
        );

        return locations

    }

    render() {

        let showSpinner = this.props.showDataLoader;

        return (
            <div className="row">
                {showSpinner &&
                <Loader/>
                }

                {!showSpinner &&
                this.renderLocations()
                }
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
