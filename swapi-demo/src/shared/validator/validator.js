import React from 'react';
export const validate = values => {
    const errors = {}
    if (!values.password) {
        errors.name = 'Required'
    }
    if (!values.password) {
        errors.label = 'Required'
    }
    if (!values.type) {
        errors.type = 'Required'
    }
    if (!values.attribute_name) {
        errors.attribute_name = 'Required'
    }
    return errors
}

export const renderField = ({ input, label, placeholder, className, type, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} className = {className} placeholder={placeholder} type={type}/>
        {touched && ((error && <span style={{color:'red'}}>{error}</span>))}
    </div>
)
