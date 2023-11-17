const vehicleTypeState = {
  vehicleTypesList: []
}

const vehicleTypeReducer = (state = vehicleTypeState, action) => {
  switch (action.type) {
    case "UPDATE_VEHICLE_TYPE": {
      return { ...state, vehicleTypesList: action.payload }
    }
    default: {
      return { ...state }
    }
  }
}

export default vehicleTypeReducer