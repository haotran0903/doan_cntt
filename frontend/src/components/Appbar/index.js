import { Drawer, IconButton } from '@material-ui/core'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { AiFillSetting, AiOutlineMenu } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutCall } from '../../api/UserAPI'
import logo_truong from '../../assets/logo_noname.png'
import { logout } from '../../store/actions/account.action'
import Sidebar from './sidebar'
import UserMenu from './UserMenu'

const Appbar = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [userMenuToggle, setUserMenuToggle] = useState(false)

    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const menuRef = useRef(null)

    const handleLogout = () => {
        logoutCall()
            .then(res => {
                dispatch(logout())
            })
            .catch(err => {
                alert('Đăng xuất thất bại!')
            })
    }

    useEffect(() => {
        const handleClickOutside = e => {
            if (menuRef && !menuRef.current.contains(e.target)) {
                setUserMenuToggle(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div className="appbar">
            <IconButton id="toggle-button" onClick={() => setSidebarToggle(!sidebarToggle)}>
                <AiOutlineMenu />
            </IconButton>
            <Link to="/">
                <img src={logo_truong} alt="logo" height="50px" className="mx-3" />
            </Link>
            <div ref={menuRef} className="position-relative">
                <IconButton
                    ref={anchorRef}
                    onClick={() => setUserMenuToggle(!userMenuToggle)}
                >
                    <AiFillSetting size="30px" />
                </IconButton>
                <UserMenu
                    handleClose={() => setUserMenuToggle(false)}
                    handleLogout={handleLogout}
                    open={userMenuToggle}
                />
            </div>
            <Drawer open={sidebarToggle} onClose={() => setSidebarToggle(false)}>
                <Sidebar close={() => setSidebarToggle(false)} />
            </Drawer>
        </div>
    )
}

export default Appbar