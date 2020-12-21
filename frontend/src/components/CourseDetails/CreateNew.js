import { Button, IconButton, Tooltip } from "@material-ui/core"
import { IoMdRefresh } from "react-icons/io"

const CreateNew = (props) => (
    <div
        style={{ minWidth: "600px" }}
        className="d-flex pl-2 pb-2 align-items-center"
    >
        <Tooltip title="Tải lại">
            <IconButton
                className="p-2 mx-2"
                onClick={() => {
                    props.setOpen(false)
                    props.fetch()
                }}
            >
                <IoMdRefresh size="25px" />
            </IconButton>
        </Tooltip>
        <Button
            variant="contained"
            color="primary"
            className="light-blue-bgcolor my-2"
            onClick={props.handleToggleCreate}
            disabled={props.pending}
        >
            {props.label}
        </Button>
    </div>
)

export default CreateNew