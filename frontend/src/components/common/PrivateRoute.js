import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(state => state.account)
    return <Route {...rest}>
        {user
            ? <Component />
            : <Redirect to={{ pathname: "/login" }} />}
    </Route>
}

export default PrivateRoute