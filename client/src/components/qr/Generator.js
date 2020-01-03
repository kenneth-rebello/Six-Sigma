import React, { useState } from 'react';
import './QR.css';
import {connect} from 'react-redux';

import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import { addFileToDB } from '../../actions/file.actions';

const Generator = ({loggedIn, addFileToDB}) => {

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

    const downloadMany = () => {

        document.getElementById("toExport").style.display = "block";
        html2canvas(document.getElementById("toExport"),{
            logging: true,
            profile: true,
            useCORS: true
        }).then(canvas =>{
            let data = canvas.toDataURL('image/jpeg', 0.9);
            let src = encodeURI(data);
            document.getElementById('screenshot').src = src;
        })
        document.getElementById("toExport").style.display = "none"
    }

    const addFile = () => {
        if(text==="No text entered yet" || text.trim()===""){
            alert('Filename needs to be filled')
        }
        if(!loggedIn){
            alert('You need to log in to add a file to database')
        }
        addFileToDB(text);
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
                <div className="col s12 m6 l4 center-align">
                    <button className="btn" onClick={downloadOne}>Save single</button>
                </div>
                <div className="col s12 m6 l4 center-align">
                    <a className="waves-effect waves-light btn modal-trigger" 
                        onClick={downloadMany}
                        href="#pdf-modal">
                        Save sheet
                    </a>
                </div>
                <div className="col s12 m6 l4 center-align">
                    <button className="btn" onClick={addFile}>Add File To Database</button>
                </div>
            </div>
            
            {/* Not to be modified after this point */}
            <a id="download-link" style={{display:'none'}} href="/generator">Hidden Anchor</a>
    
            <div id="pdf-modal" className="modal">
                <div className="modal-content center-align">
                    <img src="" id="screenshot" 
                        alt="Screenshot loading, please wait"/>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn">Close</a>
                </div>
            </div>

            <div id="toExport">
                <h1 className="center-align">{text}</h1>
                {pdfPage}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps, {addFileToDB})(Generator);