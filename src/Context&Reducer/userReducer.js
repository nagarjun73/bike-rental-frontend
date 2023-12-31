export default function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER": {
      return { ...state, user: action.payload[0]?.data, profile: action.payload[1]?.data }
    }
    case "LOGOUT_USER": {
      return { ...state, user: {}, profile: {} }
    }

    case "EDIT_USER": {
      return { ...state, user: action.payload }
    }

    case "UPDATE_TRIP_STATUS": {
      return {
        ...state, profile: {
          ...state.profile, tripHistory: [...state.profile.tripHistory.map((ele) => {
            if (ele._id === action.payload._id) {
              return action.payload
            } else {
              return ele
            }
          })]
        }
      }
    }

    default: {
      return { ...state }
    }
  }
}