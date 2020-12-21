import { FETCH_COURSES_PENDING, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAIL, DELETE_COURSE } from '../constants/ActionTypes'
import { getCourses, deleteCourse as deleteCourseService } from '../../api/CourseAPI'
import { ErrorHelper } from '../../utils'

const fetchCoursesPending = () => ({
    type: FETCH_COURSES_PENDING
})
const fetchCoursesSuccess = (courses) => ({
    type: FETCH_COURSES_SUCCESS,
    payload: courses
})
const fetchCoursesFail = (error) => ({
    type: FETCH_COURSES_FAIL,
    payload: error
})
const deleteCourseSuccess = (id) => ({
    type: DELETE_COURSE,
    payload: id
})

export const fetchCourses = () => {
    return dispatch => {
        dispatch(fetchCoursesPending())
        getCourses()
            .then(data => {
                if (Array.isArray(data)) {
                    dispatch(fetchCoursesSuccess(data))
                }
                else {
                    throw data
                }
            })
            .catch(err => {
                dispatch(fetchCoursesFail(ErrorHelper(err)))
            })
    }
}

export const deleteCourse = (id) => {
    return dispatch => {
        dispatch(fetchCoursesPending())
        deleteCourseService(id)
            .then(() => {
                dispatch(deleteCourseSuccess(id))
            })
            .catch(err => {
                dispatch(fetchCoursesFail('DELETE_FAILED'))
            })
    }
}