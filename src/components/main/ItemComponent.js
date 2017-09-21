import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class ItemComponent extends Component {

    constructor(props) {
        super(props);
        this.buyItemHandler = this.buyItemHandler.bind(this);
    }

    buyItemHandler() {
        this.props.buyItemHandler(this.props.attributes);
    }

    render() {

        let attributes = this.props.attributes;

        let compositions = [];
        let composition = [];
        let counter = 0;

        this.props.attributes.composition.forEach(function(item) {
            counter++;
            composition.push(<td className={item}><img className={item}/></td>);
            if(counter === 3) {
                compositions.push(<tr>{composition}</tr>);
                counter = 0;
                composition = [];
            }
        });
        if(counter > 0 && counter < 3)
            compositions.push(<tr>{composition}</tr>);


        return (
            <li className={this.props.position}>
                <a className="big_images" href="./position/margarita-b.jpg">
                    <img className={attributes["pic-s"] + " pic"} title=""/>
                </a>
                <div className="buy_block">
                    <a onClick={this.buyItemHandler}>
                        <span className="price">
                            <span>{attributes.price}</span>
                            <span className="rub"></span>
                        </span>
                        <span className="buy_btn"><span>добавить</span> в корзину</span>
                    </a>
                </div>
                <span className="title"><div className="numeration">{attributes.key}</div>{attributes.name}</span>
                <div className="prod_info">{attributes.info}</div>
                {attributes.description}
                <div className="composition">
                    <table>
                        <tbody>
                            {compositions}
                        </tbody>
                    </table>
                </div>
            </li>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: null//state.user
    };
}

export default connect(mapStateToProps)(ItemComponent);