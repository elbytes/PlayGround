import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { activityListReducer } from './reducers/activityReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userHomeReducer,
  userFindReducer,
} from './reducers/userReducers'
import dashboardReducer from './reducers/dashboardReducer'
import { callReducer } from './reducers/callReducer'
import { chessReducer } from './reducers/chessReducers'
import { canvasReducer } from './reducers/canvasReducer'

const reducer = combineReducers({
  activityList: activityListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userHome: userHomeReducer,
  userFind: userFindReducer,
  call: callReducer,
  chess: chessReducer,
  dashboard: dashboardReducer,
  canvas: canvasReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  chess: {},
  // userRegister: {},
  // userDetails: { userDetails: userInfoFromStorage },
  // userUpdateProfileReducer: {},
  // userHome: {},
  // call: {},
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
