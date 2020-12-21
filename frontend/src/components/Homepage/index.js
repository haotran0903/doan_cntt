import { Link } from "react-router-dom"
import { GoPlus } from 'react-icons/go'
import { AiOutlineUnorderedList } from "react-icons/ai"
import { Card, CardActionArea, CardHeader, Grid } from "@material-ui/core"

const Homepage = () => {

    return <>
        <div>
            <p className="page-breadcrumb">Trang chủ</p>
            <h3 className="page-title">
                Trang quản lý môn học khoa CNTT
            </h3>
            <hr />
        </div>
        <h5 className="section-title">
            Xem, tạo mới và chỉnh sửa các môn học
        </h5>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Card className="feature-card course-list">
                    <CardHeader
                        className="feature-card-header "
                        title="Danh sách môn học"
                        disableTypography
                    />
                    <Link to="/course" className="link-unstyled">
                        <CardActionArea className="feature-card-action">
                            <AiOutlineUnorderedList size="80px" />
                        </CardActionArea>
                    </Link>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card className="feature-card course-create">
                    <CardHeader
                        className="feature-card-header"
                        title="Thêm môn học mới"
                        disableTypography
                    />
                    <Link to="/course/create" className="link-unstyled">
                        <CardActionArea className="feature-card-action">
                            <GoPlus size="80px" />
                        </CardActionArea>
                    </Link>
                </Card>
            </Grid>
        </Grid>
        {/*<hr />
         <h5 className="section-title">
            Chỉnh sửa thông tin các bộ môn
         </h5>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Link to='/course/create'>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                image="http://www.gstatic.com/mobilesdk/180326_mobilesdk/discoverycards/performance.png"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Thêm môn học
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            </Grid>
        </Grid> */}
    </>
}

export default Homepage