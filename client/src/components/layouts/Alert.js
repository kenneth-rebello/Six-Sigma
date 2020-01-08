import React from 'react';
import './Alert.css'
import {connect} from 'react-redux';

const Alert = ({alerts}) => {

    return(
        alerts && alerts.length > 0 ? alerts.map(alert => (
            <div key={alert.id} className={`alerts alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        )) : null
    )

};
        
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);