import { createStore, combineReducers, applyMiddleware } from 'redux'
import locationReducer from '../reducers/locationReducer'
import vehicleReducer from '../reducers/vehicleReducer'
import thunk from 'redux-thunk'


const configStore = () => {
  const store = createStore(combineReducers({
    location: locationReducer,
    vehicle: vehicleReducer
  }), applyMiddleware(thunk))
  return store
}

export default configStore