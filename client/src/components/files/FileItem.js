import React from 'react';
import './Files.css'

const FileItem = ({file}) => {
    return (
        <div className="file-item">
            <div className="col s12">
                <div className="card whitesmoke">
                    <div className="card-content row">
                        
                        <div className="col s6 m3">
                            <span className="label">File Number: </span>
                            <span className="title">{file.file_number}</span>
                        </div>
                        <div className="col s6 m3">
                            <span className="label">Current Owner: </span>
                            <span className="subtitle">{file.owner? file.owner.displayName: "N/A"}</span>
                        </div>
                        <div className="col s6 m3">
                            <span className="label">Origin: </span>
                            <span className="subtitle">{file.creator? file.creator.displayName: "N/A"}</span>
                        </div>
                        {file.name &&
                        <div className="col s6 m3">
                            <span className="label">File Name: </span>
                            <span className="name">{file.name}</span>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileItem;