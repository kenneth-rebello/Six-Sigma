import React, { useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getOwnedFiles, getAssignedFiles, getUpcomingFiles } from '../../actions/file.actions';
import Dashboard from './Dashboard';

const Home = ({ getOwnedFiles, getAssignedFiles, getUpcomingFiles,
             owned, assigned, upcoming, supervisor, msg, url }) => {

    useEffect(()=>{
        getOwnedFiles();
        getUpcomingFiles();
        if(supervisor) getAssignedFiles();
    },[])

    useEffect(()=>{
        if(msg){
            alert(`${msg} - ${url} is a secured page`)
        }
    },[])

    return (
        <div className="home">
            {owned && <Dashboard owned={owned} assigned={assigned} upcoming={upcoming}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    supervisor: state.user.supervisor,
    owned: state.file.owned,
    assigned: state.file.assigned,
    upcoming: state.file.upcoming
})

export default connect(mapStateToProps, { getOwnedFiles, getAssignedFiles, getUpcomingFiles })(Home);