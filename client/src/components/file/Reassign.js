import React, { useState, useEffect, Fragment } from 'react';
import'./Reassign.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import Moment from 'react-moment';
import { positions } from '../../utils/data';
import { fetchUsersByDesgn } from '../../actions/user.actions';
import { editFilePath } from '../../actions/file.actions';

const Reassign = ({history, match, users, formData, fetchUsersByDesgn, editFilePath}) => {

    const [lineage, setLineage] = useState([])
    const [counter, count] = useState(0);
    const [loading, setLoading] = useState(false);
    const [designation, setDesignation] = useState("");

    const [optionsD, setOptionsD] = useState([]);
    const [optionsU, setOptionsU] = useState([]);

    const provideOptions = () => {
        let tempUsers = [];
        users.forEach(each => {
            tempUsers.push({
                label: each.displayName,
                value: each._id,
                position: counter
            })
        });
        setOptionsU(tempUsers);
    }


    useEffect(()=>{

        let tempLineage = [];
        if(formData.data) formData.data.map((data, idx)=>{
            tempLineage[idx] = {
                designation: {
                    value: data.user.designation
                },
                user: {
                    label: data.user.displayName,
                    value: data.user._id,
                    position: idx
                },
                notes: data.notes,
                deadline: data.deadline
            }
        });
        setLineage(tempLineage)
        setLoading(false)
    },[formData])

    useEffect(()=>{
        console.log(lineage)
    },[lineage])

    useEffect(()=>{
        let tempPositions = [];
        positions.forEach(pos => {
            tempPositions.push({
                label: pos,
                value: pos,
                position: counter
            })
        })
        setOptionsD(tempPositions);
    },[counter])

    useEffect(()=>{
        fetchUsersByDesgn(designation)
    },[designation])

    useEffect(()=>{
        provideOptions();
    },[users])


    const nextUser = async idx => {
        await count(counter+1)
        document.getElementById(`notes${idx+1}`).focus();
    }

    const prevUser = async idx => {
        await count(counter-1)
        document.getElementById(`notes${idx-1}`).focus();
    }

    const addUser = async idx => {
        setLoading(true)
        let tempLineage = lineage;
        tempLineage.splice(idx, 0, {
            designation: {},
            user: {},
            notes: "",
            deadline: ""
        })
        tempLineage.forEach((each,idx)=>{
            each.user.position = idx
        })
        await setLineage(tempLineage)
        setLoading(false)
    } 

    const delUser = async idx => {
        setLoading(true)
        let tempLineage = lineage;
        tempLineage.splice(idx, 1)
        await setLineage(tempLineage)
        setLoading(false)
    }



    const handleDesSelect = async option => {
        let tempLineage = lineage;
        tempLineage[option.position]['designation'] = option;
        await setLineage(lineage);
        setDesignation(option.value)
    }

    const handleUserSelect = async option => {
        let tempLineage = lineage;
        tempLineage[option.position]['user'] = option;
        await setLineage(lineage);
    }


    const Changer = async(e, idx) => {
        let tempLineage = lineage;
        tempLineage[idx][e.target.name] = e.target.value;
        await setLineage(lineage)
    }

    const Submitter = e => {
        e.preventDefault();
        const id = editFilePath(lineage, match.params.id);
        history.push(`/file/${id}`)
    }

    return (
        <div className="reassign">
            <form onSubmit={e => Submitter(e)}>
            {!loading && lineage.map((point, idx) => 
            <Fragment>
                <h5 className="user">User {idx+1}</h5>
                <div className="row" key={idx}>
                    <div className="col s11">
                        <div className="col s12">
                            <label htmlFor="designation">Pick a designation</label>
                            <Select
                                id={`designation${idx}`}
                                onChange={handleDesSelect}
                                options={optionsD}
                                isDisabled={idx!==counter}
                                isSearchable
                            />
                            <span className="prev">Current value: {point.designation.value}</span>
                        </div>
                        <div className="col s12">
                            <label htmlFor="select">Pick user {idx+1}</label>
                            <Select
                                id={`select${idx}`}
                                onChange={handleUserSelect}
                                options={optionsU}
                                isDisabled={idx!==counter}
                                isSearchable
                            />
                            <span className="prev">Current value: {point.user.label}</span>
                        </div>
                        <div className="col s12 m6">
                            <label htmlFor="notes">Additional Notes</label>
                            <input type="text" id={`notes${idx}`} 
                                name="notes"
                                onChange={e=>Changer(e, idx)}
                                disabled={idx!==counter}/> 
                            <span className="helper-text" data-error="wrong" data-success="right">
                                Add notes for this user if needed (will only be visible to this user)
                            </span>
                            <span className="prev">Current value: {point.notes}</span>
                        </div>
                        <div className="col s12 m6">
                            <label htmlFor="deadline">Deadline</label>
                            <input type="date" name="deadline" id={`deadline${idx}`} 
                            onChange={e=>Changer(e, idx)} required
                            disabled={idx!==counter}/>
                            <span className="prev">Current value: 
                                <Moment format="MM/DD/YYYY">{point.designation}</Moment>
                            </span>
                        </div>
                    </div>
                    <div className="col s1">
                    {
                        counter === idx && 
                        <Fragment>
                            {idx!==lineage.length-1 && <button className="btn" onClick={()=>nextUser(idx)}>
                                +
                            </button>}
                            {idx!==0 && <button className="btn" onClick={()=>prevUser(idx)}>
                                -
                            </button>}
                        </Fragment>
                    }
                    {
                        idx===counter && 
                        <Fragment>
                            <button className="btn red" onClick={()=>delUser(idx)}>
                                X
                            </button>
                            <button className="btn green" onClick={()=>addUser(idx)}>
                                New
                            </button>
                        </Fragment>
                    }
                    </div>
                </div>
            <hr/>
            </Fragment>
            )}
            <input type="submit" value="Done"/>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    formData: state.util.formData,
    users: state.user.users
})

export default connect(mapStateToProps, {fetchUsersByDesgn, editFilePath})(Reassign);