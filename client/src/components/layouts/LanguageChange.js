import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { overlay, content } from '../../utils/modalStyles';
import { setLanguage } from '../../actions/util.actions';
import Modal from 'react-modal';

const LanguageChange = ({history, currentUser, setLanguage}) => {

    useEffect(()=>{
        if(currentUser){
            toggleOpen(true)
        }
    },[currentUser])

    const [open, toggleOpen] = useState(true);
    const [lang, setLang] = useState("English")

    const Submitter = e => {
        e.preventDefault();
        setLanguage(lang);
        toggleOpen(false);
        setLang("English");
        history.push("/");
    }

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
                <form onSubmit={e=>Submitter(e)}>
                    <label>Select a language</label>
                    <select value={lang} onChange={(e)=>setLang(e.target.value)} required>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Nepali">Nepali</option>
                    </select>
                    <input type="submit" className="btn green" value="Submit Prefernce"/>
                </form>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps,{ setLanguage })(LanguageChange);