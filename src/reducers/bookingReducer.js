const intialBookingState = {
  bookingId: '',
  bookingDetails: {},
  isLoading: false
}

const bookingReducer = (state = intialBookingState, action) => {
  switch (action.type) {
    case "UPDATE_BOOKING_ID": {
      return { ...state, bookingId: action.payload }
    }

    case "UPDATE_TRIP_DETAILS": {
      return { ...state, bookingDetails: action.payload.data }
    }

    default: {
      return { ...state }
    }
  }
}

export default bookingReducer