export default function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER": {
      return { ...state, user: action.payload[0]?.data, profile: action.payload[1]?.data }
    }
    case "LOGOUT_USER": {
      return { ...state, user: {}, profile: {} }
    }

    case "UPDATE_TRIP": {
      if (state && state.profile && state.profile.tripHistory) {
        return {
          ...state, profile: { ...state.profile, tripHistory: [...state.profile.tripHistory, action.payload] }
        };
      } else {
        return state;
      }

    }
    default: {
      return { ...state }
    }
  }
}