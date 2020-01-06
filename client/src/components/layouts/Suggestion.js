import React from 'react'
const Suggestion = ({history}) => {

    const goToRegister = () => {
        document.getElementById('suggest-close-btn').click();
    }

    return (
        <div>
            <a id="suggestbtn" className="waves-effect waves-light btn modal-trigger" href="#suggest">
                Click
            </a>
            <div id="suggest" className="modal bottom-sheet">
                <div className="modal-content">
                    <p>You need to be a registered user </p>
                    <a href="/register" className="btn" onClick={()=>goToRegister()}>Register now</a>
                </div>
                <div className="modal-footer" style={{display: 'none'}}>
                    <a href="!#" id="suggest-close-btn" className="modal-close waves-effect waves-green btn-flat">
                        Register
                    </a>
                </div>
            </div> 
        </div>
    )
}

export default Suggestion;