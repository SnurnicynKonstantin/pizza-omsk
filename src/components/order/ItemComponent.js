import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class ItemComponent extends Component {

    constructor(props) {
        super(props);
        this.deleteItemHandler = this.deleteItemHandler.bind(this);
        this.incrementCountHandler = this.incrementCountHandler.bind(this);
        this.decrementCountHandler = this.decrementCountHandler.bind(this);
    }

    deleteItemHandler() {
        this.props.deleteItemHandler(this.props.item.key);
    }

    incrementCountHandler(event) {
        this.props.incrementCountHandler(this.props.item.key);
    }

    decrementCountHandler(event) {
        this.props.decrementCountHandler(this.props.item.key);
    }

    render() {
        return(
            <tr>
                <td>
                    <img className={this.props.item["pic-s"] + " order-pic"} title=""/>
                </td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price}</td>
                <td>
                    <div className="input-group">
                        <input type="text" className="form-control" value={this.props.item.counter}/>
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-danger" onClick={this.decrementCountHandler}>-</button>
                            <button type="button" className="btn btn-success" onClick={this.incrementCountHandler}>+</button>
                        </div>
                    </div>
                </td>
                <td>{this.props.item.counter * this.props.item.price}</td>
                <td>
                    <div className="buy_block" onClick={this.deleteItemHandler}>
                        Удалить
                    </div>
                </td>
            </tr>
        );
    }
}

function mapStateToProps (state) {
    return {
        // basket: state.basket
    };
}

export default connect(mapStateToProps)(ItemComponent);