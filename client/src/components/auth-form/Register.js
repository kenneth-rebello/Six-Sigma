import React, { useState, useEffect } from 'react';
import './AuthForm.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchSupervisors, registerUser } from '../../actions/user.actions';

const Register = ({users, currentUser, fetchSupervisors, registerUser}) => {

    useEffect(()=>{
        fetchSupervisors();
    },[])

    useEffect(()=>{
        provideOptions();
    },[users])

    useEffect(()=>{
        if(currentUser){
            setFormData({
                displayName: currentUser.displayName ? currentUser.displayName : formData.displayName,
                emp_code: currentUser.emp_code ? currentUser.emp_code : formData.emp_code,
                position: currentUser.position ? currentUser.position : formData.position,
                supervisor: currentUser.supervisor ? {
                    label: currentUser.supervisor.displayName,
                    value: currentUser.supervisor._id
                } : formData.supervisor,
            });
            currentUser.displayName &&  document.getElementById('displayName').focus();
        }
    },[currentUser])

    const [formData, setFormData] = useState({
        displayName:"",
        emp_code:"",
        position:"",
        supervisor: null
    });

    const [options, setOptions] = useState([])

    const provideOptions = () => {
        let temp = [];
        users.forEach(each => {
            temp.push({
                label: each.displayName,
                value: each._id
            })
        });
        setOptions(temp);
    }

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSelect = option => {
        setFormData({
            ...formData,
            supervisor: option
        })
    }

    const Submitter = e => {
        e.preventDefault();

        registerUser(formData);
        
        setFormData({
            displayName:"",
            emp_code:"",
            position:"",
            supervisor: null
        })
    }

    const { displayName, emp_code, position, supervisor } = formData;

    return (
        <div className="register">
            <form onSubmit={e=>Submitter(e)}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="displayName" type="text" value={displayName} onChange={e=>Changer(e)}/>
                        <label htmlFor="displayName">Username</label>
                        <span className="helper-text" data-error="wrong" data-success="right">
                            *Change your default username set by your Google account
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="emp_code" type="text" value={emp_code} onChange={e=>Changer(e)}/>
                        <label htmlFor="emp_code">Employee Code</label>
                        <span className="helper-text" data-error="wrong" data-success="right">
                            *Enter your unique employee code
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label className="form-label">Position</label>         
                        <select className="browser-default own-default"
                            id="position" type="text" value={position} onChange={e=>Changer(e)}>
                            <option value="" disabled>Pick One</option>
                            <option value="Officer">Officer</option>
                        </select>
                        <span className="help-span" data-error="wrong" data-success="right">
                            *Enter your position in the organisation
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 ">
                        <label className="form-label">Supervisor</label>
                        <Select
                            id="supervisor"
                            value={supervisor}
                            onChange={handleSelect}
                            options={options}
                        />
                        <span className="help-span" data-error="wrong" data-success="right">
                            *Select the username of your direct supervisor
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input type="submit" className="btn" value="Submit"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.user.users,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, { fetchSupervisors, registerUser })(Register);