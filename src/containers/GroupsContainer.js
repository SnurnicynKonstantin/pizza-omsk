import React , { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GroupTitle from '../components/GroupTitleComponent';
import GroupDescription from '../components/GroupDescriptionComponent';
import GroupContent from '../components/GroupContentComponent';
import Groups from '../data/groups';

class GroupsContainer extends Component {

    render() {

        let groups = [];

        Groups.forEach(function(group) {
            groups.push(<GroupTitle attributes={group}/>);
            groups.push(<GroupDescription attributes={group}/>);
            groups.push(<GroupContent attributes={group}/>);
        });


        return (
            <div className="prods_list container">
                {groups}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: null//state.user
    };
}

export default connect(mapStateToProps)(GroupsContainer);