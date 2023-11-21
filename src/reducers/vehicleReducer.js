const initialVehicleState = {
  searchedVehicles: [],
  hostVehicles: [],
  isLoading: false
}


const vehicleReducer = (state = initialVehicleState, action) => {
  switch (action.type) {
    case "SEARCHED_VEHICLES": {
      return { ...state, searchedVehicles: action.payload }
    }

    case "GET_VEHICLES": {
      return { ...state, hostVehicles: action.payload }
    }

    case "ADD_VEHICLE": {
      return { ...state, hostVehicles: [action.payload, ...state.hostVehicles] }
    }

    case "UPDATE_IS_LOADING": {
      if (action.payload == 'true') {
        return { ...state, isLoading: true }
      } else {
        return { ...state, isLoading: false }
      }
    }

    default: {
      return { ...state }
    }
  }
}

export default vehicleReducer