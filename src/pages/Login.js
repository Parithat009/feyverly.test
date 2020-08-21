import React, { useState } from 'react'
import { Input, Button, Modal, Icon, Header } from 'semantic-ui-react'
import '../assets/css/pages/Login.css'
import axios from 'axios'
import { useHistory } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState({ status: false, message: '' })

  let history = useHistory()

  const login = async () => {
    const user = { username, password }
    try {
      const response = await axios.post('http://203.151.213.133/testfeyverly/api/V1/Account/Login', { ...user })
      if (response && response.data) {
        if (response.data.StatusCode === 200) {
          localStorage.setItem('auth_token', response.data.token)
          console.log(localStorage.getItem('auth_token'))
          history.push('/')
        }
        else if (response.data.StatusCode === 400) {
          setOpen({ message: response.data.ResponseMessage, status: true })
        }
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='loginContent'>
      <div className='loginForm'>
        <div className='loginTitle'>
          <label className='loginText'>Feyverly</label>
        </div>

        <Input placeholder='บัญชีผู้ใช้' fluid size='small' className='inputLogin' onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder='รหัสผ่าน' type='password' fluid size='small' className='inputLogin' onChange={(e) => setPassword(e.target.value)} />

        <Button secondary className='btn' onClick={() => login()}>เข้าสู่ระบบ</Button>
      </div>

      <Modal
        size='tiny'
        open={open.status}
        // trigger={<Button>Show Modal</Button>}
        // onClose={() => setOpen((prev) => ({ ...prev, status: false }))}
        onOpen={() => setOpen((prev) => ({ ...prev, status: true }))}
      >
        <Header icon='lock' content='เข้าสู่ระบบล้มเหลว' />
        <Modal.Content>
          <p>{open.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen((prev) => ({ ...prev, status: false }))}>
            <Icon name='x' /> ปิด
          </Button>
        </Modal.Actions>
      </Modal>

    </div >
  )
}

export default Login
