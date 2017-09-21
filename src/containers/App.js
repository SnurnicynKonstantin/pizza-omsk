import React , { PropTypes, Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Menu from './MenuContainer';
import Head from './HeadContainer';
import Content from './ContentContainer';
import Footer from './FooterContainer';

class App extends Component {

    render() {
        return (
            <div className="main">
                <Menu/>
                <Head/>
                {this.props.children}
                <Footer/>
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