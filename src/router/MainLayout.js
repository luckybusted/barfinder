import React, {Component} from 'react';
import PageHead from '../components/PageBasics/PageHead'
import MainNavigation from '../components/PageBasics/MainNavigation'
import PageFoot from '../components/PageBasics/PageFoot';

class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            params: props.params
        }
    }

    render() {

        return [
            <PageHead key="pageHead"/>,
            <div className="mainContent"
                 key="mainContent">
                {/*<MainNavigation/>*/}
                {this.props.children}
            </div>,
            <PageFoot key="pageFoot"/>
        ];
    }
}

export default MainLayout;
