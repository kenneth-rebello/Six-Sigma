import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import './Home.css';

const Home = ({loading, currentUser}) => {

    useEffect(()=>{
        if (!loading && currentUser && !currentUser.registered) setTimeout(()=>{
            document.getElementById('suggestbtn').click();
        },3000) 
    },[loading])

    return (
        <div className="home">
            Home
        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.user.loading,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Home);