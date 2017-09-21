import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Slider from './SliderContainer';

class OrderContainer extends Component {

    render() {
        return (
            <div >
                <div className="banner_block">
                    <Slider/>
                </div>
                <table className="table-inverse">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    </tbody>
                </table>
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