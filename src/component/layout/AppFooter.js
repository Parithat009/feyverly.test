import React from 'react'
import '../../assets/css/layout/AppFooter.css'

const AppFooter = ({ setRewardStatus }) => {
  return (
    <div className='footer' onClick={() => setRewardStatus(true)}>
      <label>เเลกรางวัล</label>
    </div>
  )
}

export default AppFooter
