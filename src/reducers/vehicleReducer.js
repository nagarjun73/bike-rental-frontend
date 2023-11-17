const initialVehicleState = {
  searchedVehicles: [],
  hostVehicles: []
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
      return { ...state, hostVehicles: [...state.hostVehicles, action.payload] }
    }

    default: {
      return { ...state }
    }
  }
}

export default vehicleReducer