import { IconButton, TableCell, TableRow } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { deleteCourseEvualate, updateCourseEvualate } from "../../../api/CourseAPI"
import { ErrorHelper } from "../../../utils"
import ConfirmDeleteForm from "../../common/ConfirmDeleteForm"
import { LoadingOverlayCell } from "../../common/LoadingOverlay"
import EvualateForm from "./evualateForm"

const Row = ({ data, mamh, fetch, setResponse, groups }) => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState('')
    const [hinhthuc, setHinhthuc] = useState(data.hinhthuc)
    const [phanloai, setPhanloai] = useState(data.phanloai)
    const [noidung, setNoidung] = useState(data.noidung)
    const [thoidiem, setThoidiem] = useState(data.thoidiem)
    const [congcu_kt, setCongcuKT] = useState(data.congcu_kt)
    const [tile, setTile] = useState(data.tile)
    const [cdr, setCdr] = useState(data.chuandaura)

    const handleToggleEdit = () => {
        setHinhthuc(data.hinhthuc)
        setPhanloai(data.phanloai)
        setNoidung(data.noidung)
        setThoidiem(data.thoidiem)
        setCongcuKT(data.congcu_kt)
        setCdr(data.chuandaura)
        setFlag('EDIT')
    }

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseEvualate(mamh, data.hinhthuc.replace('#', '_'))
            .then(() => {
                setResponse({
                    status: "success",
                    message: "Xóa đánh giá thành công"
                })
                fetch()
            })
            .catch(err => {
                setLoading(false)
                setResponse({
                    status: "error",
                    message: "Xóa đánh giá thất bại"
                })
            })
    }

    const handleSubmitEdit = async () => {
        setLoading('FORM')
        const updateData = {
            hinhthuc,
            thoidiem,
            phanloai,
            noidung,
            congcu_kt,
            tile,
            chuandaura: cdr
        }
        console.log(updateData)
        updateCourseEvualate(mamh, updateData)
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
            <EvualateForm
                edit
                header={`Chỉnh sửa đánh giá ${data.hinhthuc}`}
                loading={loading === 'FORM'}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                mamh={mamh}
                groups={groups}
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
                handleSubmit={handleSubmitEdit}
            />
            <ConfirmDeleteForm
                open={(flag === 'ConfirmDelete')}
                onClose={() => setFlag('')}
                onSubmit={handleSubmitDelete}
                label="Đánh giá"
                warning="Xóa đánh giá vĩnh viễn. Không thể khôi phục."
                name={data.hinhthuc}
            />
            <>
                <TableRow hover style={{ transform: "scale(1)" }}>
                    <TableCell align="center" className="border-right">
                        {data.hinhthuc}
                    </TableCell>
                    <TableCell className="break-line border-right" >
                        {data.noidung}
                    </TableCell>
                    <TableCell align="center" className="border-right">
                        {data.thoidiem}
                    </TableCell>
                    <TableCell align="center" className="border-right">
                        {data.congcu_kt}
                    </TableCell>
                    <TableCell align="center" className="break-line border-right">
                        {data.chuandaura.join('\n')}
                    </TableCell>
                    <TableCell align="center" className="border-right">
                        {data.tile}
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