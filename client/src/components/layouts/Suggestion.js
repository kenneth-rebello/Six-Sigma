import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { overlay, content } from '../../utils/modalStyles';

const Suggestion = ({loading, currentUser}) => {

    const [open, toggleOpen] = useState(false);

    useEffect(()=>{
        if (!loading && currentUser && !currentUser.registered) setTimeout(()=>{
            toggleOpen(true)
        },3000) 
    },[loading])


    return (
        <div>
            <Modal
                isOpen={open}
                onRequestClose={()=>toggleOpen(false)}
                style={{
                    overlay: overlay,
                    content: content
                }}
            >
                <div className="modal-content">
                    <p>You need to be a registered user to actively use the Six Sigma file tracking app.
                        Most features will remain locked until a user is properly registered</p>
                    <a href="/register" className="btn" onClick={()=>toggleOpen(false)}>Register now</a>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    loading: state.user.loading,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Suggestion);