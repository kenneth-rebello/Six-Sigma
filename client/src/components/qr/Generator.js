import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QR.css';

const Generator = () => {

    const [text, setText] = useState('No text entered yet');

    const Changer = e => {
        setText(e.target.value)
    }

    const downloadQR = () => {
        const canvas  = document.getElementById('qrcode');
        const pngURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.getElementById('download-link');
        downloadLink.href = pngURL;
        downloadLink.download = `${text}.png`;
        downloadLink.click();
        setText('')
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
            <button className="btn" onClick={downloadQR} >Download QR Code</button>
            <a id="download-link" style={{display:'none'}} href="/generator">Hidden Anchor</a>
        </div>
    )
}

export default Generator;