import { IconButton, TableCell, TableRow } from "@material-ui/core"
import { useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { deleteCourseGoal, updateCourseGoal } from "../../../api/CourseAPI"
import { deleteGoalSuccess, updateGoalSuccess } from "../../../store/actions/courseGoal.action"
import { ErrorHelper } from "../../../utils"
import ConfirmDeleteForm from "../../common/ConfirmDeleteForm"
import { LoadingOverlayCell } from "../../common/LoadingOverlay"
import GoalForm from "./goalForm"

const Row = ({ row, mamh, setResponse }) => {
    const [loading, setLoading] = useState('')
    const [flag, setFlag] = useState('')
    const [goal, setGoal] = useState(row.muctieu)
    const [desc, setDesc] = useState(row.mota)
    const [outcome, setOutcome] = useState(row.cdr_ctdt)

    const dispatch = useDispatch()

    const handleSubmitDelete = async () => {
        setLoading('ROW')
        setFlag('')
        deleteCourseGoal(mamh, row.muctieu)
            .then(() => {
                dispatch(deleteGoalSuccess(mamh, row.muctieu))
                setResponse({
                    status: "success",
                    message: "Xóa mục tiêu thành công!"
                })
            })
            .catch(err => {
                setLoading('')
                setResponse({
                    status: "error",
                    message: ErrorHelper(err)
                })
            })
    }

    const handleSubmitEdit = async () => {
        setLoading('FORM')
        const data = {
            muctieu: goal,
            mota: desc,
            cdr_ctdt: outcome
        }
        updateCourseGoal(mamh, row.muctieu, data)
            .then(() => {
                dispatch(updateGoalSuccess(mamh, row.muctieu, data))
                setLoading('')
                setResponse({
                    status: "success",
                    message: `Chỉnh sửa mục tiêu ${goal} thành công!`
                })
                setFlag('')
            })
            .catch(err => {
                setLoading('')
                setResponse({
                    status: "error",
                    message: `Chỉnh sửa mục tiêu ${goal} thất bại! ${ErrorHelper(err)}`
                })
            })
    }

    const handleToggleDelete = () => {
        setFlag('ConfirmDelete')
    }

    return (
        <>
            <GoalForm
                edit
                header={`Chỉnh sửa mục tiêu ${row.muctieu}`}
                open={flag === "EDIT"}
                setClose={() => setFlag("")}
                id={goal}
                desc={desc}
                outcome={outcome}
                setId={setGoal}
                setDesc={setDesc}
                setOutcome={setOutcome}
                loading={loading === 'FORM'}
                handleSubmit={handleSubmitEdit}
            />
            <ConfirmDeleteForm
                open={(flag === 'ConfirmDelete')}
                onClose={() => setFlag('')}
                onSubmit={handleSubmitDelete}
                label="Mục tiêu"
                warning="Xóa mục tiêu vĩnh viễn. Không thể khôi phục."
                name={row.muctieu}
            />
            <TableRow hover style={{ transform: "scale(1)" }}>
                <TableCell align="center" >
                    {row.muctieu}
                </TableCell>
                <TableCell className="break-line" >
                    {row.mota}
                </TableCell>
                <TableCell align="center">
                    {row.cdr_ctdt}
                </TableCell>
                <TableCell align='center' className="px-0">
                    <div className="action-button">
                        <IconButton
                            className="text-primary p-2"
                            onClick={() => setFlag('EDIT')}
                        >
                            <AiOutlineEdit size="20px" />
                        </IconButton>
                        <IconButton
                            className="text-danger p-2"
                            onClick={handleToggleDelete}
                        >
                            <BsTrash size="20px" />
                        </IconButton>
                    </div>
                </TableCell>
                {loading === 'ROW' && <LoadingOverlayCell />}
            </TableRow>
        </>
    )
}

export default Row