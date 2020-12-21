import styled from "styled-components"

const Label = styled.label`
    font-weight:700;
    font-size:13px;
    margin-bottom:0;
    width:150px;
    padding:0 15px;
`

const Content = styled.p`
    white-space:pre-line;
    word-wrap:break-word;
    font-size:15px;
    margin-bottom:0;
`

const ContentRow = ({ label, content }) => (
    <div className="row mb-3 d-flex">
        <Label className="section-title-color">
            {label}:
        </Label>
        <Content className="col break-line">
            {content}
        </Content>
    </div>
)

export default ContentRow