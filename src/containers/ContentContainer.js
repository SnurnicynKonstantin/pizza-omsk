import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Slider from './SliderContainer';
import GreenLegend from './GreenLegendContainer';

class ContentContainer extends Component {

    render() {
        return (
            <div className="banner_block">
                <Slider/>
                <GreenLegend/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: null//state.user
    };
}

export default connect(mapStateToProps)(ContentContainer);