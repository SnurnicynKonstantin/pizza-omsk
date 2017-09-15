import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class HeadContainer extends Component {

    render() {
        return (
            <div className="head container">
                <div className="logo">
                    <a href="/"><div className="divForLogo"></div></a>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: null//state.user
    };
}

export default connect(mapStateToProps)(HeadContainer);