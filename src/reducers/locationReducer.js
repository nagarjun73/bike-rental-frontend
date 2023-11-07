const initialLocation = {
  locationList: [],
  locationErrors: {}
}

const locationReducer = (state = initialLocation, action) => {
  switch (action.type) {
    case "UPDATE_LOCATION": {
      return { ...state, locationList: [...action.payload] }
    }

    case "SET_LOCATION_ERRORS": {
      return { ...state, locationErrors: { ...state.locationErrors, fetchError: action.payload } }
    }

    default: {
      return { ...state }
    }
  }
}

export default locationReducer