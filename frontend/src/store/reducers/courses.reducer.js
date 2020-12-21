import { FETCH_COURSES_PENDING, FETCH_COURSES_FAIL, FETCH_COURSES_SUCCESS, DELETE_COURSE } from '../constants/ActionTypes'

const initialState = {
    loading: false,
    data: null,
    error: null
}

const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FETCH_COURSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_COURSE:
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item.mamh !== action.payload)
            }
        default:
            return state
    }
}

export default coursesReducer