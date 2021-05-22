import * as dashboardConstants from '../constants/dashboardConstants'
const initialState = {
  username: '',
  activeUsers: [],
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstants.DASHBOARD_SET_USERNAME:
      return { ...state, username: action.username }
    case dashboardConstants.DASHBOARD_SET_ACTIVE_USERS:
      return { ...state, activeUsers: action.activeUsers }
    default:
      return state
  }
}

export default dashboardReducer
