import React, { useState, useEffect } from 'react';
import './File.css'
import { connect } from 'react-redux';
import Select from 'react-select';
import { fetchUsersByDesgn, unsetUserList } from '../../actions/user.actions';
import { addFileToDB, fetchTasks, fetchTaskById, addFileToDBAuto } from '../../actions/file.actions';
import { getIdealUsers } from '../../actions/user.actions';
import { positions } from '../../utils/data';

const NewFile = ({history, fileNo, users, task, tasks, list, getIdealUsers, unsetUserList,
    fetchTasks, fetchTaskById, fetchUsersByDesgn, addFileToDB, addFileToDBAuto}) => {

    const [counter, count] = useState(0);
    const [options, setOptions] = useState([]);
    const [dsgnOptions, setDsgnOpt] = useState([]);
    const [taskOptions, setTaskOpt] = useState([]);
    const [designation, setDsgn] = useState("");
    const [auto, toggleAuto] = useState(false);

    const [formData, setFormData] = useState({
        file_number: fileNo ? fileNo : "",
        name: "",
        path: [],
        notes: "",
        description: "",
        loading: true
    });


    useEffect(()=>{
        let temp = []
        positions.forEach(pos => {
            temp.push({
                label: pos,
                value: pos
            })
        })
        setDsgnOpt(temp)
        fetchTasks();
    },[])

    useEffect(()=>{
        fetchUsersByDesgn(designation);
    },[designation])

    useEffect(()=>{
        provideOptions();
    },[users])

    useEffect(()=>{
        provideOptions();
        if(counter!==0) document.getElementById(`notes${counter-1}`).disabled = true
        if(counter!==0) document.getElementById(`deadline${counter-1}`).disabled = true
    },[counter])
    
    useEffect(()=>{
        if(tasks.length>0){
            let temp = [];
            tasks.forEach(task => {
                temp.push({
                    value: task._id,
                    label: task.type
                })
            })
            setTaskOpt(temp)
        }
    },[tasks])

    useEffect(()=>{
        var someDate = new Date();
        if(task && task.order){
            let correct = task.order.sort((a,b)=>{
                return a.position - b.position
            })
            correct.forEach(ord => {
                someDate.setDate(someDate.getDate() + ord.deadline); 
                getIdealUsers(ord.designation, someDate)
            })
        }
    },[task])

    useEffect(()=>{
        console.log(list)
        if(list.length>0){
            setFormData({
                ...formData,
                path: list,
                loading: false
            })
        }
    },[list])

    useEffect(()=>{
        // console.log(formData)
    },[formData])

   

    const provideOptions = () => {
        let temp = [];
        users.forEach(each => {
            temp.push({
                label: `${each.displayName} (${each.upcoming.length})`,
                value: each._id,
                position: counter
            })
        });
        setOptions(temp);
    }

    const undoSelect = (i) => {
        count(i-2);
        let temp = formData.path;
        temp = temp.slice(0,i-1);
        document.getElementById(`notes${i-2}`).disabled = false
        document.getElementById(`deadline${i-2}`).disabled = false
        setFormData({
            ...formData,
            path: temp,
            loading: false
        })
    }


    const handleSelect = option => {
        let temp = formData.path;
        temp[option.position] = option
        setFormData({
            ...formData,
            path: temp,
            loading: false
        });
        document.getElementById(`notes${option.position}`).disabled = false;
        document.getElementById(`deadline${option.position}`).disabled = false;
    }
    const handlePosSelect = option => {
        setDsgn(option.value)
    }
    const handleAutoSelect = option => {
        fetchTaskById(option.value)
    }


    const Submitter = (e) => {
        e.preventDefault();
        if(auto){
            addFileToDBAuto(formData, history);
        }else{
            addFileToDB(formData, history);
        }

        setFormData({
            file_number: "",
            name: "",
            description: "",
            path: [],
            loading: true
        })
        count(0);
        unsetUserList();
    }

    const Changer = ( e ) => {
        if(e.target.id.includes("notes")){
            let note = e.target.value;
            let temp = formData.path;
            temp[i-1].notes = note
            setFormData({
                ...formData,
                notes: note,
                path: temp,
                loading: false
            });
        }else if(e.target.id.includes("deadline")){
            let date = e.target.value;
            let temp = formData.path;
            temp[i-1].deadline = date;
            setFormData({
                ...formData,
                path: temp,
                loading: false
            })
        }else{
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
                loading: false
            })
        }
    }

    

    const { file_number, name, path, description, loading } = formData;

    let pathSelects = []
    for(var i=0; i<=counter; i++){
        pathSelects.push(<div className="row">
            <div className="col s11">
                <div className="col s12">
                    <label htmlFor="designation">Pick a designation</label>
                    <Select
                        id={`designation${i}`}
                        onChange={handlePosSelect}
                        options={dsgnOptions}
                        isDisabled={i<counter}
                        isSearchable
                    />
                </div>
                <div className="col s12">
                    <label htmlFor="select">Pick user {i+1}</label>
                    <Select
                        id={`select${i}`}
                        onChange={handleSelect}
                        options={options}
                        isDisabled={i<counter}
                        isSearchable
                    />
                </div>
                <div className="input-field col s12 m6">
                    <input type="text" id={`notes${i}`} onChange={e=>Changer(e)} disabled/> 
                    <label htmlFor="notes">Additional Notes</label>
                    <span className="helper-text" data-error="wrong" data-success="right">
                        Add notes for this user if needed (will only be visible to this user)
                    </span>
                </div>
                <div className="col s12 m6">
                    <label htmlFor="deadline">Deadline</label>
                    <input type="date" className="date-picker"  id={`deadline${i}`} 
                    onChange={e=>Changer(e)} required disabled/>
                </div>
            </div>
            <div className="col s1">
                {
                    path.length > i &&
                    <button className="btn" onClick={()=>count(counter+1)} disabled={i<counter || path.length < counter}>
                        +
                    </button>
                }
                {
                    i===counter && i!==0 &&
                    
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
                        <input type="text" id="file_number" value={file_number} onChange={e=>Changer(e)} required/> 
                        <label htmlFor="file_number">File Number</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Enter a valid file number</span>
                    </div>
                    <div className="input-field col s12 m6">
                        <input type="text" id="name" value={name} onChange={e=>Changer(e)}/> 
                        <label htmlFor="name">File Name</label>
                        <span className="helper-text" data-error="wrong" data-success="right">Optional</span>
                    </div>
                    <div className="input-field col s12">
                        <input type="text" id="description" value={description} onChange={e=>Changer(e)} required/> 
                        <label htmlFor="description">Description</label>
                        <span className="helper-text" data-error="wrong" data-success="right">
                            Additional details about this file that will be useful to anyone concerned
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="btn" type="button" onClick={()=>toggleAuto(!auto)}>
                            Use template
                        </button>
                        {auto && <Select
                            onChange={handleAutoSelect}
                            options={taskOptions}
                            isSearchable
                        />}
                    </div>
                </div>
                <div className="row">
                    {auto ? null : pathSelects}
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input className="btn green" type="submit" value="Add" disabled={loading}/>
                        <span className="helper-text" data-error="wrong" data-success="right">
                            Add new file to database
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    fileNo: state.file.newFile,
    users: state.user.users,
    tasks: state.util.tasks,
    task: state.util.task,
    list: state.util.list
})

export default connect(mapStateToProps, {
    fetchTasks, fetchTaskById, fetchUsersByDesgn, getIdealUsers,
    addFileToDB, addFileToDBAuto, unsetUserList })(NewFile);