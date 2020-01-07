import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './QR.css'
import { fileQRScanned } from '../../actions/file.actions';
import { connect } from 'react-redux';

const Scanner = ({ fileQRScanned, history }) => {

    const [result, setResult] = useState('No image detected')

    const handleScan = data => {
        if (data) {
            setResult(data)
            const id = fileQRScanned(data);
            history.push(`/file/${id}`)
        }
    }

    const handleError = err => {
        alert(err)
    }

    return (
        <div className="qr-home">
            <div className="container">
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            </div>
            <p>{result}</p>
        </div>
    )
}

export default connect(null,{fileQRScanned})(Scanner);