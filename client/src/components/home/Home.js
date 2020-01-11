import React, { useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getOwnerFiles, getAssignedFiles } from '../../actions/file.actions';
import Dashboard from './Dashboard';

const Home = ({ getOwnerFiles, getAssignedFiles, owned, assigned, supervisor, msg, url }) => {

    useEffect(()=>{
        getOwnerFiles()
        if(supervisor) getAssignedFiles();
    },[])

    useEffect(()=>{
        if(msg){
            alert(`${msg} - ${url} is a secured page`)
        }
    },[])

    return (
        <div className="home">
            {owned && <Dashboard owned={owned} assigned={assigned}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    supervisor: state.user.supervisor,
    owned: state.file.owned,
    assigned: state.file.assigned
})

export default connect(mapStateToProps, { getOwnerFiles, getAssignedFiles })(Home);