import styled, {css} from 'styled-components';

const Button = css`
background-color: black;
color: white;
border:none;
&:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
}
`

const InvertedButton = css`
background-color: white;
      color: black;
  
      &:hover {
        background-color: black;
        color: white;
      }
`

const Google = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

const getButtonStyles = props => {
    if(props.isGoogleSignIn){
        return Google
    }

    return props.inverted? InvertedButton : Button
}

export const ButtonContainer = styled.button`
min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    padding: 0 35px 0 35px;
    margin: 0.1rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    ${getButtonStyles}
`