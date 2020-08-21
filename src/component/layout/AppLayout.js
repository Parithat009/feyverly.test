import React from 'react'
import '../../assets/css/layout/AppLayout.css'
import AppHeader from './AppHeader'
import AppContent from './AppContent'
import AppFooter from './AppFooter'

const AppLayout = (props) => {
  return (
    <div className='layoutMain'>
      <AppHeader />
      <AppContent {...props} />
      <AppFooter setRewardStatus={props.setRewardStatus} />
    </div>
  )
}

export default AppLayout
