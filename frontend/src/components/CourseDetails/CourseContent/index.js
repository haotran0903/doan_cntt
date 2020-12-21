import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseContent } from "../../../api/CourseAPI"
import { fetchContent } from "../../../store/actions/courseContent.action"
import { ErrorHelper } from "../../../utils"
import LoadingRows from "../../common/LoadingRows"
import CreateNew from "../CreateNew"
import ErrorRow from "../../common/ErrorRow"
import Row from "./row"
import EmptyRow from "../../common/EmptyRow"
import ContentForm from './contentForm'

const CourseContent = ({ mamh }) => {
    const [create, setCreate] = useState(false)
    const [tuan, setTuan] = useState('')
    const [chuong, setChuong] = useState('')
    const [ndgd_trenlop, setNdgd_trenlop] = useState('')
    const [PPGD, setPPGD] = useState('')
    const [nd_onha, setNd_onha] = useState('')
    const [cdr, setCdr] = useState([])
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    const contents = useSelector(state => state.course[mamh].content)
    const data = useSelector(state => state.course[mamh].content.data)
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchContent(mamh))
    }
    const handleToggleCreate = () => {
        setTuan('')
        setChuong('')
        setNdgd_trenlop('')
        setPPGD('')
        setNd_onha('')
        setCdr([])
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setLoading(true)
        createCourseContent(mamh, {
            tuan,
            chuong: chuong.trim(),
            nd_trenlop: ndgd_trenlop + '=====' + PPGD,
            nd_onha,
            chuandaura: cdr
        })
            .then(() => {
                fetch()
                setCreate(false)
                setLoading(false)
                setResponse({
                    status: "success",
                    message: `Tạo nội dung thành công!`
                })
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: ErrorHelper(err)
                })
            })
    }

    useEffect(() => {
        if (!contents.data)
            dispatch(fetchContent(mamh))
    }, [dispatch, mamh, contents.data])



    return <>
        <Snackbar
            open={response}
            onClose={() => setResponse('')}
        >
            <Alert
                onClose={() => setResponse('')}
                severity={response.status}
                className="mx-3 mb-3"
                style={{ minWidth: "250px" }}
            >
                {response.message}
            </Alert>
        </Snackbar>
        <ContentForm
            header="Tạo nội dung"
            open={create}
            setClose={() => setCreate(false)}
            mamh={mamh}
            tuan={tuan}
            chuong={chuong}
            nd_onha={nd_onha}
            ndgd_trenlop={ndgd_trenlop}
            PPGD={PPGD}
            cdr={cdr}
            setTuan={setTuan}
            setChuong={setChuong}
            setNd_onha={setNd_onha}
            setNdgd_trenlop={setNdgd_trenlop}
            setPPGD={setPPGD}
            setCdr={setCdr}
            handleSubmit={handleSubmitCreate}
            loading={loading}
        />
        <TableContainer className="light-grey-bg" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                open={create}
                pending={contents.pending}
                handleSubmitCreate={handleSubmitCreate}
                handleToggleCreate={handleToggleCreate}
                label="Tạo nội dung"
            />
            <Table style={{ minWidth: "950px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="100px" align="center" size="small">
                            Tuần
                        </TableCell>
                        <TableCell align="center" size="small">
                            Nội dung
                        </TableCell>
                        <TableCell width="200px" align="center" size="small">
                            Chuẩn đầu ra HP
                        </TableCell>
                        <TableCell width="125px" align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="bg-white">
                    {
                        contents.pending
                            ? <LoadingRows col={4} />
                            : contents.error
                                ? <ErrorRow refresh={fetch} />
                                : contents.data && data.length !== 0
                                    ? data.map(row => (
                                        <Row fetch={fetch} setResponse={setResponse} data={row} mamh={mamh} key={row.muctieu} />
                                    ))
                                    : <EmptyRow
                                        header="Chưa có nội dung"
                                        text={(<>
                                            Vui lòng&nbsp;
                                        <span onClick={() => setCreate(true)} style={{ cursor: "pointer" }} class="btn-link">
                                                tạo mới!
                                        </span>
                                        </>)}
                                    />
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>
}

export default CourseContent