import { TableCell } from "@material-ui/core"
import { BiSad } from "react-icons/bi"
import styled from "styled-components"

const Wrapper = styled.div`
    height:250px;
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
`

const EmptyRow = ({ header, text }) => (
    <TableCell colSpan="100%">
        <Wrapper >
            <BiSad className="text-secondary" size="70px" />
            <h3 style={{ fontSize: "25px" }} className="section-title m-0">
                {header}
            </h3>
            <p className="text-secondary">
                {text}
            </p>
        </Wrapper>
    </TableCell>
)

export default EmptyRow