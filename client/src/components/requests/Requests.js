import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRequests, fetchRequestsForUser } from '../../actions/util.actions';
import RequestItem from './RequestItem';

const Requests = (props) => {

    const { requests, supervisor, loading, fetchRequests, fetchRequestsForUser } = props;

    useEffect(()=>{
        supervisor ? fetchRequests() : fetchRequestsForUser();
    },[]);


    return (
        <div className="all-users">
            {!loading && requests.map(request => <RequestItem request={request}/>)}
        </div>
    )
}

const mapStateToProps = state => ({
    requests: state.util.requests,
    loading: state.util.loading,
    supervisor: state.user.supervisor
})

export default connect(mapStateToProps, { fetchRequests, fetchRequestsForUser })(Requests)