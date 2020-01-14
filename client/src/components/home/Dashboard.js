import React from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import Panel from './tabs/Panel';

const Dashboard = ({owned, assigned, upcoming, completed, overdue, currentUser, supervisor}) => {

    let pages = [];
    
    if(currentUser){
        let today = new Date;
        let urgent = [];

        owned.map(file=>{
            file.lineage.every(user => {
                if( user.user._id===currentUser._id ){
                    if(user.owner && !user.done){
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
                    }
                    return false;
                }
                return true
            })
        })

        let concluded = [];
        let assigned_but_concluded = []
        if(assigned) assigned.map(file => {
            if(file.concluded) concluded.push(file)
            else assigned_but_concluded.push(file)
        })

        pages = [
            { name: 'Owned Files', component: <Panel files={owned}/> },
            { name: 'Urgent Files', component: <Panel files={urgent}/> },
            { name: 'Overdue Files', component: <Panel files={overdue}/> },
            { name: 'Upcoming Files', component: <Panel files={upcoming}/> },
            { name: 'Completed Files', component: <Panel files={completed}/> }
        ];
        if(supervisor) pages.push({ name: 'Concluded Files', component: <Panel files={concluded}/> })
        if(supervisor) pages.unshift({ name: 'Assigned Files', component: <Panel files={assigned_but_concluded}/> })
    }   
     
     
    const getTabs = () => {
      return pages.map((page, index) => ({
        title: page.name,
        getContent: () => page.component,
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
    currentUser: state.user.currentUser,
    supervisor: state.user.supervisor
})

export default connect(mapStateToProps)(Dashboard);