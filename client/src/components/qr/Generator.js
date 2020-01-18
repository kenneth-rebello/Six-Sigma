import React, { useState } from 'react';
import './QR.css';
import { connect } from 'react-redux';
import { dict } from '../../utils/language';

import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import { addFile } from '../../actions/file.actions';

const Generator = ({ loggedIn, addFile, history, language }) => {

    const [text, setText] = useState('No text entered yet');

    const Changer = e => {
        setText(e.target.value)
    }

    const downloadOne = () => {
        const canvas = document.getElementById('qrcode');
        const pngURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.getElementById('download-link');
        downloadLink.href = pngURL;
        downloadLink.download = `${text}.png`;
        downloadLink.click();
        setText('')
    }

    const downloadMany = () => {

        document.getElementById("toExport").style.display = "block";
        html2canvas(document.getElementById("toExport"), {
            logging: true,
            profile: true,
            useCORS: true
        }).then(canvas => {
            let data = canvas.toDataURL('image/jpeg', 0.9);
            let src = encodeURI(data);
            document.getElementById('screenshot').src = src;
        })
        document.getElementById("toExport").style.display = "none"
    }

    const addFileFunc = () => {
        if (text === "No text entered yet" || text.trim() === "") {
            alert(dict['Filename needs to be filled'][language])
            return
        }
        if (!loggedIn) {
            alert(dict['You need to log in to add a file to database'][language])
            return
        }
        addFile(text);
        history.push('/new_file')
    }

    let pdfPage = [];
    for (var i = 0; i < 3; i++) {
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
                <label>{dict['Enter unique file number to convert to QRCode here'][language]}</label>
                <input type="text" onChange={e => Changer(e)} value={text === "No text entered yet" ? '' : text}
                    placeholder={dict["File Number"][language]} />
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
                    <button className="btn" onClick={downloadOne}>{dict['Save single'][language]}</button>
                </div>
                <div className="col s12 m6 l4 center-align">
                    <a className="waves-effect waves-light btn modal-trigger"
                        onClick={downloadMany}
                        href="#pdf-modal">
                        {dict["Save sheet"][language]}
                    </a>
                </div>
                <div className="col s12 m6 l4 center-align">
                    <button className="btn" onClick={addFileFunc}>{dict['Add File To Database'][language]}</button>
                </div>
            </div>

            {/* Not to be modified after this point */}
            <a id="download-link" style={{ display: 'none' }} href="/generator">{dict['Hidden Anchor'][language]}</a>

            <div id="pdf-modal" className="modal">
                <div className="modal-content center-align">
                    <img src="" id="screenshot"
                        alt="Screenshot loading, please wait" />
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn">{dict['Close'][language]}</a>
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
    loggedIn: state.user.loggedIn,
    language: state.user.language
})

export default connect(mapStateToProps, { addFile })(Generator);