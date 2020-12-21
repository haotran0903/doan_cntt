import { Switch, Route, Redirect } from 'react-router-dom'
import './index.scss'
import Appbar from './Appbar'
import Sidebar from './Appbar/sidebar'
import CourseList from './CourseList'
import CourseDetails from './CourseDetails'
import Homepage from './Homepage'
import LoginPage from './LoginPage'
import CreateCourse from './CreateCourse'
import { useEffect, useState } from 'react'
import PrivateRoute from './common/PrivateRoute'
import LoadingPageLogo from './common/LoadingPageLogo'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/account.action'
import { verifyToken } from '../api/UserAPI'
import { fetchCourses } from '../store/actions/courses.action'

const MainPage = () => {
  const dispatch = useDispatch()
  const courseList = useSelector(state => state.courses)

  useEffect(() => {
    if (!courseList.data)
      dispatch(fetchCourses())
  }, [dispatch, courseList.data])

  const refresh = () => {
    if (!courseList.loading)
      dispatch(fetchCourses())
  }

  if (!courseList.data) {
    return <Route path='/'>
      <LoadingPageLogo />
    </Route>
  }

  return <div className="wrapper">
    <Sidebar class="persist" />
    <Appbar />
    <div className="content">
      <main>
        <div className="container flex-fill">
          <Switch>
            <Route exact path='/'>
              <Homepage />
            </Route>
            <Route path="/course/create">
              <CreateCourse />
            </Route>
            <Route exact path="/course">
              <CourseList courseList={courseList} refresh={refresh} />
            </Route>
            <Route path="/course/:mamh">
              <CourseDetails />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  </div>
}

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.account)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    verifyToken()
      .then(res => {
        dispatch(login(res.data))
        setVerified(true)
      })
      .catch(err => {
        setVerified(true)
      })
  }, [dispatch])

  if (!user && !verified)
    return <LoadingPageLogo />

  return <>
    <Switch>
      <Route path='/login'>
        {user
          ? <Redirect to='/' />
          : <LoginPage />
        }
      </Route>
      <PrivateRoute
        path='/'
        component={MainPage}
      />
    </Switch>
  </>
}

export default App