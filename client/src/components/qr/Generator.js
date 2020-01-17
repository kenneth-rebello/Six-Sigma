import React, { useState } from 'react';
import './QR.css';
import {connect} from 'react-redux';

import QRCode from 'qrcode.react';
import { addFile } from '../../actions/file.actions';

const Generator = ({loggedIn, addFile, history}) => {

    const [text, setText] = useState('No text entered yet');

    const Changer = e => {
        setText(e.target.value)
    }

    const downloadOne = () => {
        const canvas  = document.getElementById('qrcode');
        const pngURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.getElementById('download-link');
        downloadLink.href = pngURL;
        downloadLink.download = `${text}.png`;
        downloadLink.click();
        setText('')
    }


    const addFileFunc = () => {
        if(text==="No text entered yet" || text.trim()===""){
            alert('Filename needs to be filled')
            return
        }
        if(!loggedIn){
            alert('You need to log in to add a file to database')
            return
        }
        addFile(text);
        history.push('/new_file')
    }

    let pdfPage = [];
    for(var i=0; i<3; i++){
        pdfPage.push(<div className="row">
            <div className="col s6">
                <QRCode
                    id="qrcode"
                    value={text}
                    size={300}
                    level={"H"}
                    includeMargin={true}
                />
            </div>
            <div className="col s6">
                <QRCode
                    id="qrcode"
                    value={text}
                    size={300}
                    level={"H"}
                    includeMargin={true}
                />
            </div>
        </div>)
    }

    return (
        <div className="qr-home">

            <div className="input-box">
                <label>Enter unique file number to convert to QRCode here</label>
                <input type="text" onChange={e => Changer(e)} value={text === "No text entered yet" ? '' : text}
                    placeholder="File Number" />
            </div>

            <QRCode
                id="qrcode"
                value={text}
                size={300}
                level={"H"}
                includeMargin={true}
            />

            <div className="row">
                <div className="col s12 m6 center-align">
                    <button className="btn" onClick={downloadOne}>Save single</button>
                </div>

                <div className="col s12 m6 center-align">
                    <button className="btn" onClick={addFileFunc}>Add File To Database</button>
                </div>
            </div>
            
            {/* Not to be modified after this point */}
            <a id="download-link" style={{display:'none'}} href="/generator">Hidden Anchor</a>
    
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps, {addFile})(Generator);