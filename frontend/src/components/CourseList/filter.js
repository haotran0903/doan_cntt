import { Button, IconButton, Input, InputAdornment, Popover, Tooltip } from '@material-ui/core'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsFilter } from 'react-icons/bs'
import { IoMdRefresh } from 'react-icons/io'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const InputLabel = styled.label`
    font-size: 13px;
    font-weight:bold;
`

const Select = styled.select`
&:focus{
     outline:none;
     box-shadow:none;
 }
 font-size:13px;
 border-radius:10px;
`
const Title = styled.p`
    font-size:20px;
    font-weight:bold;
`

const FilterBar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleChangeSearch = e => {
        props.setFilter({
            ...props.filter,
            mamh: e.target.value,
            tenmh: e.target.value
        })
        props.setPage(0)
    }

    const handleChangeSotinchi = e => {
        props.setFilter({
            ...props.filter,
            sotinchi: e.target.value
        })
        props.setPage(0)
    }

    const handleChangeBomon = e => {
        props.setFilter({
            ...props.filter,
            bomon: e.target.value
        })
        props.setPage(0)
    }

    const handleChangePhanloai = e => {
        props.setFilter({
            ...props.filter,
            phanloai: e.target.value
        })
        props.setPage(0)
    }

    const handleChangeCdio = e => {
        props.setFilter({
            ...props.filter,
            cdio: e.target.value
        })
        props.setPage(0)
    }

    return <div
        style={{ minWidth: "920px" }}
        className="d-flex pl-2 justify-content-between align-items-center"
    >
        <div className="flex-fill d-flex align-items-center mr-4">
            <button
                onClick={e => setAnchorEl(e.currentTarget)}
                className="btn text-secondary p-0 mr-3">
                <BsFilter size="35px" />
            </button>
            <Input
                disableUnderline
                placeholder="Tìm kiếm theo tên hoặc mã môn học"
                startAdornment={
                    <InputAdornment position="start">
                        <BiSearch />
                    </InputAdornment>
                }
                className="form-control rounded-pill"
                value={props.filter.tenmh}
                onChange={handleChangeSearch}
            />
            <Popover
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >
                <div style={{ width: "300px" }} className="py-2 px-3">
                    <Title className="border-bottom">Bộ lọc</Title>
                    <div className="border-bottom">
                        <div className="mb-2">
                            <InputLabel>Số tín chỉ</InputLabel>
                            <Select
                                className='bg-light form-control'
                                value={props.filter.sotinchi}
                                onChange={handleChangeSotinchi}
                            >
                                <option selected value="">Tất cả</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </Select>
                        </div>
                        <div className="mb-2">
                            <InputLabel>Bộ môn</InputLabel>
                            <Select
                                className='bg-light form-control'
                                value={props.filter.bomon}
                                onChange={handleChangeBomon}
                            >
                                <option selected value="">Tất cả</option>
                                <option>Tin học cơ sở</option>
                                <option>Công nghệ phần mềm</option>
                                <option>Hệ thống thông tin</option>
                                <option>Mạng và an ninh mạng</option>
                            </Select>
                        </div>
                        <div className="mb-2">
                            <InputLabel>Phân loại</InputLabel>
                            <Select
                                className='bg-light form-control'
                                value={props.filter.phanloai}
                                onChange={handleChangePhanloai}
                            >
                                <option selected value="">Tất cả</option>
                                <option>Tùy chọn</option>
                                <option>Bắt buộc</option>
                            </Select>
                        </div>
                        <div className="mb-2">
                            <InputLabel for="cdio">CDIO</InputLabel>
                            <Input
                                id="cdio"
                                value={props.filter.cdio}
                                onChange={handleChangeCdio}
                                fullWidth
                                disableUnderline
                                inputProps={{ className: "bg-light border p-2 rounded" }}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <Button
                            className="ml-2 text-danger"
                            onClick={() => props.setFilter(props.initialFilter)}
                        >
                            Phục hồi
                        </Button>
                        <Button onClick={() => setAnchorEl(null)}
                            className="ml-2">
                            Đóng
                        </Button>
                    </div>
                </div>
            </Popover>
        </div>
        <div>
            <Button variant="contained" color="primary"
                className="light-blue-bgcolor my-2">
                <Link color="inherit" className="link-unstyled" to="/course/create">
                    Tạo môn học
            </Link>
            </Button>
            <Tooltip title="Tải lại">
                <IconButton onClick={props.refresh} className="p-2 mx-2">
                    <IoMdRefresh size="25px" />
                </IconButton>
            </Tooltip>
        </div>
    </div>
}

export default FilterBar