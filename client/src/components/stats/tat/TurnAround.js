import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { fetchAllTATs } from '../../../actions/user.actions';
import { getChartData } from './getChartData';
require("highcharts/modules/exporting")(Highcharts);

const TurnAround = ({ time, fetchAllTATs }) => {

    const [chartdata, setChart] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchAllTATs()
    },[]);

    useEffect(()=>{
        setLoading(true);
        setLoading(false)
    },[loading, chartdata])

    useEffect(()=>{
        let temp = chartdata
        if(time) {
            temp = getChartData(time);
        }
        setLoading(true)
        setChart(temp)
    },[time])

    return (
        <div>
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
    time: state.util.time
})

export default connect(mapStateToProps, { fetchAllTATs })(TurnAround); 