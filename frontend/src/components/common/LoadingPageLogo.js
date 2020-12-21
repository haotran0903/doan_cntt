import { LinearProgress } from "@material-ui/core"
import logo from '../../assets/logo_noname.png'

const LoadingPageLogo = () => (
    <div className="h-100 flex-center">
        <div>
            <img className="m-2" src={logo} alt="logo" width="100px" />
            <LinearProgress />
        </div>
    </div>
)

export default LoadingPageLogo