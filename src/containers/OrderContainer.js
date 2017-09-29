import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Slider from './SliderContainer';
import Item from '../components/order/ItemComponent';
import * as basketActions from '../actions/basketActions';

class OrderContainer extends Component {

    constructor(props) {
        super(props);
        let { dispatch } = this.props;
        this.basketActions = bindActionCreators(basketActions, dispatch);

        this.deleteItemHandler = this.deleteItemHandler.bind(this);
        this.incrementCountHandler = this.incrementCountHandler.bind(this);
        this.decrementCountHandler = this.decrementCountHandler.bind(this);
    }

    deleteItemHandler(key) {
        this.basketActions.deleteItem(key);
    }

    incrementCountHandler(key) {
        this.basketActions.incrementItemCount(key);
    }

    decrementCountHandler(key) {
        this.basketActions.decrementItemCount(key);
    }

    getCount() {
        let counter = 0;
        this.props.basket.forEach(function(item) {
            counter += item.price * item.counter;
        });
        return counter;
    }

    render() {
        console.log(this.props.basket);
        let order = [];
        var byKey = this.props.basket.slice(0);
        byKey.sort(function(a,b) {
            return a.key - b.key;
        });
        byKey.forEach(function(item) {
            order.push(
                <Item
                    item={item}
                    deleteItemHandler={this.deleteItemHandler}
                    incrementCountHandler={this.incrementCountHandler}
                    decrementCountHandler={this.decrementCountHandler}
                />
            );
        }, this);

        return (
            <div className="banner_block">
                <Slider/>
                <div className="container">
                    <h1 className="order-title">Ваш заказ:</h1>
                    { this.props.basket.length != 0 ?
                        <table className="table order-table">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Наименование</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Стоимость</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {order}
                            <tr>
                                <th>Сумма заказа: {this.getCount()} Р</th>
                            </tr>
                            </tbody>
                        </table>
                        :
                        <h1 className="order-title">Ваша корзина пуста</h1>
                    }
                    <form role="form">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input className="form-control" placeholder="Телефон"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Адрес</label>
                                    <input className="form-control" placeholder="Адрес"/>
                                </div>
                            </div>
                        </div><div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input className="form-control" placeholder="Имя"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Комментарий</label>
                                    <input className="form-control" placeholder="Комментарий"/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success">Оформить заказ</button>
                    </form>
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

export default connect(mapStateToProps)(OrderContainer);