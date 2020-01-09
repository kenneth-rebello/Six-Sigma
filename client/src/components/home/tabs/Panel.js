import React, { useEffect, useState } from 'react';
import './Panel.css';
import { List } from 'react-virtualized';
import { Link } from 'react-router-dom';
import FileItem from '../../files/FileItem';

const Panel = ({files}) => {

    const [size, setSize] = useState({
        height: 0.90*window.innerHeight,
        width: window.innerWidth<800 ? 0.80*window.innerWidth : 0.90*window.innerWidth
    })

    useEffect(()=>{
        window.addEventListener('resize', updateSize);
    },[]);

    const updateSize = () =>{
        if(window.innerWidth>800){
            setSize({
                height: 0.90*window.innerHeight,
                width: 0.90*window.innerWidth
            })
        }else{
            setSize({
                height: 0.90*window.innerHeight,
                width: 0.80*window.innerWidth
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


export default Panel