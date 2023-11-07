import { createStore, combineReducers, applyMiddleware } from 'redux'
import locationReducer from '../reducers/locationReducer'
import thunk from 'redux-thunk'


const configStore = () => {
  const store = createStore(combineReducers({
    location: locationReducer
  }), applyMiddleware(thunk))
  return store
}

export default configStore