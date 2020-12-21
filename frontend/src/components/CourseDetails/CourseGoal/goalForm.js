import { Button, Drawer, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const GoalForm = props => {
    return <Drawer
        open={props.open}
        anchor="right"
    >
        <div className="detail-form__wrapper">
            {props.loading && <LoadingOverlayDiv />}
            <header className="detail-form__header">
                {props.header}
            </header>
            <div className="detail-form__main">
                <div className="mt-2">
                    <Label for="goal">
                        Mục tiêu
                    </Label>
                    <Input
                        id="goal"
                        disabled={props.edit}
                        value={props.id}
                        onChange={e => props.setId(e.target.value)}
                        fullWidth
                        disableUnderline
                        inputProps={{
                            style: {
                                fontFamily: "Open Sans"
                            },
                            className: "grey-200-bg border p-2 rounded"
                        }}
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
            </div>
            <div className="detail-form__footer">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={props.handleSubmit}
                    disabled={!props.id || !props.desc}
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
        </div>
    </Drawer>
}

export default GoalForm