import React from "react";
import "./Input.scss";

const Input = ({inputType, inputPlaceholder, inputLabel, handleNameChange, value}) => {
    return(
        <div className="input-section">
            <label className="input-section__input-label">{inputLabel}</label>
            <input className="input-section__input-field" value={value} onChange={handleNameChange} placeholder={inputPlaceholder} type={inputType} />
        </div>
        
    )
}

export default Input;