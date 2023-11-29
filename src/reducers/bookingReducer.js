const intialBookingState = {
  bookingDetails: {},
  isLoading: false,
  userTrips: []
}

const bookingReducer = (state = intialBookingState, action) => {
  switch (action.type) {

    case "ADD_BOOKING": {
      return { ...state, bookingDetails: action.payload }
    }

    case "UPDATE_TRIP_DETAILS": {
      return { ...state, bookingDetails: action.payload }
    }

    case "UPDATE_USER_TRIPS": {
      return { ...state, userTrips: action.payload }
    }

    case "UPDATE_TRIP_PAYMENT": {
      return {
        ...state, bookingDetails: {}, userTrips: state.userTrips.map((ele) => {
          if (ele._id === action.payload._id) {
            return action.payload
          } else {
            return ele
          }
        })
      }
    }

    case "UPDATE_RELOAD_TRIP_DETAIL": {
      return { ...state, userTrips: [...state.userTrips, action.payload] }
    }

    default: {
      return { ...state }
    }
  }
}

export default bookingReducer