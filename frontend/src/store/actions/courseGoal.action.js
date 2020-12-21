import {
    FETCH_COURSE_GOAL_PENDING,
    FETCH_COURSE_GOAL_SUCCESS,
    FETCH_COURSE_GOAL_FAIL,
    DELETE_COURSE_GOAL_SUCCESS,
    UPDATE_COURSE_GOAL_SUCCESS
}
    from '../constants/ActionTypes'
import { getCourseGoal } from '../../api/CourseAPI'
import { ErrorHelper } from '../../utils'

const fetchGoalPending = mamh => ({
    type: FETCH_COURSE_GOAL_PENDING,
    payload: mamh
})

const fetchGoalFail = (mamh, error) => ({
    type: FETCH_COURSE_GOAL_FAIL,
    payload: { mamh, error }
})

const fetchGoalSuccess = (mamh, data) => ({
    type: FETCH_COURSE_GOAL_SUCCESS,
    payload: {
        mamh,
        data
    }
})

export const updateGoalSuccess = (mamh, muctieu, data) => ({
    type: UPDATE_COURSE_GOAL_SUCCESS,
    payload: {
        mamh,
        muctieu,
        data
    }
})

export const deleteGoalSuccess = (mamh, muctieu) => ({
    type: DELETE_COURSE_GOAL_SUCCESS,
    payload: {
        mamh,
        muctieu
    }
})

export const fetchGoal = mamh => {
    return dispatch => {
        dispatch(fetchGoalPending(mamh))
        getCourseGoal(mamh)
            .then(data => {
                dispatch(fetchGoalSuccess(mamh, data))
            })
            .catch(err => {
                dispatch(fetchGoalFail(mamh, ErrorHelper(err)))
            })
    }
}