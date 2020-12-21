export const login = account => ({
    type: "LOGIN",
    payload: account
})

export const logout = () => {
    return dispatch => {
        dispatch({ type: "LOGOUT" })
    }
}