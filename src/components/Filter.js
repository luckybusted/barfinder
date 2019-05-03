import React, {Component} from 'react';
import Slider from 'rc-slider';
import {Link} from "react-router-dom/";
import history from '../utils/history';

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match,
            price: ''
        };
        this.filterUpdate = this.filterUpdate.bind(this);
        this.changeRadius = this.changeRadius.bind(this);
        this.changePrice = this.changePrice.bind(this);
    }

    filterUpdate() {

        let newParams = {};

        Object.entries(this.props.searchParams).map(([key, val]) => {
            if (val) {
                newParams[key] = val
            }
        });

        history.push('/LocationsOverview');
        this.props.apiCall(newParams);
        this.props.filterToggleAction();
    }

    changeRadius(e) {
        this.props.changeRadius(e);
    }

    changePrice(e) {

        let clickedPrice = parseInt(e.target.value),
            curPrice = JSON.parse('[' + this.props.searchParams.price + ']');

        if (curPrice.includes(clickedPrice)) {
            let place = curPrice.indexOf(clickedPrice);
            curPrice.splice(place, 1);
        } else {
            curPrice.push(clickedPrice);
        }

        let newPrice = curPrice.toString();

        this.props.changePrice(newPrice);

    }

    render() {

        let searchParams = this.props.searchParams;

        return (
            <div className={`filter animated bounceIn fast ${this.props.filterShown ? 'active' : ''}`}>

                <div className="form">

                    <div className="filter-wrapper">
                        <p className="label">Öffnungszeit</p>
                        <button type="button"
                                className={`btn btn-chbx btn-sm ${searchParams.open_now ? 'active bf-ok' : 'bf-cancel'}`}
                                data-toggle="button"
                                aria-pressed={searchParams.open_now}
                                onClick={this.props.changeOpen}>jetzt Geöffnet
                        </button>
                    </div>

                    <div className="filter-wrapper">
                        <p className="label">Preis</p>
                        <div className="btn-group">
                            <button type="button"
                                    className={`btn btn-chbx btn-sm ${searchParams.price.includes('1') ? 'active bf-ok' : 'bf-cancel'}`}
                                    data-toggle="button"
                                    value={1}
                                    aria-pressed={searchParams.price.includes('1')}
                                    onClick={(e) => this.changePrice(e)}>€
                            </button>
                            <button type="button"
                                    className={`btn btn-chbx btn-sm ${searchParams.price.includes('2') ? 'active bf-ok' : 'bf-cancel'}`}
                                    data-toggle="button"
                                    value={2}
                                    aria-pressed={searchParams.price.includes('2')}
                                    onClick={(e) => this.changePrice(e)}>€€
                            </button>
                            <button type="button"
                                    className={`btn btn-chbx btn-sm ${searchParams.price.includes('3') ? 'active bf-ok' : 'bf-cancel'}`}
                                    data-toggle="button"
                                    value={3}
                                    aria-pressed={searchParams.price.includes('3')}
                                    onClick={(e) => this.changePrice(e)}>€€€
                            </button>
                            <button type="button"
                                    className={`btn btn-chbx btn-sm ${searchParams.price.includes('4') ? 'active bf-ok' : 'bf-cancel'}`}
                                    data-toggle="button"
                                    value={4}
                                    aria-pressed={searchParams.price.includes('4')}
                                    onClick={(e) => this.changePrice(e)}>€€€€
                            </button>
                        </div>
                    </div>

                    <div className="filter-wrapper">
                        <p className="label">Radius</p>
                        <Slider min={0} max={5000} defaultValue={2000} onAfterChange={this.changeRadius}/>
                        <span className="label">{this.props.searchParams.radius}m</span>
                    </div>

                    <button className="btn submit btn-primary btn-block"
                            onClick={this.filterUpdate}>Suchen
                    </button>
                </div>

                <nav className="filter-navigation">
                    <ul>
                        <li>
                            <Link to="/About" onClick={this.props.filterToggleAction}>Über Bar-Finder</Link>
                        </li>
                        <li>
                            <Link to="/Imprint" onClick={this.props.filterToggleAction}>Impressum</Link>
                        </li>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default ReactRedux.connect(
    (state) => ({
        filterShown: state.uiReducer.filterShown,
        searchParams: state.dataReducer.searchParams
    }),
    (dispatch) => ({
        changeOpen: () => dispatch(actions.changeOpen()),
        changeRadius: (radius) => dispatch(actions.changeRadius(radius)),
        changePrice: (price) => dispatch(actions.changePrice(price)),
        apiCall: (params) => dispatch(actions.apiCall(params)),
        filterToggleAction: () => dispatch(actions.filterToggleAction())
    })
)(Filter);
