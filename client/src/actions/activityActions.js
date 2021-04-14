import axios from 'axios'
import {ACTIVITY_LIST_REQUEST, ACTIVITY_LIST_SUCCESS, ACTIVITY_LIST_FAIL} from '../constants/activityConstants'

export const listActivities = () => async(dispatch) => {
    try {
        dispatch({ type: ACTIVITY_LIST_REQUEST})
        const { data } = await axios.get('/api/activity')
        
        dispatch({ 
            type: ACTIVITY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ACTIVITY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}