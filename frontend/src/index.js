import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { viVN } from '@material-ui/core/locale';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1a73e8"
    }
  },
  typography: {
    fontFamily: `"Open Sans", sans-serif, "Roboto", 'Lato'`,
    fontSize: "14px",
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 10,
        fontSize: 15
      }
    },
    MuiTableContainer: {
      root: {
        borderRadius: 10
      }
    },
    MuiTableCell: {
      root: {
        padding: "7px 10px"
      },
      body: {
        fontSize: 14,
        lineHeight: "24px"
      },
      head: {
        fontSize: 14
      }
    },
    MuiInputBase: {
      root: {
        fontSize: 14,
        lineHeight: "24px"
      },
      input: {
        fontSize: 14,
        lineHeight: "24px"
      }
    },
    MuiTableRow: {
      root: {
        position: "relative"
      },
      hover: {
        '&:hover .action-button': {
          visibility: "visible"
        }
      }
    },
    MuiTablePagination: {
      selectIcon: {
        fontSize: 24,
      }
    }
  }
}, viVN)

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
)