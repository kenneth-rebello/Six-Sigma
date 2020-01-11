import React, { useState, useEffect } from 'react';
import './AuthForm.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchSupervisors, registerUser } from '../../actions/user.actions';
import { fetchDepts } from '../../actions/dept.actions';
import { positions } from '../../utils/data';

const Register = ({users, depts, currentUser, fetchSupervisors, registerUser, fetchDepts}) => {

    const [options, setOptions] = useState([])
    const [deptOptions, setDeptOptions] = useState([])
    const [posOptions, setPosOptions] = useState([])

    useEffect(()=>{
        let temp =[];
        fetchSupervisors();
        fetchDepts();
        positions.map(pos => {
            temp.push({
                label: pos,
                value: pos
            })
        });
        setPosOptions(temp)
    },[])

    useEffect(()=>{
        let temp = [];
        depts.forEach(dept => {
            temp.push({
                label: dept.name,
                value: dept._id,
                supervisor: dept.supervisor
            })
        })
        setDeptOptions(temp)
    },[depts])

    useEffect(()=>{
        provideOptions();
    },[users])

    useEffect(()=>{
        if(currentUser){
            setFormData({
                displayName: currentUser.displayName ? currentUser.displayName : formData.displayName,
                emp_code: currentUser.emp_code ? currentUser.emp_code : formData.emp_code,
                designation: currentUser.designation ? {
                    label: currentUser.designation,
                    value: currentUser.designation
                } : formData.designation,
                supervisor: currentUser.supervisor ? {
                    label: currentUser.supervisor.displayName,
                    value: currentUser.supervisor._id
                } : formData.supervisor,
                department: currentUser.department ? {
                    label: currentUser.department.name, 
                    value: currentUser.department._id
                } : formData.department
            });
            currentUser.displayName &&  document.getElementById('displayName').focus();
        }
    },[currentUser])


    const [formData, setFormData] = useState({
        displayName:"",
        emp_code:"",
        designation:"",
        supervisor: null,
        department: ''
    });


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
    const handleDeptSelect = option => {
        let temp = options.find(opt => opt.value===option.supervisor);
        setFormData({
            ...formData,
            department: option,
            supervisor: temp
        })
    }
    const handlePosSelect = option => {
        setFormData({
            ...formData,
            designation: option
        })
    }

    const Submitter = e => {
        e.preventDefault();

        registerUser(formData);
        
        setFormData({
            displayName:"",
            emp_code:"",
            designation:"",
            supervisor: null,
            department:''
        })
    }

    const { displayName, emp_code, designation, supervisor, department } = formData;

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
                        <label className="form-label">Designation</label>         
                        <Select
                            id="designation"
                            value={designation}
                            onChange={handlePosSelect}
                            options={posOptions}
                            isSearchable
                        />
                        <span className="help-span" data-error="wrong" data-success="right">
                            *Select your designation in the organisation
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label className="form-label">Department</label>         
                        <Select
                            id="department"
                            value={department}
                            onChange={handleDeptSelect}
                            options={deptOptions}
                            isSearchable
                        />
                        <span className="help-span" data-error="wrong" data-success="right">
                            *Select the department that you work in
                        </span>
                    </div>
                </div>
                {designation.value !== "Position S" && <div className="row">
                    <div className="col s12 ">
                        <label className="form-label">Supervisor</label>
                        <Select
                            id="supervisor"
                            value={supervisor}
                            onChange={handleSelect}
                            options={options}
                            isSearchable
                        />
                        <span className="help-span" data-error="wrong" data-success="right">
                            *Select the username of your direct supervisor
                        </span>
                    </div>
                </div>}
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
    currentUser: state.user.currentUser,
    depts: state.dept.depts
})

export default connect(mapStateToProps, { fetchSupervisors, registerUser, fetchDepts })(Register);