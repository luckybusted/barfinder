import React, {Component} from 'react';

class PageFoot extends Component {

    render() {

        return (
            <div className="footer container" id="footer">
                <div className="row">
                    <div className="col-6">Bar-Finder &copy; 2018</div>
                    <div className="col-6 text-right">powered by <span className="bf-yelp" />Yelp</div>
                </div>
            </div>
        );
    }
}

export default PageFoot;
