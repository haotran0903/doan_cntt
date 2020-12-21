import { Divider, IconButton, Paper } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { updateCourse } from "../../../api/CourseAPI"
import { ErrorHelper } from "../../../utils"
import ContentRow from './contentRow'
import EditForm from "./editForm"

const Header = styled.h2`
    font-weight:700;
    font-size:17px;
    margin-bottom:0;
`

const ContentContainer = styled.div`
    min-width:500px;
`

const boMonParser = {
    "Tin học cơ sở": "thcs",
    "Công nghệ phần mềm": "cnpm",
    "Hệ thống thông tin": "httt",
    "Mạng và an ninh mạng": "manm"
}

const CourseInfo = ({ course }) => {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tenmh, setTenmh] = useState(course.tenmh)
    const [sotinchi, setSotinchi] = useState(course.sotinchi)
    const [bomon, setBomon] = useState(course.bomon)
    const [phanloai, setPhanloai] = useState(course.phanloai)
    const [mota, setMota] = useState(course.mota)
    const [montienquyet, setMontienquyet] = useState(null)
    const [monhoctruoc, setMonhoctruoc] = useState([])

    const courseList = useSelector(state => state.courses.data)

    const handleToggleEdit = () => {
        setTenmh(course.tenmh)
        setSotinchi(course.sotinchi)
        setBomon(course.bomon)
        setPhanloai(course.phanloai)
        setMota(course.mota)
        setMontienquyet(courseList.find(_course => _course.tenmh === course.montienquyet))
        setMonhoctruoc(course.monhoctruoc.map(_course => courseList.find(__course => __course.tenmh === _course)))
        setEdit(true)
    }

    const handleSubmitEdit = async () => {
        setLoading(true)
        updateCourse(course.mamh, {
            tenmh, sotinchi, phanloai, mota,
            mabomon: boMonParser[bomon],
            montienquyet: montienquyet ? montienquyet.mamh : null,
            monhoctruoc: monhoctruoc.map(_monhoctruoc => _monhoctruoc.mamh)
        })
            .then(() => {
                alert("Chỉnh sửa môn học thành công!")
                window.location.reload()
            })
            .catch(err => {
                alert(ErrorHelper(err))
                setLoading(false)
            })
    }

    return (
        <Paper elevation={3} className="position-relative">
            <EditForm
                header="Chỉnh sửa môn học"
                buttonLabel="Chỉnh sửa"
                open={edit}
                setClose={() => setEdit(false)}
                loading={loading}
                handleSubmit={handleSubmitEdit}
                tenmh={tenmh}
                mamh={course.mamh}
                sotinchi={sotinchi}
                bomon={bomon}
                phanloai={phanloai}
                mota={mota}
                montienquyet={montienquyet}
                monhoctruoc={monhoctruoc}
                setTenmh={setTenmh}
                setTc={setSotinchi}
                setBomon={setBomon}
                setPhanloai={setPhanloai}
                setMota={setMota}
                setMontienquyet={setMontienquyet}
                setMonhoctruoc={setMonhoctruoc}
                courseList={courseList}
            />
            <div className="px-3 light-grey-bg py-2 d-flex flex-wrap align-items-center justify-content-between">
                <Header>
                    Tổng quan môn học
                </Header>
                <IconButton onClick={handleToggleEdit}>
                    <AiOutlineEdit size="17px" />
                </IconButton>
            </div>
            <Divider />
            <div style={{ overflowX: "auto" }}>
                <ContentContainer className="px-5 pt-3 pb-2">
                    <ContentRow
                        label="Mã môn học"
                        content={course.mamh}
                    />
                    <ContentRow
                        label="Tên môn học"
                        content={course.tenmh}
                    />
                    <ContentRow
                        label="Số tín chỉ"
                        content={course.sotinchi}
                    />
                    <ContentRow
                        label="Bộ môn"
                        content={course.bomon}
                    />
                    <ContentRow
                        label="Phân loại"
                        content={course.phanloai}
                    />
                    <ContentRow
                        label="Môn tiên quyết"
                        content={course.montienquyet || "Không"}
                    />
                    <ContentRow
                        label="Môn học trước"
                        content={course.monhoctruoc.length !== 0 ? course.monhoctruoc.join(', ') : "Không"}
                    />
                    <ContentRow
                        label="Mô tả"
                        content={course.mota}
                    />
                </ContentContainer>
            </div>
        </Paper>
    )
}

export default CourseInfo