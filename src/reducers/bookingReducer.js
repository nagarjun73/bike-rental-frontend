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

    default: {
      return { ...state }
    }
  }
}

export default bookingReducer