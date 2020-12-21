import { Button, Checkbox, Drawer, FormControlLabel, Input } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";
import { getCourseOutcomeList } from "../../../api/CourseAPI";
import { ErrorHelper } from "../../../utils";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const ContentForm = props => {

    const [loading, setLoading] = useState(false)
    const [outcomes, setOutcomes] = useState(null)

    const onCheck = (e, cdr, group) => {
        if (e.target.checked) {
            props.setCdr(props.cdr.concat({ cdr, trenlop_onha: group }))
        }
        else {
            props.setCdr(props.cdr.filter(ele => ele.trenlop_onha !== group || ele.cdr !== cdr))
        }
    }

    useEffect(() => {
        if (props.open) {
            setLoading(true)
            getCourseOutcomeList(props.mamh)
                .then(data => {
                    setLoading(false)
                    setOutcomes(data)
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
                (loading || !outcomes)
                    ? <LoadingOverlayDiv />
                    : <>
                        {props.loading && <LoadingOverlayDiv />}
                        <header className="detail-form__header">
                            {props.header}
                        </header>
                        <div className="detail-form__main">
                            {
                                outcomes.length === 0
                                    ? <div className="flex-center flex-column h-100">
                                        <AiOutlineWarning className="text-danger" size="100px" />
                                        <h3
                                            style={{ fontSize: "25px" }}
                                            className="section-title-color font-weight-bold m-0 mb-1"
                                        >
                                            Chưa có chuẩn đầu ra
                                        </h3>
                                        <p className="text-secondary">
                                            Vui lòng tạo chuẩn đầu ra mới!
                                        </p>
                                    </div>
                                    : <>
                                        <div className="mt-2">
                                            <Label for="chuong">
                                                Chương
                                        </Label>
                                            <Input
                                                id="chuong"
                                                disabled={props.edit}
                                                value={props.chuong}
                                                onChange={e => props.setChuong(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="tuan">
                                                Tuần
                                            </Label>
                                            <Input
                                                id="tuan"
                                                value={props.tuan}
                                                onChange={e => props.setTuan(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="ndgd_trenlop">
                                                Nội dung GD chính trên lớp
                                            </Label>
                                            <Input
                                                id="ndgd_trenlop"
                                                value={props.ndgd_trenlop}
                                                onChange={e => props.setNdgd_trenlop(e.target.value)}
                                                rows={6}
                                                rowsMax={255}
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                                fullWidth
                                                disableUnderline
                                                multiline
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="ppgd">
                                                Phương pháp giáo dục chính
                                            </Label>
                                            <Input
                                                id="ppgd"
                                                value={props.PPGD}
                                                onChange={e => props.setPPGD(e.target.value)}
                                                rows={6}
                                                rowsMax={255}
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                                fullWidth
                                                disableUnderline
                                                multiline
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="cdr_trenlop">
                                                Chuẩn đầu ra nội dung trên lớp
                                            </Label>
                                            <div className="row">
                                                {outcomes.map(_cdr => (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={props.cdr.find(cdr => cdr.trenlop_onha === "tl" && cdr.cdr === _cdr)}
                                                                onChange={e => onCheck(e, _cdr, "tl")}
                                                                name={_cdr}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={_cdr}
                                                        className="m-0 col-6"
                                                    />

                                                ))
                                                }
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Label for="nd_onha">
                                                Nội dung tự học ở nhà
                                            </Label>
                                            <Input
                                                id="nd_onha"
                                                value={props.nd_onha}
                                                onChange={e => props.setNd_onha(e.target.value)}
                                                rows={10}
                                                rowsMax={255}
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                                fullWidth
                                                disableUnderline
                                                multiline
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="cdr_trenlop">
                                                Chuẩn đầu ra nội dung ở nhà
                                            </Label>
                                            <div className="row">
                                                {outcomes.map(_cdr => (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={props.cdr.find(cdr => cdr.trenlop_onha === "on" && cdr.cdr === _cdr)}
                                                                onChange={e => onCheck(e, _cdr, "on")}
                                                                name={_cdr}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={_cdr}
                                                        className="m-0 col-6"
                                                    />

                                                ))
                                                }
                                            </div>
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
                                disabled={!props.chuong || !props.tuan || !props.ndgd_trenlop || !props.PPGD || !props.nd_onha || props.cdr.length === 0}
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

export default ContentForm