import {
    FETCH_COURSE_EVUALATE_PENDING,
    FETCH_COURSE_EVUALATE_SUCCESS,
    FETCH_COURSE_EVUALATE_FAIL
}
    from '../constants/ActionTypes'
import { getCourseEvualate } from '../../api/CourseAPI'
import { ErrorHelper } from '../../utils'

const fetchEvualatePending = mamh => ({
    type: FETCH_COURSE_EVUALATE_PENDING,
    payload: mamh
})

const fetchEvualateSuccess = (mamh, data) => ({
    type: FETCH_COURSE_EVUALATE_SUCCESS,
    payload: { mamh, data }
})

const fetchEvualateFail = (mamh, error) => ({
    type: FETCH_COURSE_EVUALATE_FAIL,
    payload: { mamh, error }
})

export const fetchEvualate = mamh => {
    return dispatch => {
        dispatch(fetchEvualatePending(mamh))
        getCourseEvualate(mamh)
            .then(data => {
                dispatch(fetchEvualateSuccess(mamh, data))
            })
            .catch(err => {
                dispatch(fetchEvualateFail(mamh, ErrorHelper(err)))
            })
    }
}