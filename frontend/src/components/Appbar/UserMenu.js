import { ListItem, ListItemIcon, MenuItem, Paper } from "@material-ui/core"
import { BiUserCircle } from "react-icons/bi"
import { GoSignOut } from 'react-icons/go'
import { useSelector } from "react-redux"
import styled from "styled-components"

const HR = styled.hr`
    margin:7px 0;
    height:1.5px;
    border: none;
    background-color: rgba(0,0,0,.15);
`

const StyledPaper = styled(Paper)`
    position: absolute;
    right: 10px;
`

const ListItemText = styled.div`
    font-size:15px;
    font-weight:600;
`

const UserMenu = props => {
    const account = useSelector(state => state.account)

    return <StyledPaper className={`text-dark p-2${!props.open ? ' d-none' : ''}`}>
        <div>
            <MenuItem className="d-flex p-2">
                <ListItemIcon>
                    <BiUserCircle size="40px" />
                </ListItemIcon>
                <div>
                    <div>
                        <strong>Tài khoản: </strong> {account.username}
                    </div>
                    <div>
                        <strong>Chức vụ: </strong> {account.role}
                    </div>
                </div>
            </MenuItem>
            <HR />
            <ListItem button onClick={props.handleLogout} className="d-flex p-2">
                <ListItemIcon className="min-width-unset mr-3">
                    <GoSignOut size="22px" />
                </ListItemIcon>
                <ListItemText>
                    Đăng xuất
                    </ListItemText>
            </ListItem>
        </div>
    </StyledPaper>
}

export default UserMenu