import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../store/actions/courses.action";
import ConfirmForm from "../common/ConfirmDeleteForm";

const { TableRow, TableCell, IconButton, Tooltip } = require("@material-ui/core");
const { AiFillInfoCircle } = require("react-icons/ai");
const { BsTrash } = require("react-icons/bs");
const { Link } = require("react-router-dom");

const CourseRow = (props) => {
    const [deleting, setDeleting] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const dispatch = useDispatch()
    const row = props.row

    const handleDelete = () => {
        setDeleteDialog(true)
    }

    const onDelete = async () => {
        setDeleting(true)
        dispatch(deleteCourse(row.mamh))
    }

    return (
        <>
            <ConfirmForm
                open={deleteDialog}
                label="Môn học"
                warning="Xóa môn học vĩnh viễn. Không thể khôi phục."
                name={row.tenmh}
                onClose={() => setDeleteDialog(false)}
                loading={deleting}
                onSubmit={onDelete}
            />
            <TableRow
                hover
                key={row.mamh}
                style={{ transform: "scale(1)" }}
                className="position-relative">
                <TableCell component="th" scope="row">
                    {row.mamh}
                </TableCell>
                <TableCell>{row.tenmh}</TableCell>
                <TableCell align="center">{row.sotinchi}</TableCell>
                <TableCell>{row.bomon}</TableCell>
                <TableCell>{row.phanloai}</TableCell>
                <TableCell align="center">
                    <Tooltip title={row.chuandaura || "Không có"}>
                        <IconButton className="p-2">
                            <BiShow size="24px" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align='center'>
                    <IconButton className="p-2 action-button">
                        <Link style={{ lineHeight: "1em" }} to={`/course/${row.mamh}`}>
                            <AiFillInfoCircle size="24px" />
                        </Link>
                    </IconButton>
                    <IconButton
                        className="p-2 text-danger action-button"
                        onClick={() => handleDelete(row.mamh)}
                    >
                        <BsTrash
                            size="24px"
                        />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}

export default CourseRow