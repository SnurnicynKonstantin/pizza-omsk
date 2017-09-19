import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Item from './ItemComponent';

class GroupContentComponent extends Component {

    render() {

        let components = [];
        let counter = 1;

        this.props.attributes.content.forEach(function(item) {
            if(counter % 2 === 0)
                components.push(<Item attributes={item} position="last"/>);
            else
                components.push(<Item attributes={item} position="first"/>);
            counter++;
        });

        return (
            <ul>
                {components}
            </ul>

        );
    }
}

function mapStateToProps (state) {
    return {
        user: null//state.user
    };
}

export default connect(mapStateToProps)(GroupContentComponent);