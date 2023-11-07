const initialVehicleState = {
  searchedVehicles: []
}


const vehicleReducer = (state = initialVehicleState, action) => {
  switch (action.type) {
    case "SEARCHED_VEHICLES": {
      return { ...state, searchedVehicles: action.payload }
    }

    default: {
      return { ...state }
    }
  }
}

export default vehicleReducer