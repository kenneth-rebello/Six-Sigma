import React, { useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles, getOverdueFiles, getLateFiles } from '../../actions/file.actions';
import Dashboard from './Dashboard';
import { checkPending } from '../../actions/alert.actions';

const Home = ({ getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles, getOverdueFiles, getLateFiles, checkPending,
             owned, assigned, upcoming, completed, overdue, supervisor, msg, url }) => {

    useEffect(()=>{
        getOwnedFiles();
        getUpcomingFiles();
        getCompletedFiles();
        if(supervisor){
            getAssignedFiles();
            getOverdueFiles();
            checkPending();
        }else{
            getLateFiles();
        }
    },[])

    useEffect(()=>{
        if(msg){
            alert(`${msg} - ${url} is a secured page`)
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
    overdue: state.file.overdue
})

export default connect(mapStateToProps, { getOwnedFiles, getAssignedFiles, getUpcomingFiles,
    getCompletedFiles, getOverdueFiles, getLateFiles, checkPending  })(Home);