import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class ItemComponent extends Component {

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
                <a className="big_images" href="./uploads/position/margarita-b.jpg">
                    <img className={attributes["pic-s"] + " pic"} title=""/>
                </a>
                <div className="buy_block">
                    <span className="price">
                        <span>{attributes.price}</span>
                        <span className="rub"></span>
                    </span>
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