import { Backdrop, Breadcrumbs, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Snackbar } from "@material-ui/core"
import { useState } from "react"
import useBreadcrumbs, { routeConfig } from "../../hooks/useBreadcrumbs"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Link, useHistory } from "react-router-dom"
import { createCourse } from "../../api/CourseAPI"
import { CreateCourseForm } from "./form"
import { Alert, AlertTitle } from '@material-ui/lab'
import { ErrorHelper } from "../../utils"
import { useSelector } from "react-redux"

const CreateCourse = () => {
    const initialPostingState = {
        isPosting: false,
        response: {
            status: "",
            message: ""
        }
    }

    const history = useHistory()
    const [mamh, setMamh] = useState('')
    const [tenmh, setTenmh] = useState('')
    const [sotinchi, setsotinchi] = useState('')
    const [phanloai, setPhanloai] = useState('')
    const [mota, setMota] = useState('')
    const [bomon, setBomon] = useState('')
    const [montienquyet, setMontienquyet] = useState(null)
    const [monhoctruoc, setMonhoctruoc] = useState([])
    const [posting, setPosting] = useState(initialPostingState)

    const courseList = useSelector(state => state.courses.data)

    const clearAllState = () => {
        setMamh('')
        setTenmh('')
        setsotinchi('')
        setPhanloai('')
        setMota('')
        setBomon('')
        setMontienquyet(null)
        setMonhoctruoc([])
    }

    const [errors, setErrors] = useState({
        mamh: '', tenmh: '', sotinchi: '', phanloai: '', bomon: ''
    })
    const breadcrumbs = useBreadcrumbs(routeConfig)

    const validateForm = () => {
        const error = {}
        if (mamh === '')
            error.mamh = 'Nhập mã môn học'
        if (tenmh === '')
            error.tenmh = 'Nhập tên môn học'
        if (phanloai === '')
            error.phanloai = 'Chọn phân loại môn'
        if (bomon === '')
            error.bomon = 'Chọn bộ môn'
        if (sotinchi === '')
            error.sotinchi = 'Nhập số tín chỉ'
        setErrors({ ...error })
        if (Object.keys(error).length === 0)
            return true
        else
            return false
    }

    const handleDialogClose = () => {
        setPosting(initialPostingState)
    }

    const handleSubmit = async (e) => {
        if (!validateForm() || posting.isPosting)
            return
        setPosting({ ...initialPostingState, isPosting: true })
        const data = {
            mamh, tenmh, sotinchi, phanloai, bomon, mota,
            montienquyet: montienquyet ? montienquyet.mamh : null,
            monhoctruoc: monhoctruoc.map(monhoctruoc => monhoctruoc.mamh)
        }
        try {
            await createCourse(data)
            setPosting({
                isPosting: false,
                response: {
                    status: "success",
                    message: "Tạo môn học thành công!"
                }
            })
            clearAllState()
        }
        catch (err) {
            setPosting({
                isPosting: false,
                response: {
                    status: "error",
                    message: ErrorHelper(err)
                }
            })
        }
    }

    return <>
        <Backdrop open={posting.isPosting} style={{ zIndex: 2000 }}>
            <CircularProgress className="text-white" />
        </Backdrop>
        <Snackbar
            open={posting.response.status}
            onClose={handleDialogClose}
        >
            <Alert
                onClose={handleDialogClose}
                severity={posting.response.status}
                className="mx-3 mb-3"
                style={{ minWidth: "250px" }}
            >
                <AlertTitle className="text-capitalize font-weight-bold">
                    {posting.response.status}
                </AlertTitle>
                {posting.response.message}
            </Alert>
        </Snackbar>
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
                    Thêm môn học mới
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
            <hr />
        </div>
        <Card className="feature-card">
            <CardHeader
                title="Nhập thông tin môn học"
                className="border-bottom light-grey-bg"
                disableTypography
            />
            <CardContent className="border-bottom overflow-auto">
                <CreateCourseForm
                    props={{
                        mamh, setMamh, tenmh, setTenmh, sotinchi, setsotinchi,
                        phanloai, setPhanloai, mota, setMota, bomon, setBomon,
                        errors, setErrors, montienquyet, setMontienquyet, monhoctruoc,
                        setMonhoctruoc, courseList
                    }}
                />
            </CardContent>
            <CardActions className="justify-content-end light-grey-bg">
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Tạo môn học mới
                    </Button>
            </CardActions>
        </Card>
    </>
}

export default CreateCourse