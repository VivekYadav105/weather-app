import React from "react"
import './inputbar.css'
export default function InputBar(props){
    const {input,label} = props
    return(
        <div className="input-wrapper">
            <div className="input-box">
                <input className="input-bar" {...input} autoComplete="off"/>
                {label&& <label htmlFor={input.id}>{label.name}</label>}
            </div>
        </div>
    )
}