import { Button, TextField } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginCall } from '../../api/UserAPI'
import logo_truong from '../../assets/logo-truong-name.png'
import { login } from '../../store/actions/account.action'
import { ErrorHelper } from '../../utils'

const Hr = styled.hr`
    margin: 40px 0;
`

const LoginPage = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({
        username: false,
        password: false,
        message: ''
    })

    const validate = () => {
        let userError = false
        let passwordError = false
        if (!username || username.includes(' '))
            userError = true
        if (!password) {
            passwordError = true
        }
        setError({
            username: userError,
            password: passwordError,
            message: ''
        })
        return userError || passwordError
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (validate())
            return
        setLoading(true)
        try {
            const res = await loginCall({ username, password })
            if (res.status === 200) {
                dispatch(login(res.data))
            }
        }
        catch (err) {
            setLoading(false)
            setError({
                username: false,
                password: false,
                message: ErrorHelper(err)
            })
        }
    }

    const handleEnterKey = e => {
        if (e.key === 'Enter')
            handleLogin(e)
    }

    return <div className="login-page">
        <div className="container-md p-0 h-100">
            <form className="login-form col-12 col-xl-4 col-lg-5 col-md-6 col-sm-6">
                <img alt="logo truong" src={logo_truong} width="100%" />
                <Hr />
                <h5 className='text-center primary-logo-color font-weight-bold'>
                    TRANG QUẢN LÝ MÔN HỌC
                </h5>
                <small className="d-block sub-logo-color text-center">
                    Khoa Công nghệ thông tin
                </small>
                <h6 className='mt-5'>Thông tin đăng nhập:</h6>
                <form
                    onKeyDown={handleEnterKey}
                >
                    <TextField
                        className='w-100 mt-3'
                        label="Tài khoản"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        error={error.username}
                    />
                    <TextField
                        className='w-100 mt-3 mb-2'
                        type="password"
                        label="Mặt khẩu"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={error.password}
                    />
                    {error.message &&
                        <div className="alert alert-danger p-2 mt-2">
                            {error.message}
                        </div>
                    }
                    <Button
                        fullWidth
                        className="mt-2"
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        onKeyDown={handleEnterKey}
                        disabled={loading}
                    >
                        Đăng nhập
                    </Button>
                </form>
                <Hr />
                <footer className="text-center">
                    <small>©2020 Đại học Sư Phạm Kỹ Thuật thành phố Hồ Chí Minh</small>
                </footer>
            </form>
        </div>
    </div>
}

export default LoginPage