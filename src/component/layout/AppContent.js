import React from 'react'
import '../../assets/css/layout/AppContent.css'

const AppContent = ({ children }) => {
  return (
    <div className='contentLayout'>
      {children}
    </div>
  )
}

export default AppContent
