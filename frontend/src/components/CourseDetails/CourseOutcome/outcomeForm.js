import { Button, Drawer, Input } from "@material-ui/core";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import styled from "styled-components";
import { getCourseGoalList } from "../../../api/CourseAPI";
import { ErrorHelper } from "../../../utils";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const OutcomeForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [goals, setGoals] = useState(null)
    useEffect(() => {
        if (props.open) {
            setLoading(true)
            getCourseGoalList(props.mamh)
                .then(data => {
                    props.setGoal(data[0])
                    setLoading(false)
                    setGoals(data)
                })
                .catch(err => {
                    alert(ErrorHelper(err))
                    props.setClose()
                })
        }
    }, [props.open])

    return <Drawer
        open={props.open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            {
                (loading || !goals)
                    ? <LoadingOverlayDiv />
                    : <>
                        {props.loading && <LoadingOverlayDiv />}
                        <header className="detail-form__header">
                            {props.header}
                        </header>
                        <div className="detail-form__main">
                            {
                                goals.length === 0
                                    ? <div className="flex-center flex-column h-100">
                                        <AiOutlineWarning className="text-danger" size="100px" />
                                        <h3
                                            style={{ fontSize: "25px" }}
                                            className="section-title-color font-weight-bold m-0 mb-1"
                                        >
                                            Chưa có mục tiêu
                                        </h3>
                                        <p className="text-secondary">
                                            Vui lòng tạo mục tiêu mới!
                                        </p>
                                    </div>
                                    : <>
                                        <div className="mt-2">
                                            <Label for="goal">
                                                Mục tiêu
                                            </Label>
                                            <select
                                                disabled={props.edit}
                                                className="form-control border grey-200-bg p-1"
                                                value={props.goal}
                                                onChange={e => props.setGoal(e.target.value)}
                                            >
                                                {goals.map(goal => (
                                                    <option>
                                                        {goal}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-2">
                                            <Label for="outcome">
                                                Chuẩn đầu ra HP
                                            </Label>
                                            <Input
                                                id="outcome"
                                                value={props.id}
                                                onChange={e => props.setId(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="cdio">
                                                Chuẩn đầu ra CDIO
                                            </Label>
                                            <Input
                                                id="cdio"
                                                value={props.cdio}
                                                onChange={e => props.setCdio(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="desc">
                                                Mô tả
                                            </Label>
                                            <Input
                                                id="desc"
                                                value={props.desc}
                                                onChange={e => props.setDesc(e.target.value)}
                                                rows={10}
                                                rowsMax={255}
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                                fullWidth
                                                disableUnderline
                                                multiline
                                            />
                                        </div>
                                    </>
                            }
                        </div>
                        <div className="detail-form__footer">
                            <Button
                                className="light-blue-bgcolor"
                                color="primary"
                                variant="contained"
                                onClick={props.handleSubmit}
                                disabled={!props.id || !props.desc || !props.cdio}
                            >
                                {props.edit ? "Chỉnh sửa" : "Tạo mới"}
                            </Button>
                            <Button
                                className="ml-3"
                                color="secondary"
                                variant="outlined"
                                onClick={props.setClose}
                            >
                                Đóng
                            </Button>
                        </div>
                    </>
            }
        </div>
    </Drawer>
}

export default OutcomeForm