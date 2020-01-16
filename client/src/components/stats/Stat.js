import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { getChartData } from "./getChartData";
import { fetchAllUsers } from '../../actions/user.actions';
import { fetchRecordsById } from '../../actions/util.actions';
require("highcharts/modules/exporting")(Highcharts);


const Stat = ({users, records, fetchRecordsById, fetchAllUsers}) => {

    const [options, setOptions] = useState([]);
    const [startdates, setStartDates] = useState([]);
    const [enddates, setEndDates] = useState([]);
    const [chartdata, setChart] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchAllUsers();
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
        let tempDates;
        if(chartdata && chartdata.xAxis) tempDates = chartdata.xAxis.categories;
        
        let startOptions = []
        let endOptions = []

        tempDates && tempDates.forEach(date => {
            startOptions.push({
                value: date,
                label: date,
                type: 'start'
            })
            endOptions.push({
                value: date,
                label: date,
                type: 'end'
            })
        })

        setStartDates(startOptions);
        setEndDates(endOptions);

    },[loading, chartdata])


    useEffect(()=>{
        let temp = chartdata
        if(records) {
            temp = getChartData(records[0]);
        }
        setLoading(true)
        setChart(temp)
    },[records])


    const handleSelect = obj => {
        fetchRecordsById(obj.value);
    }

    const dateSelect = date => {
        let config = chartdata;
        if(date.type==="start"){
            config.series[0].data = config.series[0].data
                .slice(config.xAxis.categories.indexOf(date.value), config.xAxis.categories.length-1);
            config.xAxis.categories = config.xAxis.categories
                .slice(config.xAxis.categories.indexOf(date.value), config.xAxis.categories.length-1);
            setLoading(true);
            setChart(config);
        }
        if(date.type==="end"){
            config.series[0].data = config.series[0].data
                                    .slice(0, config.xAxis.categories.indexOf(date.value)+1);
            config.xAxis.categories = config.xAxis.categories
                                    .slice(0, config.xAxis.categories.indexOf(date.value)+1);
            setLoading(true);
            setChart(config);
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col s12">
                    <label>Select a user</label>
                    <Select
                        onChange={handleSelect}
                        options={options}
                        isSearchable
                    />
                </div>
                <div className="col s12 m6">
                    <label>Start date</label>
                    <Select
                        options={startdates}
                        onChange={dateSelect}
                    />
                </div>
                <div className="col s12 m6">
                    <label>End date</label>
                    <Select
                        options={enddates}
                        onChange={dateSelect}
                    />
                </div>
            </div>
            {chartdata ? !loading && <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartdata}
                ></HighchartsReact>
            </div> : <p>No user selected yet</p>}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    users: state.user.users,
    records: state.util.records
})

export default connect(mapStateToProps, { fetchRecordsById, fetchAllUsers })(Stat);