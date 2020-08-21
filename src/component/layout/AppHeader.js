import React from 'react'
import '../../assets/css/layout/AppHeader.css'
import { Header, Icon } from 'semantic-ui-react'

const AppHeader = () => {
  return (
    <div className='header'>

      <div className='headerDivide'>
        <Header as='h1' content='Feyverly' className='headerName' />
        <div className='iconHeader'>
          <Icon name='bitcoin' size='large' />
        </div>
      </div>
    </div>
  )
}

export default AppHeader
