import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { getChartData, getChartDataByYear } from "./getChartData";
import { fetchAllUsers } from '../../../actions/user.actions';
import { fetchMultiRecords } from '../../../actions/util.actions';
require("highcharts/modules/exporting")(Highcharts);

const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const Stacked = ({records, users, fetchAllUsers, fetchMultiRecords}) => {

    const [chartdata, setChart] = useState({});
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [years, setYears] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(()=>{
        fetchAllUsers();
        let temp = chartdata
        temp = getChartData(records);  
        setLoading(true)
        setChart(temp)
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
        if(records) {
            temp = getChartData(records);
        }
        setLoading(true)
        setChart(temp)
    },[records])

    useEffect(()=>{
        let temp = chartdata;
        if(records){
            temp = getChartDataByYear(records, selected)
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
    records: state.util.records
})

export default connect(mapStateToProps, { fetchAllUsers, fetchMultiRecords })(Stacked);