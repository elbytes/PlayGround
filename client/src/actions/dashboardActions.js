import { DASHBOARD_SET_USERNAME } from '../constants/dashboardConstants'
import { DASHBOARD_SET_ACTIVE_USERS } from '../constants/dashboardConstants'
import { DASHBOARD_SET_CALLEE } from '../constants/dashboardConstants'
export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username,
  }
}

export const setActiveUsers = (activeUsers) => {
  return {
    type: DASHBOARD_SET_ACTIVE_USERS,
    activeUsers,
  }
}
