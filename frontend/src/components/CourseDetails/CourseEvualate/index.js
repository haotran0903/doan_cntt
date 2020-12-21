import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCourseEvualate } from "../../../api/CourseAPI"
import { fetchEvualate } from "../../../store/actions/courseEvualate.action"
import { ErrorHelper } from "../../../utils"
import LoadingRows from "../../common/LoadingRows"
import CreateNew from "../CreateNew"
import ErrorRow from "../../common/ErrorRow"
import Row from "./row"
import EvualateForm from './evualateForm'
import EmptyRow from "../../common/EmptyRow"

const CountRate = (data) => {
    return data.reduce((acc, cur) => {
        return acc + parseInt(cur.tile)
    }, 0)
}

const CourseEvualate = ({ mamh }) => {
    const [create, setCreate] = useState(false)
    const [hinhthuc, setHinhthuc] = useState('')
    const [phanloai, setPhanloai] = useState('')
    const [noidung, setNoidung] = useState('')
    const [thoidiem, setThoidiem] = useState('')
    const [congcu_kt, setCongcuKT] = useState('')
    const [tile, setTile] = useState('')
    const [cdr, setCdr] = useState([])
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    const evualates = useSelector(state => state.course[mamh].evualate)
    let data = useSelector(state => state.course[mamh].evualate.data)
    if (data && data.length > 0) {
        data = data.reduce((acc, cur) => {
            const newValue = { ...acc }
            if (!acc.hasOwnProperty(cur.phanloai)) {
                newValue[cur.phanloai] = []
            }
            newValue[cur.phanloai].push({ ...cur })
            return newValue
        }, {})
    }
    const dispatch = useDispatch()

    const fetch = () => {
        dispatch(fetchEvualate(mamh))
    }

    const handleToggleCreate = () => {
        setHinhthuc('')
        setPhanloai('')
        setNoidung('')
        setThoidiem('')
        setCongcuKT('')
        setTile('')
        setCdr([])
        setCreate(true)
    }

    const handleSubmitCreate = () => {
        setLoading(true)
        createCourseEvualate(mamh, {
            hinhthuc: hinhthuc.trim(),
            phanloai,
            noidung,
            thoidiem,
            congcu_kt,
            tile,
            chuandaura: cdr
        })
            .then(() => {
                setCreate(false)
                setLoading(false)
                setResponse({
                    status: "success",
                    message: `Tạo đánh giá thành công!`
                })
                fetch()
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
        if (!evualates.data)
            dispatch(fetchEvualate(mamh))
    }, [dispatch, mamh, evualates.data])

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
        <EvualateForm
            header="Tạo đánh giá"
            open={create}
            setClose={() => setCreate(false)}
            fetch={fetch}
            mamh={mamh}
            groups={(!data || data.length === 0) ? [] : Object.keys(data)}
            hinhthuc={hinhthuc}
            phanloai={phanloai}
            noidung={noidung}
            thoidiem={thoidiem}
            congcu_kt={congcu_kt}
            cdr={cdr}
            tile={tile}
            setHinhthuc={setHinhthuc}
            setPhanloai={setPhanloai}
            setNoidung={setNoidung}
            setThoidiem={setThoidiem}
            setCongcuKT={setCongcuKT}
            setCdr={setCdr}
            setTile={setTile}
            handleSubmit={handleSubmitCreate}
            loading={loading}
        />
        <TableContainer className="light-grey-bg" component={Paper}>
            <CreateNew
                fetch={fetch}
                setOpen={setCreate}
                open={create}
                pending={evualates.pending}
                handleSubmitCreate={handleSubmitCreate}
                handleToggleCreate={handleToggleCreate}
                label="Tạo đánh giá"
            />
            <Table style={{ minWidth: "950px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell width="120px" align="center">
                            Hình thức KT
                    </TableCell>
                        <TableCell align="center">
                            Nội dung
                    </TableCell>
                        <TableCell width="150px" align="center">
                            Thời điểm
                    </TableCell>
                        <TableCell width="150px" align="center">
                            Công cụ KT
                    </TableCell>
                        <TableCell width="150px" align="center">
                            Chuẩn đầu ra KT
                    </TableCell>
                        <TableCell width="80px" align="center">
                            Tỉ lệ (%)
                    </TableCell>
                        <TableCell width="125px" align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="bg-white">
                    {
                        evualates.pending
                            ? <LoadingRows col={7} />
                            : evualates.error
                                ? <ErrorRow refresh={fetch} />
                                : evualates.data && data.length !== 0
                                    ? Object.keys(data).map(phanloai => (
                                        <>
                                            <TableRow>
                                                <TableCell className="text-center border-right" colSpan={4}>
                                                    <strong>{phanloai}</strong>
                                                </TableCell>
                                                <TableCell className="border-right"></TableCell>
                                                <TableCell className="text-center">
                                                    <strong>{CountRate(data[phanloai])}</strong>
                                                </TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            {data[phanloai].map(row => (
                                                <Row
                                                    setResponse={setResponse}
                                                    fetch={fetch}
                                                    data={row}
                                                    mamh={mamh}
                                                    key={row.muctieu}
                                                    groups={(!data || data.length === 0) ? [] : Object.keys(data)} />
                                            ))}
                                        </>
                                    ))
                                    : <EmptyRow
                                        header="Chưa có đánh giá"
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

export default CourseEvualate