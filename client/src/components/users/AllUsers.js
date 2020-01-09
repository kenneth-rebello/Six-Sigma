import React ,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../actions/user.actions';
import UserItem from './UserItem';

const AllUsers = (props) => {

    const { users, loading, fetchAllUsers } = props;

    const [size, setSize] = useState({
        height: 0.85*window.innerHeight,
        width: 0.97*window.innerWidth
    })

    useEffect(()=>{
        fetchAllUsers();
        window.addEventListener('resize', updateSize);
    },[]);

    const updateSize = () =>{
        setSize({
            height: 0.80*window.innerHeight,
            width: 0.97*window.innerWidth
        });
    }

    const rowRenderer = ({ key, index, style}) => {
        
        return (
          <Link to={`/user/${users[index]._id}`} key={key} style={style}>
            <UserItem user={users[index]}/>
          </Link>
        );
    }

    return (
        <div className="all-users">
            
            {!loading && <List
                rowCount={users.length}
                rowHeight={150}
                rowRenderer={rowRenderer}
                height={size.height}
                width={size.width}
            />}
            
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.user.users,
    loading: state.user.loading
})

export default connect(mapStateToProps, {fetchAllUsers})(AllUsers);