import {
    FETCH_COURSE_PENDING,
    FETCH_COURSE_SUCCESS,
    FETCH_COURSE_FAIL
}
    from '../constants/ActionTypes'
import { getCourseInfo } from '../../api/CourseAPI'
import { ErrorHelper } from '../../utils'

const fetchCoursePending = mamh => ({
    type: FETCH_COURSE_PENDING,
    payload: mamh
})

const fetchCourseSuccess = data => ({
    type: FETCH_COURSE_SUCCESS,
    payload: data
})

const fetchCourseFail = (mamh, error) => ({
    type: FETCH_COURSE_FAIL,
    payload: { mamh, error }
})

export const fetchCourse = mamh => {
    return dispatch => {
        dispatch(fetchCoursePending())
        getCourseInfo(mamh)
            .then(data => ({ mamh, data }))
            .then(data => {
                dispatch(fetchCourseSuccess(data))
            })
            .catch(err => {
                dispatch(fetchCourseFail(mamh, ErrorHelper(err)))
            })
    }
}