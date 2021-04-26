import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_FIND_FAIL,
  USER_FIND_REQUEST,
  USER_FIND_SUCCESS,
  USER_HOME_FAIL,
  USER_HOME_REQUEST,
  USER_HOME_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { Loading: true }
    case USER_LOGIN_SUCCESS:
      return { Loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { Loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { Loading: true }
    case USER_REGISTER_SUCCESS:
      return { Loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { Loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, Loading: true }
    case USER_DETAILS_SUCCESS:
      return { Loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { Loading: false, error: action.payload }
    default:
      return state
  }
}

export const userHomeReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_HOME_REQUEST:
      return { ...state, Loading: true }
    case USER_HOME_SUCCESS:
      return { Loading: false, user: action.payload }
    case USER_HOME_FAIL:
      return { Loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { Loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { Loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { Loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userFindReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FIND_REQUEST:
      return { Loading: true }
    case USER_FIND_SUCCESS:
      return { Loading: false, success: true, userInfo: action.payload }
    case USER_FIND_FAIL:
      return { Loading: false, error: action.payload }

    default:
      return state
  }
}
