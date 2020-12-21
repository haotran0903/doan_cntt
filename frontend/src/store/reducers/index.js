import { combineReducers } from 'redux'
import coursesReducer from './courses.reducer'
import coursesDetailsReducer from './courseDetails.reducer'
import accountReducer from './account.reducer'

const rootReducer = combineReducers({
    courses: coursesReducer,
    course: coursesDetailsReducer,
    account: accountReducer
})

export default rootReducer