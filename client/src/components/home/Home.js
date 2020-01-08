import React, { useEffect } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import { getOwnerFiles } from '../../actions/file.actions';
import Dashboard from './Dashboard';

const Home = ({ getOwnerFiles, owned }) => {

    useEffect(()=>{
        getOwnerFiles()
    },[])

    return (
        <div className="home">
            {owned && <Dashboard files={owned}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    owned: state.file.owned
})

export default connect(mapStateToProps, { getOwnerFiles })(Home);