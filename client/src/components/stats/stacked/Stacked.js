import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { getChartData, getChartDataByYear } from "./getChartData";
import { fetchAllUsers } from '../../../actions/user.actions';
import { fetchMultiRecords, clearMultiRecords } from '../../../actions/util.actions';
require("highcharts/modules/exporting")(Highcharts);

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const Stacked = ({credible, users, fetchAllUsers, fetchMultiRecords, clearMultiRecords}) => {

    const [chartdata, setChart] = useState({});
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [years, setYears] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(()=>{
        fetchAllUsers();
        let temp = chartdata
        temp = getChartData(credible);  
        setLoading(true)
        setChart(temp)

        return ()=>{
            clearMultiRecords();
        }
    },[])

    useEffect(()=>{
        let temp = [];
        users.forEach(each => {
            temp.push({
                label: each.displayName,
                value: each._id
            })
        });
        setOptions(temp);
    },[users])

    useEffect(()=>{
        setLoading(true)
        setLoading(false)

        let tempDates = [];
        if(chartdata && chartdata.startDate && chartdata.endDate) {
            for (var i=chartdata.startDate; i<=chartdata.endDate; i++){
                tempDates.push(i)
            }
        }
        
        let yearOptions = []

        tempDates && tempDates.forEach(year => {
            yearOptions.push({
                value: year,
                label: year
            })
        })

        setYears(yearOptions);
    },[loading, chartdata])

    useEffect(()=>{
        let temp = chartdata
        if(credible) {
            temp = getChartData(credible);
        }
        setLoading(true)
        setChart(temp)
    },[credible])

    useEffect(()=>{
        let temp = chartdata;
        if(credible){
            temp = getChartDataByYear(credible, selected)
        }
        setLoading(true)
        setChart(temp)
    },[selected])

    const handleSelect = obj => {
        if(obj.length>0){
            fetchMultiRecords(obj[obj.length-1].value)
        }else{
            
        }
    }

    const yearSelect = date => {
        setSelected(date.value)
    }

    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <label>Select a user</label>
                    <Select
                        onChange={handleSelect}
                        options={options}
                        isSearchable
                        isMulti
                    />
                </div>
                <div className="col s6">
                    <label>Select year</label>
                    <Select
                        onChange={yearSelect}
                        options={years}
                        isSearchable
                    />
                </div>
            </div>
            {chartdata ? !loading && <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartdata}
                ></HighchartsReact>
            </div> : <p>No user selected yet</p>}
        </div>
    )
}


const mapStateToProps = state => ({
    users: state.user.users,
    credible: state.util.credible
})

export default connect(mapStateToProps, { fetchAllUsers, fetchMultiRecords, clearMultiRecords })(Stacked);