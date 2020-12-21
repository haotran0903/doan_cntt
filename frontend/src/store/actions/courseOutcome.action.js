import {
    FETCH_COURSE_OUTCOME_PENDING,
    FETCH_COURSE_OUTCOME_SUCCESS,
    FETCH_COURSE_OUTCOME_FAIL
}
    from '../constants/ActionTypes'
import { getCourseOutcome } from '../../api/CourseAPI'
import { ErrorHelper } from '../../utils'

const fetchOutcomePending = mamh => ({
    type: FETCH_COURSE_OUTCOME_PENDING,
    payload: mamh
})

const fetchOutcomeSuccess = (mamh, data) => ({
    type: FETCH_COURSE_OUTCOME_SUCCESS,
    payload: { mamh, data }
})

const fetchOutcomeFail = (mamh, error) => ({
    type: FETCH_COURSE_OUTCOME_FAIL,
    payload: { mamh, error }
})

export const fetchOutcome = mamh => {
    return dispatch => {
        dispatch(fetchOutcomePending(mamh))
        getCourseOutcome(mamh)
            .then(data => {
                dispatch(fetchOutcomeSuccess(mamh, data))
            })
            .catch(err => {
                dispatch(fetchOutcomeFail(mamh, ErrorHelper(err)))
            })
    }
}