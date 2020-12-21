import { Breadcrumbs, Button, makeStyles, Tab, Tabs } from "@material-ui/core"
import { useState } from "react"
import useBreadcrumbs, { routeConfig } from "../../hooks/useBreadcrumbs"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Link, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCourse } from "../../store/actions/courseDetail.action"
import { useEffect } from "react"
import CourseInfo from "./CourseInfo"
import CourseGoal from "./CourseGoal"
import CourseOutcome from "./CourseOutcome"
import CourseEvualate from "./CourseEvualate"
import CourseContent from "./CourseContent"
import LoadingPage from "../common/LoadingPage"
import ErrorPage from "../common/ErrorPage"

const useStyles = makeStyles({
    tabRoot: {
        minWidth: "unset",
        minHeight: "unset",
        fontSize: "15px",
        fontWeight: 700,
        padding: "0 5px",
        marginRight: "25px",
        textTransform: "none"

    },
    tabsRoot: {
        minHeight: "unset",
        marginTop: ".75rem",
        marginBottom: "20px"
    },
    flexContainer: {
        minHeight: "40px",
        '&::after': {
            content: "''",
            display: "block",
            position: "absolute",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(0,0,0,.15)",
            bottom: 0
        }
    }
})

const CourseDetails = () => {
    const [value, setValue] = useState('info')
    const mamh = useParams().mamh
    const classes = useStyles()
    const history = useHistory()
    const breadcrumbs = useBreadcrumbs(routeConfig)
    const course = useSelector(state => state.course[mamh])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!course)
            dispatch(fetchCourse(mamh))
    }, [dispatch, course, mamh])


    if (!course || course.loading)
        return <LoadingPage />

    if (course && course.error)
        return <ErrorPage />

    return <>
        <div>
            <Breadcrumbs separator={<MdKeyboardArrowRight size="1.2em" />} className="page-breadcrumb">
                {breadcrumbs.map(breadcrumb => (
                    <Link to={breadcrumb.path}>
                        {breadcrumb.name}
                    </Link>
                ))}
            </Breadcrumbs>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <h3 className="page-title">
                    {course.general.tenmh}
                </h3>
                <Button
                    size="small"
                    className="p-0 mr-2 "
                    onClick={() => history.push('/course')}
                >
                    <MdKeyboardArrowLeft size="1.2rem" />
                        Xem danh sách các môn học
                    </Button>
            </div>
            <Tabs
                scrollButtons="off"
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => setValue(newValue)}
                classes={{
                    root: classes.tabsRoot,
                    flexContainer: classes.flexContainer,
                    scroller: classes.scroller
                }}
                style={{ overflowX: "auto" }}
                variant="scrollable"
            >
                <Tab
                    value="info"
                    classes={{ root: classes.tabRoot }}
                    label="Thông tin chung" />
                <Tab
                    value="goal"
                    classes={{ root: classes.tabRoot }}
                    label="Mục tiêu" />
                <Tab
                    value="outcome"
                    classes={{ root: classes.tabRoot }}
                    label="Chuẩn đầu ra" />
                <Tab
                    value="evualate"
                    classes={{ root: classes.tabRoot }}
                    label="Đánh giá" />
                <Tab
                    value="content"
                    classes={{ root: classes.tabRoot }}
                    label="Nội dung" />
            </Tabs>
        </div>
        {value === 'info' && <CourseInfo course={course.general} />}
        {value === 'goal' && <CourseGoal mamh={mamh} />}
        {value === 'outcome' && <CourseOutcome mamh={mamh} />}
        {value === 'evualate' && <CourseEvualate mamh={mamh} />}
        {value === 'content' && <CourseContent mamh={mamh} />}
    </>
}

export default CourseDetails