export default function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER": {
      return { ...state, user: action.payload }
    }
    case "LOGOUT_USER": {
      return { ...state, user: {} }
    }
    default: {
      return { ...state }
    }
  }
}