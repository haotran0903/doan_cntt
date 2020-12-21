import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseOutcome } from "../../../api/CourseAPI"
import { fetchOutcome } from "../../../store/actions/courseOutcome.action"
import { ErrorHelper } from "../../../utils"
import EmptyRow from "../../common/EmptyRow"
import ErrorRow from "../../common/ErrorRow"
import LoadingRows from "../../common/LoadingRows"
import CreateNew from "../CreateNew"
import OutcomeForm from "./outcomeForm"
import Row from "./row"

const CourseOutcome = ({ mamh }) => {
    const [create, setCreate] = useState(false)
    const [ID, setID] = useState('')
    const [goal, setGoal] = useState('')
    const [desc, setDesc] = useState('')
    const [cdio, setCdio] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    const outcomes = useSelector(state => state.course[mamh].outcome)
    const data = useSelector(state => state.course[mamh].outcome.data)
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchOutcome(mamh))
    }

    const handleToggleCreate = () => {
        setID('')
        setGoal('')
        setDesc('')
        setCdio('')
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setLoading(true)
        createCourseOutcome(mamh, {
            cdr: ID,
            mota: desc,
            muctieu: goal,
            cdio: cdio.split(' ')
        })
            .then(() => {
                fetch()
                setCreate(false)
                setLoading(false)
                setResponse({
                    status: "success",
                    message: `Tạo môn học thành công!`
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
        if (!outcomes.data)
            dispatch(fetchOutcome(mamh))
    }, [dispatch, mamh, outcomes.data])

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
        <OutcomeForm
            header="Tạo chuẩn đầu ra"
            open={create}
            setClose={() => setCreate(false)}
            mamh={mamh}
            goal={goal}
            id={ID}
            cdio={cdio}
            desc={desc}
            setGoal={setGoal}
            setId={setID}
            setCdio={setCdio}
            setDesc={setDesc}
            handleSubmit={handleSubmitCreate}
            loading={loading}
        />
        <TableContainer className="light-grey-bg" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                open={create}
                pending={outcomes.pending}
                handleSubmitCreate={handleSubmitCreate}
                handleToggleCreate={handleToggleCreate}
                label="Tạo chuẩn đầu ra"
            />
            <Table style={{ minWidth: "700px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="100px" align="center">
                            Mục tiêu
                        </TableCell>
                        <TableCell width="110px" align="center">
                            Chuẩn đầu ra HP
                        </TableCell>
                        <TableCell align="center">
                            Mô tả
                        </TableCell>
                        <TableCell width="150px" align="center">
                            Chuẩn đầu ra CDIO
                        </TableCell>
                        <TableCell width="120px" className="px-0" align="center">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="bg-white">
                    {
                        outcomes.pending
                            ? <LoadingRows col={5} />
                            : outcomes.error
                                ? <ErrorRow refresh={fetch} />
                                : outcomes.data && data.length !== 0
                                    ? data.map(data => (
                                        <>
                                            <TableRow hover style={{ transform: "scale(1)" }}>
                                                <TableCell
                                                    align="center"
                                                    rowSpan={data.chuandaura.length}
                                                    key={data.muctieu}
                                                    className="border-right"
                                                >
                                                    {data.muctieu}
                                                </TableCell>
                                                <Row setResponse={setResponse} fetch={fetch} muctieu={data.muctieu} data={data.chuandaura[0]} mamh={mamh} key={data.chuandaura[0].cdr} />
                                            </TableRow>
                                            {data.chuandaura.map((cdrData, index) => (
                                                index !== 0 &&
                                                <TableRow hover style={{ transform: "scale(1)" }}>
                                                    <Row setResponse={setResponse} fetch={fetch} muctieu={data.muctieu} data={cdrData} mamh={mamh} key={cdrData.cdr} />
                                                </TableRow>
                                            ))}
                                        </>
                                    ))
                                    : <EmptyRow
                                        header="Chưa có chuẩn đầu ra"
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

export default CourseOutcome