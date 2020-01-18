import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';
import { fetchReports } from '../../actions/util.actions';
import ReportItem from './ReportItem';

const Reports = (props) => {

    const { reports, loading, fetchReports } = props;

    useEffect(() => {
        fetchReports();
    }, []);


    return (
        <div className="all-users">

            {!loading && reports.map(report => <ReportItem report={report} />)}

        </div>
    )
}

const mapStateToProps = state => ({
    reports: state.file.reports,
    loading: state.file.loading
})

export default connect(mapStateToProps, { fetchReports })(Reports);