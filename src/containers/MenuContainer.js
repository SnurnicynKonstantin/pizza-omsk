import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class MenuContainer extends Component {

    render() {
        return (
            <div className="top_menu">
                <div className="block_inner">
                    <ul>
                        <li id="pizza_button">
                            <a href="#">Пицца</a>
                        </li>
                        <li id="hachapuri_button">
                            <a href="#">Хачапури</a>
                        </li>
                        <li id="shaurma_button">
                            <a href="#">Шаурма</a>
                        </li>
                        <li id="koktely_button">
                            <a href="#">Молочные коктейли</a>
                        </li>
                        <li id="napitki_button">
                            <a href="#">Напитки</a>
                        </li>
                    </ul>
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

export default connect(mapStateToProps)(MenuContainer);