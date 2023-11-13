export default function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER": {
      return { ...state, user: action.payload[0].data, profile: action.payload[1].data }
    }
    case "LOGOUT_USER": {
      return { ...state, user: {}, profile: {} }
    }
    default: {
      return { ...state }
    }
  }
}