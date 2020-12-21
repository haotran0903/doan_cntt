import { IconButton, Table, TableCell, TableRow } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { deleteCourseContent, updateCourseContent } from "../../../api/CourseAPI"
import ContentForm from "./contentForm"
import ConfirmDeleteForm from "../../common/ConfirmDeleteForm"
import { LoadingOverlayCell } from "../../common/LoadingOverlay";
import styled from "styled-components"
import { ErrorHelper } from "../../../utils"

const Header = styled.div`
    font-size:15px;
`

const Row = ({ data, mamh, fetch, setResponse }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [tuan, setTuan] = useState('')
    const [chuong, setChuong] = useState('')
    const [ndgd_trenlop, setNdgd_trenlop] = useState('')
    const [PPGD, setPPGD] = useState('')
    const [nd_onha, setNd_onha] = useState('')
    const [cdr, setCdr] = useState([])

    const handleToggleEdit = () => {
        setTuan(data.tuan)
        setChuong(data.chuong)
        setNdgd_trenlop(data.nd_trenlop.split('=====')[0])
        setPPGD(data.nd_trenlop.split('=====')[1])
        setNd_onha(data.nd_onha)
        setCdr(data.chuandaura)
        setFlag('EDIT')
    }

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseContent(mamh, { chuong: data.chuong })
            .then(() => {
                fetch()
                setResponse({
                    status: "success",
                    message: "Xóa nội dung thành công"
                })
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: "Xóa nội dung thất bại"
                })
            })
    }

    const handleSubmitEdit = async () => {
        setLoading('FORM')
        const updateData = {
            tuan,
            chuong,
            nd_trenlop: ndgd_trenlop + '=====' + PPGD,
            nd_onha,
            chuandaura: cdr
        }
        updateCourseContent(mamh, updateData)
            .then(() => {
                setLoading(false)
                setResponse({
                    status: "success",
                    message: "Chỉnh sửa đánh giá thành công!"
                })
                fetch()
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: `Chỉnh sửa đánh giá thất bại ${ErrorHelper(err)}`
                })
            })
    }

    const handleToggleDelete = () => {
        setFlag('ConfirmDelete')
    }

    return (
        <>
            <ContentForm
                edit
                header={`Chỉnh sửa đánh giá`}
                loading={loading === 'FORM'}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
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
                handleSubmit={handleSubmitEdit}

            />
            <ConfirmDeleteForm
                open={(flag === 'ConfirmDelete')}
                onClose={() => setFlag('')}
                onSubmit={handleSubmitDelete}
                label="Đánh giá"
                warning="Xóa đánh giá vĩnh viễn. Không thể khôi phục."
                name={data.chuong}
            />
            <>
                <TableRow hover style={{ transform: "scale(1)" }}>
                    <TableCell className="border-right" align="center">
                        {data.tuan}
                    </TableCell>
                    <TableCell colSpan={2} className="center border-right p-0">
                        <Table>
                            <TableRow>
                                <TableCell className="border-right">
                                    <strong>{data.chuong}</strong>
                                </TableCell>
                                <TableCell width="200px" align="center" ></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border-right">
                                    <Header className="mb-3">
                                        <strong><em>Tóm tắt các ND và PPGD chính trên lớp:</em></strong>
                                    </Header>
                                    <div className="mt-2 pl-1">
                                        <strong>Nội dung giáo dục chính trên lớp:</strong>
                                    </div>
                                    <div className="break-line pl-1">
                                        {data.nd_trenlop.split('=====')[0]}
                                    </div>
                                    <div className="mt-2 pl-1">
                                        <strong>Tóm tắt các PPGD chính:</strong>
                                    </div>
                                    <div className="break-line pl-1">
                                        {data.nd_trenlop.split('=====')[1]}
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: "200px" }} width="200px" align="center" className="break-line">
                                    {data.chuandaura.filter(cdr => cdr.trenlop_onha === 'tl').map(ele => ele.cdr).join('\n')}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border-right">
                                    <Header className="mb-2">
                                        <strong><em>B/ Các nội dung cần tự học tại nhà:</em></strong>
                                    </Header>
                                    <div className="break-line pl-1">
                                        {data.nd_onha}
                                    </div>
                                </TableCell>
                                <TableCell align="center" className="break-line">
                                    {data.chuandaura.filter(cdr => cdr.trenlop_onha === 'on').map(ele => ele.cdr).join('\n')}
                                </TableCell>

                            </TableRow>
                        </Table>
                    </TableCell>
                    <TableCell align='center' className="px-0">
                        <div className="action-button">
                            <IconButton
                                className="text-primary p-2"
                                onClick={handleToggleEdit}
                            >
                                <AiOutlineEdit size="24px" />
                            </IconButton>
                            <IconButton
                                className="text-danger p-2"
                                onClick={handleToggleDelete}
                            >
                                <BsTrash size="24px" />
                            </IconButton>
                        </div>
                    </TableCell>
                    {loading === 'ROW' && <LoadingOverlayCell />}
                </TableRow>
            </>
        </>
    )
}

export default Row