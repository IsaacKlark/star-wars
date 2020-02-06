import React from 'react';
import { connect } from 'react-redux';
import * as URLData from './store/store';

const ErroOfLoading = ({ getURL }) => {

    return (
        <div className="ErrorWrap">
            <h2 className="Error">
                Error of Loading 
            </h2>
            <button 
                type="button" 
                className="try-again"
                onClick={() => {getURL()}}
            >
                Try again
            </button>
        </div>
    )
}

const loadAgain = {
    getURL: URLData.getURL,
}

const getData = state => ({})

export default connect(getData, loadAgain)(ErroOfLoading);

