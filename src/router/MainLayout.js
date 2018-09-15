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

        return (
            <div className="portalMainContent external" id="main">
                <PageHead/>
                <div className="standardContainer" style={{overflow: 'auto', marginTop: 20, position: 'relative'}}>
                    <MainNavigation/>
                    {this.props.children}
                </div>
                <PageFoot/>
            </div>
        );
    }
}

export default MainLayout;
