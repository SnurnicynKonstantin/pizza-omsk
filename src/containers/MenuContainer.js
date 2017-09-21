import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class MenuContainer extends Component {

    getCount() {
        let counter = 0;
        console.log("Basket from menu", this.props.basket);
        this.props.basket.forEach(function(item) {
            counter += item.price * item.counter;
        });
        return counter;
    }

    render() {
        return (
            <div className="top_menu">
                <div className="block_inner">
                    <div className="head_basket">
                        <div id="main_basket" className="head_basket">
                            <Link to={`/order/`}>Корзина</Link>
                            <span className="sum">
                                <strong>{this.getCount()}</strong>
                                <img src="/pix/rub2.png" alt="Р" title="Р"/>
                            </span>
                        </div>
                    </div>
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
        basket: state.basket
    };
}

export default connect(mapStateToProps)(MenuContainer);