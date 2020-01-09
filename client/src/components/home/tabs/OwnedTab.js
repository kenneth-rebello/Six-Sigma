import React, { useEffect, useState } from 'react';
import './Tabs.css';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';
import FileItem from '../../files/FileItem';

const OwnedTab = ({files}) => {

    const [size, setSize] = useState({
        height: 0.90*window.innerHeight,
        width: 0.75*window.innerWidth
    })

    useEffect(()=>{
        window.addEventListener('resize', updateSize);
    },[]);

    const updateSize = () =>{
        setSize({
            height: 0.90*window.innerHeight,
            width: 0.75*window.innerWidth
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
        <div className="container">
            
            <List
                className="list"
                rowCount={files.length}
                rowHeight={135}
                rowRenderer={rowRenderer}
                height={size.height}
                width={size.width}
            />
            
        </div>
    )
}


export default OwnedTab