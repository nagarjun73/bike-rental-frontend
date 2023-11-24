const intialBookingState = {
  bookingId: '',
  bookingDetails: {},
  isLoading: false,
  userTrips: []
}

const bookingReducer = (state = intialBookingState, action) => {
  switch (action.type) {
    case "UPDATE_BOOKING_ID": {
      return { ...state, bookingId: action.payload }
    }

    case "UPDATE_TRIP_DETAILS": {
      return { ...state, bookingDetails: action.payload.data }
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