import http from "./http"

//Dang nhap
export const loginCall = data => {
    return http.post('/auth/login', data)
}

export const logoutCall = () => {
    return http.get('/auth/logout')
}

//Xac thuc token
export const verifyToken = () => {
    return http.get('/auth/verify')
}
