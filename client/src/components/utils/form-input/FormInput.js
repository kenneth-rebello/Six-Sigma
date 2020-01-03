import React from 'react';
import {Group, Input, FormLabel} from './form-input.styles.js';

const FormInput = ({handleChange, label, ...otherProps}) => {
    return (
        <Group>
            <Input className="form-input" onChange={handleChange} {...otherProps}/>
            {label && <FormLabel>
                {label}
            </FormLabel>}
        </Group>
    )
}

export default FormInput 