import React, {Component} from 'react';
import LocationsListItem from "../modules/LocationsListItem";

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
                return <li key={'item' + i} className="locationsListItem">
                    <h3>{item.name}</h3>
                    {/*<img src={item.image_url} alt=""/>*/}
                </li>
            }
        );

        return <ul>
            {locations}
        </ul>

    }

    render() {
        return (
            <div>
                <h4>LOCATIONS LIST</h4>
                {this.renderLocations()}
            </div>
        );
    }
}

export default LocationsList;