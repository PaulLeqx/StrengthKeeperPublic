import { CHANGE_CONTACT_FORM, RESET_CONTACT_FORM } from '../actions/forms';

export const initialState = {
  senderName: "",
  senderEmail: "",
  senderMessage: "",
  resetEmail: "",
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_CONTACT_FORM:
      return {
        ...state,
        [action.name]: action.newValue
      }
    case RESET_CONTACT_FORM:
        return {
          ...state,
          senderName: "",
          senderEmail: "",
          senderMessage: ""
        }
      
    default: 
      return state;
  }
};

export default reducer;