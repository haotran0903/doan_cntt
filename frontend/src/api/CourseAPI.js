import http from "./http"

//Tao mon hoc
export const createCourse = data => {
    return http.post('/monhoc', data)
}

//Danh sach mon hoc
export const getCourses = () => {
    return http.get('/monhoc').then(res => res.data)
}

//Xoa 1 mon hoc
export const deleteCourse = mamh => {
    return http.delete(`/monhoc/${mamh}`)
}

//Chinh sua 1 mon hoc
export const updateCourse = (mamh, data) => {
    return http.put(`/monhoc/${mamh}`, data)
}

////Chi tiet mon hoc
//Thong tin chung
export const getCourseInfo = mamh => {
    return http.get(`/monhoc/${mamh}`).then(res => res.data)
}

//Muc tieu
export const getCourseGoal = mamh => {
    return http.get(`/monhoc/${mamh}/muctieu`).then(res => res.data)
}

export const getCourseGoalList = mamh => {
    return http.get(`/monhoc/${mamh}/muctieu/list`).then(res => res.data)
}

export const createCourseGoal = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/muctieu`, data)
}

export const deleteCourseGoal = (mamh, muctieu) => {
    return http.delete(`/monhoc/${mamh}/muctieu/${muctieu}`)
}

export const updateCourseGoal = (mamh, muctieu, data) => {
    return http.put(`/monhoc/${mamh}/muctieu/${muctieu}`, data)
}

//Chuan dau ra
export const getCourseOutcome = mamh => {
    return http.get(`/monhoc/${mamh}/chuandaura`).then(res => res.data)
}

export const getCourseOutcomeList = mamh => {
    return http.get(`/monhoc/${mamh}/chuandaura/list`).then(res => res.data)
}
export const createCourseOutcome = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/chuandaura`, data)
}

export const updateCourseOutcome = (mamh, outcome, data) => {
    return http.put(`/monhoc/${mamh}/chuandaura/${outcome}`, data)
}

export const deleteCourseOutcome = (mamh, cdr) => {
    return http.delete(`/monhoc/${mamh}/chuandaura/${cdr}`)
}

//Danh gia
export const getCourseEvualate = mamh => {
    return http.get(`/monhoc/${mamh}/danhgia`).then(res => res.data)
}

export const createCourseEvualate = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/danhgia`, data)
}

export const updateCourseEvualate = (mamh, data) => {
    return http.put(`/monhoc/${mamh}/danhgia`, data)
}

export const deleteCourseEvualate = (mamh, hinhthuc) => {
    return http.delete(`/monhoc/${mamh}/danhgia/${hinhthuc}`)
}

//Noi dung
export const getCourseContent = mamh => {
    return http.get(`/monhoc/${mamh}/noidung`).then(res => res.data)
}
export const createCourseContent = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/noidung`, data)
}
export const updateCourseContent = (mamh, data) => {
    return http.put(`/monhoc/${mamh}/noidung`, data)
}
export const deleteCourseContent = (mamh, data) => {
    return http.post(`/monhoc/${mamh}/noidung/delete`, data)
}