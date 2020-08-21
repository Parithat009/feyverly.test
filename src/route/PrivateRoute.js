import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return (
        // ดักต้องมี user type ให้ && user.userType
        localStorage.getItem('auth_token')
          ? (<Component {...props} />)
          : (<Redirect to={{ pathname: '/login' }} />)
      )
    }} />
  )
}

export default PrivateRoute