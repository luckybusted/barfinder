import React, {Component} from 'react';
import Slider, { Range } from 'rc-slider';

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.match
        };
        this.filterUpdate = this.filterUpdate.bind(this);
        this.changeRadius = this.changeRadius.bind(this);
    }

    filterUpdate() {
        this.props.apiCall(this.props.searchParams);
        this.props.filterToggleAction();
    }

    changeRadius(e) {
        this.props.changeRadius(e);
    }

    render() {

        let searchParams = this.props.searchParams;

        return (
            <div className={`filter animated bounceIn fast ${this.props.filterShown ? 'active' : ''}`}>

                <div className="form">

                    {/*<div className="form-check">
                        <input className="form-check-input"
                               type="checkbox"
                               value=""
                               id="opened"
                               defaultChecked={searchParams.open_now}
                               onClick={this.props.changeOpen}
                        />
                        <label className="form-check-label" htmlFor="opened">
                            jetzt Geöffnet
                        </label>
                    </div>*/}

                    <button type="button"
                            className={`btn btn-chbx btn-sm ${searchParams.open_now ? 'active' : ''}`}
                            data-toggle="button"
                            aria-pressed={searchParams.open_now}
                            onClick={this.props.changeOpen}>jetzt Geöffnet</button>

                    <p>Radius</p>
                    <Slider min={0} max={5000} defaultValue={2000} onAfterChange={this.changeRadius}/>

                    <button className="btn submit btn-primary btn-block"
                            onClick={this.filterUpdate}>Suchen</button>
                </div>

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
        apiCall: (params) => dispatch(actions.apiCall(params)),
        filterToggleAction : () => dispatch(actions.filterToggleAction())
    })
)(Filter);
