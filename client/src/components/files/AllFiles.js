import React, { useEffect, useState } from 'react';
import './Files.css'
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';

import { getAllFiles } from '../../actions/file.actions';
import FileItem from './FileItem';


const AllFiles = (props) => {

    const { files, loading, getAllFiles } = props;

    const [size, setSize] = useState({
        height: 0.85*window.innerHeight,
        width: window.innerWidth>600 ? 0.97*window.innerWidth : 0.90*window.innerWidth,
        row: window.innerWidth<600 ? 230 : 130
    })

    useEffect(()=>{
        getAllFiles();
        window.addEventListener('resize', updateSize);
    },[]);


    const updateSize = () =>{
        setSize({
            height: 0.90*window.innerHeight,
            width: window.innerWidth>600 ? 0.97*window.innerWidth : 0.90*window.innerWidth,
            row: window.innerWidth<600 ? 230 : 130
        });
    }

    const rowRenderer = ({ key, index, style}) => {
        
        return (
          <Link to={`/file/${files[index]._id}`} key={key} style={style}>
            <FileItem file={files[index]}/>
          </Link>
        );
    }

    return (
        <div className="all-files">
            
            {!loading && <List
                rowCount={files.length}
                rowHeight={size.row}
                rowRenderer={rowRenderer}
                height={size.height}
                width={size.width}
            />}
            
        </div>
    )
}

const mapStateToProps = state => ({
    files: state.file.files,
    loading: state.file.loading
})

export default connect(mapStateToProps, {getAllFiles})(AllFiles);