import React from 'react';
import {ButtonContainer} from './button.styles.js';

const Button = ({children, ...props}) => {
    return (
        <ButtonContainer {...props}>
            {children}
        </ButtonContainer>
    )
}

export default Button