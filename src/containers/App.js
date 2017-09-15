import React , { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Menu from './MenuContainer';
import Head from './HeadContainer';

class App extends Component {

    render() {
        return (
            <div className="main">
                <Menu/>
                <Head/>
                <h1>App</h1>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: null//state.user
    };
}

export default connect(mapStateToProps)(App);