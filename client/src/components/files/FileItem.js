import React from 'react';
import { connect } from 'react-redux';
import './Files.css';
import { dict } from '../../utils/language';

const FileItem = ({file, language}) => {
    return (
        <div className="file-item row">
            <div className="col s12">
                <div className="card whitesmoke">
                    <div className="card-content row">
                        
                        <div className="col s6 m3">
                            <span className="label">{dict["File Number"][language]}: </span>
                            <span className="title">{file.file_number}</span>
                        </div>
                        <div className="col s6 m3">
                            <span className="label">{dict["Current Owner"][language]}: </span>
                            <span className="subtitle">{file.owner? file.owner.displayName: "N/A"}</span>
                        </div>
                        <div className="col s6 m3">
                            <span className="label">{dict["Creator"][language]}: </span>
                            <span className="subtitle">{file.creator? file.creator.displayName: "N/A"}</span>
                        </div>
                        {file.name &&
                        <div className="col s6 m3">
                            <span className="label">{dict["File Name"][language]}: </span>
                            <span className="name">{file.name}</span>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.user.language
})

export default connect(mapStateToProps)(FileItem);