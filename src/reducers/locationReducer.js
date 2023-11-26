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

    case "EDIT_LOCATION": {
      return {
        ...state, locationList: state.locationList.map((ele) => {
          if (ele._id === action.payload._id) {
            return action.payload
          } else {
            return ele
          }
        })
      }
    }

    case "DELETE_LOCATION": {
      return {
        ...state, locationList: state.locationList.filter((ele) => ele._id !== action.payload._id)
      }
    }

    case "ADD_LOCATION": {
      return {
        ...state, locationList: [...state.locationList, action.payload]
      }
    }

    default: {
      return { ...state }
    }
  }
}

export default locationReducer