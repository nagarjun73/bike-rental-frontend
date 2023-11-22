const initialProfile = {
  unApprProfiles: [],
  unApprVehicles: [],
  vehicleCategories: []
}

const adminReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_DATA": {
      return { ...state, unApprProfiles: action.payload[0].data, unApprVehicles: action.payload[1].data, vehicleCategories: action.payload[2].data }
    }

    case "UPDATE_APPROVE_PROFILE": {
      return { ...state, unApprProfiles: state.unApprProfiles.filter((ele) => ele._id !== action.payload) }
    }

    case "UPDATE_APPROVE_VEHICLE": {
      return { ...state, unApprVehicles: state.unApprVehicles.filter((ele) => ele._id !== action.payload) }
    }

    case "UPDATE_VEHICLE_TYPE": {
      return {
        ...state, vehicleCategories: state.vehicleCategories.map((ele) => {
          if (ele._id == action.payload._id) {
            return action.payload
          } else {
            return ele
          }
        })
      }
    }

    case "DELETE_VEHICLE_TYPE": {
      return { ...state, vehicleCategories: state.filter((ele) => ele._id === action.payload) }
    }

    default: {
      return { ...state }
    }
  }
}

export default adminReducer