import { createStore, combineReducers, applyMiddleware } from 'redux'
import locationReducer from '../reducers/locationReducer'
import vehicleReducer from '../reducers/vehicleReducer'
import bookingReducer from '../reducers/bookingReducer'
import thunk from 'redux-thunk'


const configStore = () => {
  const store = createStore(combineReducers({
    location: locationReducer,
    vehicle: vehicleReducer,
    booking: bookingReducer
  }), applyMiddleware(thunk))
  return store
}

export default configStore