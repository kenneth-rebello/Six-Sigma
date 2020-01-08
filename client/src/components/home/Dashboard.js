import React from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import OwnedTab from './tabs/OwnedTab';
import UrgentTab from './tabs/UrgentTab';

const Dashboard = ({files, currentUser}) => {

    let today = new Date;
    let urgent = [];
    files.map(file=>{
        file.lineage.every(user => {
            if(user.user._id===currentUser._id && user.owner && !user.done){
                if(user.deadline){
                    let deadline = user.deadline.replace('T','-').split('-')

                    if(deadline[1]-1==today.getMonth()){
                        //Same month
                        if( today.getDate() > deadline[2]-4){
                            //3 days
                            urgent.push(file)
                        }
                    }
                }
                return false;
            }
            return true
        })
    })
    
    const presidents = [
        { name: 'Owned Files', component: <OwnedTab files={files}/> },
        { name: 'Urgent Files', component: <UrgentTab files={urgent}/> }
    ];
     
    const getTabs = () => {
      return presidents.map((president, index) => ({
        title: president.name,
        getContent: () => president.component,
        key: index,
        tabClassName: 'tab',
        panelClassName: 'panel',
      }));
    }
    
    
    return (
        <div>
            <Tabs items={getTabs()}/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Dashboard);