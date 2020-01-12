import React, { useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles } from '../../actions/file.actions';
import Dashboard from './Dashboard';

const Home = ({ getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles,
             owned, assigned, upcoming, completed, supervisor, msg, url }) => {

    useEffect(()=>{
        getOwnedFiles();
        getUpcomingFiles();
        getCompletedFiles();
        if(supervisor) getAssignedFiles();
    },[])

    useEffect(()=>{
        if(msg){
            alert(`${msg} - ${url} is a secured page`)
        }
    },[])

    return (
        <div className="home">
            {owned && <Dashboard owned={owned} assigned={assigned} upcoming={upcoming} completed={completed}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    supervisor: state.user.supervisor,
    owned: state.file.owned,
    assigned: state.file.assigned,
    upcoming: state.file.upcoming,
    completed: state.file.completed
})

export default connect(mapStateToProps, { getOwnedFiles, getAssignedFiles, getUpcomingFiles, getCompletedFiles })(Home);