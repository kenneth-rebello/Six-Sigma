import React, { useState, useEffect } from 'react';
import './File.css'
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchAllUsers } from '../../actions/user.actions';

const NewFile = ({fileNo, users, fetchAllUsers}) => {

    useEffect(()=>{
        fetchAllUsers();
    },[])

    useEffect(()=>{
        provideOptions();
    },[users])

    const [counter, count] = useState(0);

    const [formData, setFormData] = useState({
        file_number: fileNo ? fileNo : "",
        name: "",
        path: []
    });

    useEffect(()=>{
        provideOptions();
    },[counter])
    
    useEffect(()=>{
        console.log(formData)
    },[formData])

    const [options, setOptions] = useState([]);

    const provideOptions = () => {
        let temp = [];
        users.forEach(each => {
            temp.push({
                label: each.displayName,
                value: each.email,
                position: counter
            })
        });
        setOptions(temp);
    }

    const handleSelect = option => {
        let temp = formData.path;
        temp[option.position] = option
        setFormData({
            ...formData,
            path: temp
        });
    }

    const undoSelect = (i) => {
        count(i-2);
        let temp = formData.path;
        temp = temp.slice(0,i-2)
    }

    const Submitter = (e) => {
        e.preventDefault();

    }

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const { file_number, name, path } = formData;

    let pathSelects = []
    for(var i=0; i<=counter; i++){
        pathSelects.push(<div className="row">
            <div className="col s11">
                <label htmlFor="select">Pick user {i+1}</label>
                <Select
                    id={`select${i}`}
                    onChange={handleSelect}
                    options={options}
                    isDisabled={i<counter}
                />
            </div>
            <div className="col s1">
                {
                    path.length > i &&
                    <button className="btn" onClick={()=>count(counter+1)}>
                        +
                    </button>
                }
                {
                    i===counter-1 &&
                    
                    <button className="btn red" onClick={()=>undoSelect(i)}>
                        X
                    </button>
                }
            </div>
        </div>)
    }
    
    return (
        <div className="new-file">
            <form onSubmit={e=>Submitter(e)}>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input type="text" id="file_number" value={file_number} onChange={e=>Changer(e)}/> 
                        <label htmlFor="file_number">File Number</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Enter a valid file number</span>
                    </div>
                    <div className="input-field col s12 m6">
                        <input type="text" id="name" value={name} onChange={e=>Changer(e)}/> 
                        <label htmlFor="name">File Name</label>
                        <span class="helper-text" data-error="wrong" data-success="right">Optional</span>
                    </div>
                </div>
                <div className="row">
                    {pathSelects}
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    fileNo: state.file.newFile,
    users: state.user.users
})

export default connect(mapStateToProps, {fetchAllUsers})(NewFile);