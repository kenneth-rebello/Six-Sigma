import { SET_FORMDATA } from "../redux/types"

export const setFormDataAction = data => dispatch =>{
    dispatch({
        type: SET_FORMDATA,
        payload: data
    })
}