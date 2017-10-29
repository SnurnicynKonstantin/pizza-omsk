import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class BasketComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="static-basket">
                Корзина
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        // basket: state.basket
    };
}

export default connect(mapStateToProps)(BasketComponent);