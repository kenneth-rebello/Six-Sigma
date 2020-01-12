import React ,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';
import { fetchReports } from '../../actions/util.actions';
import ReportItem from './ReportItem';

const Reports = (props) => {

    const { reports, loading, fetchReports } = props;

    const [size, setSize] = useState({
        height: 0.85*window.innerHeight,
        width: 0.97*window.innerWidth
    })

    useEffect(()=>{
        fetchReports();
        window.addEventListener('resize', updateSize);
    },[]);

    const updateSize = () =>{
        setSize({
            height: 0.80*window.innerHeight,
            width: 0.97*window.innerWidth
        });
    }

    const rowRenderer = ({ key, index, style}) => {
        
        return (
          <div key={key} style={style}>
            <ReportItem report={reports[index]}/>
          </div>
        );
    }

    return (
        <div className="all-users">
            
            {!loading && <List
                rowCount={reports.length}
                rowHeight={130}
                rowRenderer={rowRenderer}
                height={size.height}
                width={size.width}
            />}
            
        </div>
    )
}

const mapStateToProps = state => ({
    reports: state.file.reports,
    loading: state.file.loading
})

export default connect(mapStateToProps, {fetchReports})(Reports);