import {
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  FETCH_USERS,
  CHECK_ONLINE
} from "../redux/types";

const initialState = {
    currentUser:null,
    loggedIn:false,
    users:[],
    supervisor: false,
    language: "English",
    loading: true,
    online: false
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      localStorage.setItem("token", payload._id);
      return {
        ...state,
        currentUser: payload,
        supervisor: payload.designation == "Position S" ? true : false,
        language: payload.language ? payload.language : state.language,
        loggedIn: true,
        loading: false
      };
    case UNSET_CURRENT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: null,
        loggedIn: false,
        loading: false
      };
    case FETCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case CHECK_ONLINE:
      return {
        ...state,
        online: payload,
        language: state.language
      };
    default:
      return state;
  }
};

export default userReducer;
