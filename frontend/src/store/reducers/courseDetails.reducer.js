import {
    FETCH_COURSE_PENDING,
    FETCH_COURSE_FAIL,
    FETCH_COURSE_SUCCESS,
    FETCH_COURSE_GOAL_PENDING,
    FETCH_COURSE_GOAL_SUCCESS,
    FETCH_COURSE_GOAL_FAIL,
    DELETE_COURSE_GOAL_SUCCESS,
    FETCH_COURSE_OUTCOME_PENDING,
    FETCH_COURSE_OUTCOME_SUCCESS,
    FETCH_COURSE_OUTCOME_FAIL,
    FETCH_COURSE_EVUALATE_FAIL,
    FETCH_COURSE_EVUALATE_SUCCESS,
    FETCH_COURSE_EVUALATE_PENDING,
    UPDATE_COURSE_GOAL_SUCCESS,
    FETCH_COURSE_CONTENT_PENDING,
    FETCH_COURSE_CONTENT_SUCCESS,
    FETCH_COURSE_CONTENT_FAIL
}
    from '../constants/ActionTypes'

const initialState = {
    pending: false,
    error: null,
    data: null
}

const courseDetailReducer = (state = {}, action) => {
    let course
    switch (action.type) {
        //FIRST FETCH
        case FETCH_COURSE_PENDING:
            course = {}
            course[action.payload] = {
                pending: true,
                error: null
            }
            return {
                ...state,
                ...course
            }
        case FETCH_COURSE_SUCCESS:
            course = {}
            course[action.payload.mamh] = {
                general: action.payload.data,
                goal: initialState,
                outcome: initialState,
                evualate: initialState,
                content: initialState
            }
            return {
                ...state,
                ...course
            }
        case FETCH_COURSE_FAIL:
            course = {}
            course[action.payload.mamh] = {
                pending: false,
                error: action.payload.error
            }
            return {
                ...state,
                ...course
            }
        ////
        //GOAL
        case FETCH_COURSE_GOAL_PENDING:
            course = { ...state }
            course[action.payload].goal = {
                ...course[action.payload].goal,
                pending: true,
                error: null
            }
            return course
        case FETCH_COURSE_GOAL_FAIL:
            course = { ...state }
            course[action.payload.mamh].goal = {
                ...course[action.payload.mamh].goal,
                pending: false,
                error: action.payload.error
            }
            return course
        case FETCH_COURSE_GOAL_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].goal = {
                ...course[action.payload.mamh].goal,
                pending: false,
                data: action.payload.data
            }
            return course
        case DELETE_COURSE_GOAL_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].goal = {
                ...course[action.payload.mamh].goal,
                pending: false,
                data: state[action.payload.mamh].goal.data
                    .filter(goal => goal.muctieu !== action.payload.muctieu)
            }
            return course
        case UPDATE_COURSE_GOAL_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].goal.data =
                course[action.payload.mamh].goal.data
                    .map(item => item.muctieu === action.payload.muctieu
                        ? action.payload.data
                        : item)
            return course
        //OUTCOME
        case FETCH_COURSE_OUTCOME_PENDING:
            course = { ...state }
            course[action.payload].outcome = {
                ...course[action.payload].outcome,
                pending: true,
                error: ''
            }
            return course
        case FETCH_COURSE_OUTCOME_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].outcome = {
                ...course[action.payload.mamh].outcome,
                pending: false,
                data: action.payload.data
            }
            return course
        case FETCH_COURSE_OUTCOME_FAIL:
            course = { ...state }
            course[action.payload.mamh].outcome = {
                ...course[action.payload.mamh].outcome,
                pending: false,
                error: action.payload.error
            }
            return course
        //EVUALATE
        case FETCH_COURSE_EVUALATE_PENDING:
            course = { ...state }
            course[action.payload].evualate = {
                ...course[action.payload].evualate,
                pending: true,
                error: ''
            }
            return course
        case FETCH_COURSE_EVUALATE_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].evualate = {
                ...course[action.payload.mamh].evualate,
                pending: false,
                data: action.payload.data
            }
            return course
        case FETCH_COURSE_EVUALATE_FAIL:
            course = { ...state }
            course[action.payload.mamh].evualate = {
                ...course[action.payload.mamh].evualate,
                pending: false,
                error: action.payload.error
            }
            return course
        //CONTENT
        case FETCH_COURSE_CONTENT_PENDING:
            course = { ...state }
            course[action.payload].content = {
                ...course[action.payload].content,
                pending: true,
                error: ''
            }
            return course
        case FETCH_COURSE_CONTENT_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].content = {
                ...course[action.payload.mamh].content,
                pending: false,
                data: action.payload.data
            }
            return course
        case FETCH_COURSE_CONTENT_FAIL:
            course = { ...state }
            course[action.payload.mamh].content = {
                ...course[action.payload.mamh].content,
                pending: false,
                error: action.payload.error
            }
            return course
        default:
            return state
    }
}

export default courseDetailReducer