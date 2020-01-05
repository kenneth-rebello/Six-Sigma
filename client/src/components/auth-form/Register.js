import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchSupervisors } from '../../actions/user.actions';

const Register = ({user, fetchSupervisors}) => {

    useEffect(()=>{
        fetchSupervisors();
    },[])

    useEffect(()=>{
        provideOptions();
    },[user])

    const [formData, setFormData] = useState({
        displayName:"",
        emp_code:"",
        supervisor: null
    });

    const [options, setOptions] = useState([])

    const provideOptions = () => {
        let temp = [];
        user.users.forEach(each => {
            temp.push({
                label: each.displayName,
                value: each.email
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

    const { displayName, emp_code, supervisor } = formData;

    return (
        <div className="register">
            <form>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="displayName" type="text" value={displayName} onChange={e=>Changer(e)}/>
                        <label for="displayName">Display Name</label>
                        <span className="helper-text" data-error="wrong" data-success="right">
                            *If you want to change your Google username
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="emp_code" type="text" value={emp_code} onChange={e=>Changer(e)}/>
                        <label for="emp_code">Employee Code</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <Select
                            value={supervisor}
                            onChange={handleSelect}
                            options={options}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { fetchSupervisors })(Register);