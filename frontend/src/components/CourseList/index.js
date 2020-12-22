import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Breadcrumbs, TableFooter, TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useBreadcrumbs, { routeConfig } from "../../hooks/useBreadcrumbs"
import { MdKeyboardArrowRight } from 'react-icons/md';
import CourseRow from './courseRow';
import { useState } from 'react';
import FilterBar from './filter';
import ErrorRow from '../common/ErrorRow';
import EmptyRow from '../common/EmptyRow';
import LoadingRows from '../common/LoadingRows';
import { removeAccents } from '../../utils'

const CourseList = (props) => {
    const courseList = props.courseList

    const initialFilter = {
        tenmh: '',
        sotinchi: '',
        bomon: '',
        phanloai: '',
        cdio: ''
    }

    const breadcrumbs = useBreadcrumbs(routeConfig)
    const [filter, setFilter] = useState(initialFilter)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const filteredCourseList = !courseList.data
        ? []
        : courseList.data.filter(course => (
            (
                removeAccents(course.tenmh).toLowerCase()
                    .includes(removeAccents(filter.tenmh).toLowerCase()) ||
                removeAccents(course.mamh).toLowerCase()
                    .includes(removeAccents(filter.mamh).toLowerCase())
            )
            &&
            course.bomon.includes(filter.bomon) &&
            course.phanloai.includes(filter.phanloai) &&
            course.sotinchi.toString().includes(filter.sotinchi) &&
            filter.cdio.split(' ').every(_cdio => course.chuandaura.includes(_cdio))
        ))


    return (
        <>
            <div>
                <Breadcrumbs separator={<MdKeyboardArrowRight size="1.2em" />} className="page-breadcrumb">
                    {breadcrumbs.map(breadcrumb => (
                        <Link to={breadcrumb.path}>
                            {breadcrumb.name}
                        </Link>
                    ))}
                </Breadcrumbs>
                <h3 className="page-title">
                    Danh sách các môn học
                </h3>
                <hr />
            </div>
            <TableContainer elevation={3} component={Paper} className="light-grey-bg">
                <FilterBar
                    filter={filter}
                    setFilter={setFilter}
                    initialFilter={initialFilter}
                    refresh={props.refresh}
                    setPage={setPage}
                />
                <Table style={{ minWidth: "920px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell width="150px">Mã môn học</TableCell>
                            <TableCell>Tên môn học</TableCell>
                            <TableCell width="120px" align="center">Số tín chỉ</TableCell>
                            <TableCell width="190px">Bộ môn</TableCell>
                            <TableCell width="100px">Phân loại</TableCell>
                            <TableCell width="100px" align='center'>CDIO</TableCell>
                            <TableCell width="120px" align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="bg-white">
                        {
                            courseList.loading
                                ? <LoadingRows col={7} />
                                : courseList.error
                                    ? <ErrorRow refresh={props.refresh} />
                                    : filteredCourseList.length !== 0
                                        ? (rowsPerPage > 0
                                            ? filteredCourseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : filteredCourseList
                                        ).map(row => (
                                            <CourseRow row={row} key={row.mamh} />
                                        ))
                                        : <EmptyRow
                                            header="Không tìm thấy môn học!"
                                            text={(
                                                <p className="text-secondary">
                                                    Không tồn tại môn học đang tìm, vui lòng kiểm tra lại hoặc&nbsp;
                                                    <Link to="/course/create">
                                                        tạo mới!
                                                    </Link>
                                                </p>
                                            )}
                                        />
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
                                colSpan="100%"
                                count={filteredCourseList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { style: { lineHeight: "16px" } },

                                }}
                                onChangePage={(e, newValue) => setPage(newValue)}
                                onChangeRowsPerPage={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default CourseList