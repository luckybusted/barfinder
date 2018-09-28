import React, {Component} from 'react';
import PageHead from '../components/PageBasics/PageHead'
import MainNavigation from '../components/PageBasics/MainNavigation'
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

    filterToggle(){
        this.props.filterToggleAction();
    }

    render() {

        let filterShown = this.props.filterShown;

        return [
            <PageHead key="pageHead"/>,
            <Filter key="filterNavigation"/>,
            <div className="mainContent"
                 key="mainContent"
                    onClick={filterShown ? this.filterToggle : ''}>
                {/*<MainNavigation/>*/}
                {this.props.children}
            </div>,
            <PageFoot key="pageFoot"/>
        ];
    }
}

export default ReactRedux.connect(
    (state) => ({
        filterShown: state.uiReducer.filterShown
    }),
    (dispatch) => ({
        filterToggleAction : () => dispatch(actions.filterToggleAction())
    })
)(MainLayout);
