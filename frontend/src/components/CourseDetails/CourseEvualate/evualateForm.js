import { Button, Checkbox, Drawer, FormControlLabel, IconButton, Input, InputAdornment, Menu, MenuItem, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { LoadingOverlayDiv } from "../../common/LoadingOverlay";
import { getCourseOutcomeList } from "../../../api/CourseAPI";
import { ErrorHelper } from "../../../utils";
import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const GroupWrapper = styled.div`
    font-size:14px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    width:220px;
    padding:5px;
`

const EvualateForm = props => {
    const [loading, setLoading] = useState(false)
    const [outcomes, setOutcomes] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleItemClick = (value) => {
        props.setPhanloai(value)
        setAnchorEl(null);
    }

    const onCheck = (e, cdr) => {
        if (e.target.checked) {
            props.setCdr(props.cdr.concat(cdr))
        }
        else {
            props.setCdr(props.cdr.filter(_cdr => cdr !== _cdr))
        }
    }

    useEffect(() => {
        if (props.open) {
            setLoading(true)
            getCourseOutcomeList(props.mamh)
                .then(async (data) => {
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
                                            <Label for="hinhthuc">
                                                Hình thức
                                            </Label>
                                            <Input
                                                disabled={props.edit}
                                                id="hinhthuc"
                                                value={props.hinhthuc}
                                                onChange={e => props.setHinhthuc(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="phanloai">
                                                Phân loại
                                            </Label>
                                            <Input
                                                className="grey-200-bg border p-0 rounded"
                                                id="phanloai"
                                                value={props.phanloai}
                                                onChange={e => props.setPhanloai(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "p-2" }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <div>
                                                            <Tooltip title="Chọn nhóm đã có" placement="bottom-end">
                                                                <IconButton
                                                                    onClick={handleClick}
                                                                    disabled={props.groups.length === 0}
                                                                >
                                                                    <IoIosArrowDropdown />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Menu
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                anchorEl={anchorEl}
                                                                open={Boolean(anchorEl)}
                                                                onClose={handleClose}
                                                                MenuListProps={{ style: { padding: "0" } }}
                                                            >
                                                                {props.groups.map(group => (
                                                                    <MenuItem className="p-0" onClick={() => handleItemClick(group)}>
                                                                        <GroupWrapper>
                                                                            {group}
                                                                        </GroupWrapper>
                                                                    </MenuItem>
                                                                ))}
                                                            </Menu>
                                                        </div>
                                                    </InputAdornment>
                                                }
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="thoidiem">
                                                Thời Điểm
                                            </Label>
                                            <Input
                                                id="thoidiem"
                                                value={props.thoidiem}
                                                onChange={e => props.setThoidiem(e.target.value)}
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                                fullWidth
                                                disableUnderline
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="congcu_kt">
                                                Công Cụ KT
                                            </Label>
                                            <Input
                                                id="congcu_kt"
                                                value={props.congcu_kt}
                                                onChange={e => props.setCongcuKT(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="cdr">
                                                Chuẩn đầu ra
                                            </Label>
                                            <div className="row">
                                                {outcomes.map(_cdr => (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={props.cdr.find(Cdr => Cdr === _cdr)}
                                                                onChange={e => onCheck(e, _cdr)}
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
                                            <Label for="tile">
                                                Tỉ lệ
                                            </Label>
                                            <Input
                                                type="number"
                                                id="tile"
                                                value={props.tile}
                                                onChange={e => props.setTile(e.target.value)}
                                                fullWidth
                                                disableUnderline
                                                inputProps={{ className: "grey-200-bg border p-2 rounded" }}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="noidung">
                                                Nội Dung
                                            </Label>
                                            <Input
                                                id="noidung"
                                                value={props.noidung}
                                                onChange={e => props.setNoidung(e.target.value)}
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
                                disabled={!props.hinhthuc || !props.noidung || !props.congcu_kt || !props.thoidiem || !props.tile}
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

export default EvualateForm