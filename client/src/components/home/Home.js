import React, { useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles, getOverdueFiles, getLateFiles } from '../../actions/file.actions';
import Dashboard from './Dashboard';
import { checkPending } from '../../actions/alert.actions';
import { fetchReports, fetchRequests } from '../../actions/util.actions';

const Home = ({ getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles, getOverdueFiles,
             getLateFiles, checkPending, fetchReports, fetchRequests, reports, requests,
             owned, assigned, upcoming, completed, overdue, supervisor }) => {

    useEffect(()=>{
        getOwnedFiles();
        getUpcomingFiles();
        getCompletedFiles();
        if(supervisor){
            getAssignedFiles();
            getOverdueFiles();
            fetchReports();
            fetchRequests();
            checkPending(reports, requests);
        }else{
            getLateFiles();
        }
    },[])

    return (
        <div className="home">
            {owned && <Dashboard owned={owned} 
                assigned={assigned} 
                upcoming={upcoming} 
                completed={completed}
                overdue={overdue}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    supervisor: state.user.supervisor,
    owned: state.file.owned,
    assigned: state.file.assigned,
    upcoming: state.file.upcoming,
    completed: state.file.completed,
    overdue: state.file.overdue,
    reports: state.file.reports,
    requests: state.util.requests
})

export default connect(mapStateToProps, { getOwnedFiles, getAssignedFiles, getUpcomingFiles,
    getCompletedFiles, getOverdueFiles, getLateFiles, fetchRequests, fetchReports, checkPending })(Home);