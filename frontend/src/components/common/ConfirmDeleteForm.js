import { Card, CardContent, CardHeader, Dialog, Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import styled from "styled-components"
import { LoadingOverlayDiv } from "./LoadingOverlay"

const StyledCard = styled(Card)`
    min-width:400px;
    border-radius: 10px;
`

const StyledCardHeader = styled(CardHeader)`
    font-size:20px;
    font-weight: 600;
    padding:0;
`

const ConfirmDeleteForm = props => {

    return <Dialog PaperProps={{ style: { borderRadius: "15px" } }} open={props.open} onClose={props.onClose}>
        <StyledCard className="p-3">
            {props.loading && <LoadingOverlayDiv />}
            <StyledCardHeader
                disableTypography
                title={`Xóa ${props.label.toLowerCase()}`}
            />
            <CardContent className="p-0 my-3">
                <Alert severity="error" className="font-weight-bold text-danger">
                    {props.warning}
                </Alert>
                <small className="mt-3 d-block">
                    {props.label}
                </small>
                <p className="mt-1 break-line">
                    {props.name}
                </p>
            </CardContent>
            <div className="d-flex justify-content-end">
                <Button onClick={props.onClose}>
                    Hủy
                </Button>
                <Button onClick={props.onSubmit} className="bg-danger text-white ml-2">
                    Xóa
                </Button>
            </div>
        </StyledCard>
    </Dialog>
}

export default ConfirmDeleteForm