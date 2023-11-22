const initialProfile = {
  unApprProfiles: [],
  unApprVehicles: []
}

const adminReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_DATA": {
      return { ...state, unApprProfiles: action.payload[0].data, unApprVehicles: action.payload[1].data }
    }

    case "UPDATE_APPROVE_PROFILE": {
      return { ...state, unApprProfiles: state.unApprProfiles.filter((ele) => ele._id !== action.payload) }
    }

    case "UPDATE_APPROVE_VEHICLE": {
      return { ...state, unApprVehicles: state.unApprVehicles.filter((ele) => ele._id !== action.payload) }
    }

    default: {
      return { ...state }
    }
  }
}

export default adminReducer