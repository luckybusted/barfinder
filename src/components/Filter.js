import React, {Component} from 'react';

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
        console.log('FILTER UPDATE');
    }

    changeRadius() {

    }

    render() {

        let searchParams = this.props.searchParams.open_now;

        return (
            <div className={`filter animated bounceIn fast ${this.props.filterShown ? 'active' : ''}`}>

                <div className="form">
                    FILTER
                    <div className="form-check">
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
                    </div>

                    <button className="btn btn-primary">Suchen</button>
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
        changeOpen: () => dispatch(actions.changeOpen())
    })
)(Filter);
