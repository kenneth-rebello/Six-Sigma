import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { positions } from '../../utils/data';
import Select from 'react-select';
import { addNewTask } from '../../actions/file.actions';

const TaskForm = ({addNewTask}) => {

    const [formData, setFormData] = useState({
        type: "",   
        order: []
    })
    const [dsgnOptions, setDsgnOpt] = useState([]);    
    const [counter, count] = useState(0);

    useEffect(()=>{
        console.log(formData)
    },[formData])

    useEffect(()=>{
        let temp = []
        positions.forEach(pos => {
            temp.push({
                label: pos,
                value: pos,
                position: counter
            })
        })
        setDsgnOpt(temp)
    },[counter]);

    const Changer = e => {
        setFormData({
            ...formData,
            type: e.target.value
        })
    }

    const handleSelect = option => {
        let temp = formData.order;
        temp[option.position] = option
        setFormData({
            ...formData,
            order: temp
        });
    }

    const deadlineHandle = (e) => {
        let temp = formData.order;
        temp[counter]['deadline'] = e.target.value;
        setFormData({
            ...formData,
            order: temp
        })
    }

    const Submitter = e => {
        e.preventDefault();
        addNewTask(formData);
    }

    const {order} = formData;

    let dsgnSelects = [];
    for(var i=0; i<=counter; i++){
        dsgnSelects.push(<div className="row">
            <div className="col s8">
                <Select
                    onChange={handleSelect}
                    options={dsgnOptions}
                    isDisabled={i<counter}
                />
            </div>
            <div className="col s3">
                <label>Number of days for deadline</label>
                <input type="number" onChange={e=>deadlineHandle(e)} disabled={order.length<=i} required/>
                <span>Enter the number of days required to complete the task this user may perform</span>
            </div>
            <div className="col s1">
                <button className="btn green" onClick={()=>count(counter+1)} disabled={i<counter}>
                    +
                </button>
                <button className="btn red" onClick={()=>count(counter-1)} disabled={i<counter || i==0}>
                    -
                </button>
            </div>
        </div>)
    }

    return (
        <div>
            <form onSubmit={e=>Submitter(e)}>
                <div className="row">
                    <div className="col s12">
                        <label>Enter file type</label>
                        <input type="text" name="type" onChange={e=>Changer(e)}/>
                    </div>
                    {dsgnSelects}
                    <input type="submit" value="Submit" className="btn"/>
                </div>
            </form>
        </div>
    )
}

export default connect(null, { addNewTask })(TaskForm);