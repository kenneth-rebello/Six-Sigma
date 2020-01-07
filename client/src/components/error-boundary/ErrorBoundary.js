import React, { Component } from 'react';
import './ErrorBoundary.css';

export class ErrorBoundary extends Component {

    constructor(props){
        super(props);

        this.state = {
            hasErrored: false,
            url: ""
        }
    }

    static getDerivedStateFromError(error){
        //process error handling
        return { hasErrored: true }
    }

    componentDidCatch(error, info){
        
        console.log(error)
    }

    render() {

        if(this.state.hasErrored){
            return (
                <div className="error-overlay">
                    <div className="error-image"/>
                    <div className="error-text">Sorry a dog ate this page</div>
                    <p className="error-msg">The website has encountered an error, this might be a problem with your 
                        internet conection as you might be trying to access data from the servers, please check all
                        connections and try again</p>
                    <p className="error-subtext">(Note: All pages do not require an internet connection)</p>
                </div>
            )
        }else{
            return this.props.children;
        }
    }
}

export default ErrorBoundary;