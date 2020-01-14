import React, { useEffect, useState } from 'react';
import './Panel.css';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';
import FileItem from '../../files/FileItem';

const Panel = ({files}) => {

    const [size, setSize] = useState({
        height: 0.70*window.innerHeight,
        width: window.innerWidth<800 ? 0.78*window.innerWidth : 0.90*window.innerWidth,
        row: window.innerWidth<800 ? 230 : 130
    })

    useEffect(()=>{
        window.addEventListener('resize', updateSize);
    },[]);

    const updateSize = () =>{
        if(window.innerWidth>800){
            setSize({
                height: 0.70*window.innerHeight,
                width: 0.90*window.innerWidth,
                row: 130
            })
        }else{
            setSize({
                height: 0.70*window.innerHeight,
                width: 0.78*window.innerWidth,
                row: 230
            });
        }
    }

    const rowRenderer = ({ key, index, style}) => {
        
        return (
          <Link to={`/file/${files[index]._id}`} key={key} style={style}>
            <FileItem file={files[index]}/>
          </Link>
        );
    }

    return (
        <div className="panel">
            <p className="total">Total files: {files.length}</p>
            <List
                className="list"
                rowCount={files.length}
                rowHeight={size.row}
                rowRenderer={rowRenderer}
                height={size.height}
                width={size.width}
            />
            
        </div>
    )
}


export default Panel