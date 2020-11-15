import React from 'react';
import './Button.css'

const button = (props) => {
    let cssClass = ['Button'];
    if (props.btnType == "Success") {
        cssClass.push('Success');
    }
    else {
        cssClass.push('Danger');
    }
    let css = cssClass.join(' ');
    console.log(css);
    
    return (
        <button className={css} onClick={props.clicked}>
            {props.children}
        </button>
    );
};

export default button;