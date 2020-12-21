import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import styled from "styled-components"

const InputLabel = styled.label`
    font-size: 13px;
`

const Input = styled.input`
 &:focus{
     outline:none;
     box-shadow:none;
 }
 border-radius:10px;
`

const TextArea = styled.textarea`
 &:focus{
     outline:none;
     box-shadow:none;
 }
 border-radius:10px;
 resize:none;
`

const Select = styled.select`
&:focus{
     outline:none;
     box-shadow:none;
 }
 border-radius:10px;
`

const FixedWidthForm = styled.form`
 min-width:450px;
`

const ErrorText = styled.span`
    position:absolute;
    font-size:11px;
    transform:translate(3px,2px);
    color:var(--danger);
    font-style:italic;
`

export const CreateCourseForm = ({ props }) => (
    <div>
        <FixedWidthForm id="create-form">
            <div className="form-group col-12 pb-2">
                <InputLabel
                    className={`${props.errors.tenmh && 'text-danger'}`}
                    for="tenmh">Tên môn học</InputLabel>
                <Input
                    id="tenmh"
                    name="tenmh"
                    type="text"
                    className={`bg-light form-control
                            ${props.errors.tenmh && ' border-danger'}`}
                    value={props.tenmh}
                    onChange={e => props.setTenmh(e.target.value)}
                />
                <ErrorText>{props.errors.tenmh}</ErrorText>
            </div>
            <div className="row mx-0">
                <div className="form-group col-3 col-md-3 col-lg-2 pb-2">
                    <InputLabel
                        className={`${props.errors.mamh && 'text-danger'}`}
                        for="mamh"
                    >
                        Mã môn học
                    </InputLabel>
                    <Input
                        maxLength={15}
                        name="mamh"
                        id="mamh"
                        type="text"
                        className={`bg-light form-control
                                ${props.errors.mamh && ' border-danger'}`}
                        value={props.mamh}
                        onChange={e => props.setMamh(e.target.value)}
                    />
                    <ErrorText>{props.errors.mamh}</ErrorText>
                </div>
                <div className="form-group col-3 col-md-2 pb-2">
                    <InputLabel
                        for="sotc"
                        className={`${props.errors.sotinchi && 'text-danger'}`}
                    >
                        Số tín chỉ
                            </InputLabel>
                    <Input
                        name="sotc"
                        id="sotc"
                        type="number"
                        className={`bg-light form-control
                                ${props.errors.sotinchi && ' border-danger'}`}
                        min={1}
                        max={10}
                        value={props.sotinchi}
                        onKeyDown={e => {
                            if ((e.target.value === '' && e.key === '0') ||
                                e.key === 'e' || e.key === '.' || e.key === '-') {
                                e.preventDefault()
                                e.stopPropagation();
                            }
                        }}
                        onChange={e => {
                            if (e.target.value > 10)
                                props.setsotinchi(10)
                            else
                                props.setsotinchi(e.target.value)

                        }}
                    />
                    <ErrorText>{props.errors.sotinchi}</ErrorText>
                </div>
                <div className="form-group col-12 col-lg-4 pb-2">
                    <InputLabel className={`${props.errors.bomon && 'text-danger'}`}>
                        Bộ môn
                    </InputLabel>
                    <Select
                        className={`bg-light form-control
                            ${props.errors.bomon ? ' border-danger' : ''}`}
                        value={props.bomon}
                        onChange={e => props.setBomon(e.target.value)}
                    >
                        <option selected value="" disabled>-- Chọn bộ môn --</option>
                        <option value="thcs">Tin học cơ sở</option>
                        <option value="cnpm">Công nghệ phần mềm</option>
                        <option value="httt">Hệ thống thông tin</option>
                        <option value="manm">Mạng và an ninh mạng</option>
                    </Select>
                    <ErrorText>{props.errors.bomon}</ErrorText>
                </div>
                <div className="form-group col-12 col-lg-4 pb-2">
                    <InputLabel
                        className={`${props.errors.phanloai && 'text-danger'}`}
                    >
                        Phân loại
                    </InputLabel>
                    <Select
                        className={`bg-light form-control
                            ${props.errors.phanloai ? ' border-danger' : ''}`}
                        value={props.phanloai}
                        onChange={e => props.setPhanloai(e.target.value)}
                    >
                        <option selected value="" disabled>-- Chọn phân loại --</option>
                        <option>Tùy chọn</option>
                        <option>Bắt buộc</option>
                    </Select>
                    <ErrorText>{props.errors.phanloai}</ErrorText>
                </div>
            </div>
            <div className="form-group col-12 pb-2">
                <InputLabel for="montienquyet">
                    Môn tiên quyết
                </InputLabel>
                <Autocomplete
                    value={props.montienquyet}
                    id="montienquyet"
                    noOptionsText="Không có kết quả."
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            variant="outlined"
                            className="bg-light"
                        />}
                    options={props.courseList}
                    getOptionLabel={option => option.tenmh}
                    onChange={(event, newValue) => props.setMontienquyet(newValue)}
                    size="small"
                />
            </div>
            <div className="form-group col-12 pb-2">
                <InputLabel for="mhtruoc">
                    Môn học trước
                </InputLabel>
                <Autocomplete
                    value={props.monhoctruoc}
                    id="mhtruoc"
                    noOptionsText="Không có kết quả."
                    multiple
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            variant="outlined"
                            className="bg-light"
                        />}
                    options={props.courseList}
                    getOptionLabel={option => option.tenmh}
                    onChange={(event, newValue) => props.setMonhoctruoc(newValue)}
                    size="small"
                />
            </div>
            <div className="form-group col-12 pb-2">
                <InputLabel for="mota">Mô tả (optional)</InputLabel>
                <TextArea
                    name="mota"
                    id="mota"
                    className="bg-light form-control scrollbar-primary"
                    rows={10}
                    value={props.mota}
                    onChange={e => props.setMota(e.target.value)}
                />
            </div>
        </FixedWidthForm>
    </div >
)