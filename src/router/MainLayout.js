import React, {Component} from 'react';
import PageHead from '../components/PageBasics/PageHead'
import PageFoot from '../components/PageBasics/PageFoot'
import Filter from '../components/Filter'

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.params
        };
        this.filterToggle = this.filterToggle.bind(this);
    }

    filterToggle() {
        let filterShown = this.props.filterShown;

        if (filterShown) {
            this.props.filterToggleAction();
        }
    }

    render() {

        let home = this.props.env === 'Home';

        return [
            <PageHead key="pageHead"/>,
            <Filter key="filterNavigation"/>,
            <div className={`mainContent ${home ? '' : 'content'}`}
                 key="mainContent"
                 onClick={this.filterToggle}>
                {/*<MainNavigation/>*/}
                {this.props.children}
            </div>,
            <PageFoot key="pageFoot"/>
        ];
    }
}

export default ReactRedux.connect(
    (state) => ({
        env: state.dataReducer.env,
        filterShown: state.uiReducer.filterShown
    }),
    (dispatch) => ({
        filterToggleAction: () => dispatch(actions.filterToggleAction())
    })
)(MainLayout);
