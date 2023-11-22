const initialProfile = {
  unApprProfiles: []
}

const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_DATA": {
      return { ...state, unApprProfiles: action.payload[0].data }
    }

    case "UPDATE_APPROVE_PROFILE": {
      return { ...state, unApprProfiles: state.unApprProfiles.filter((ele) => ele._id !== action.payload) }
    }
    default: {
      return { ...state }
    }
  }
}

export default profileReducer