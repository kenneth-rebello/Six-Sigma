import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRequests, fetchRequestsForUser } from '../../actions/util.actions';
import RequestItem from './RequestItem';
import { List } from 'react-virtualized';

const Requests = (props) => {

    const { requests, supervisor, loading, fetchRequests, fetchRequestsForUser } = props;

    const [size, setSize] = useState({
        height: 0.85*window.innerHeight,
        width: 0.97*window.innerWidth,
        row: window.innerWidth<600 ? 200 : 135
    })

    useEffect(()=>{
        supervisor ? fetchRequests() : fetchRequestsForUser();
        window.addEventListener('resize', updateSize);
    },[]);

    const updateSize = () =>{
        setSize({
            height: 0.80*window.innerHeight,
            width: 0.97*window.innerWidth,
            row: window.innerWidth<600 ? 200 : 135
        });
    }

    const rowRenderer = ({ key, index, style}) => {
        
        return (
          <div key={key} style={style}>
            <RequestItem request={requests[index]}/>
          </div>
        );
    }

    return (
        <div className="all-users">
            
            {!loading && <List
                rowCount={requests.length}
                rowHeight={size.row}
                rowRenderer={rowRenderer}
                height={size.height}
                width={size.width}
            />}
            
        </div>
    )
}

const mapStateToProps = state => ({
    requests: state.util.requests,
    loading: state.util.loading,
    supervisor: state.user.supervisor
})

export default connect(mapStateToProps, { fetchRequests, fetchRequestsForUser })(Requests)