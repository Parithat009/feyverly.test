import React, { useEffect, useState } from 'react'
import { AppLayout } from '../component'
import axios from '../utils/Axios'
import { Grid, List, Modal, Icon, Header, Button } from 'semantic-ui-react'
import '../assets/css/pages/Detail.css'
import moment from 'moment'
import QRCode from 'qrcode.react'

const Detail = () => {
  const [privilege, setPrivilege] = useState({})
  const [redeem, setRedeem] = useState({})
  const [rewardStatus, setRewardStatus] = useState(false)
  const [chooseQr, setChooseQr] = useState('')

  const queryPrivilege = async () => {
    try {
      const response = await axios.get('/Privilege/PrivilegeDetail')
      if (response && response.data && response.data.StatusCode === 200) {
        setPrivilege(response.data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const queryRedeem = async () => {
    try {
      const response = await axios.post('/Privilege/RedeemPrivilege', { privilege_id: 1 })
      if (response && response.data && response.data.StatusCode === 200) {
        // setRewardStatus(true)
        setRedeem(response.data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const setDefaultQr = () => {
    redeem && redeem.code_list && redeem.code_list.map((item, i) => {
      if (i === 0) {
        setChooseQr(item.value)
      }
    })
  }

  useEffect(() => {
    queryPrivilege()
    queryRedeem()
  }, [])

  useEffect(() => {
    setDefaultQr()
  }, [redeem.code_list])

  let splitDeatil = privilege.privilege_detail && privilege.privilege_detail.split('- บัตร E-Voucher')

  return (
    <AppLayout setRewardStatus={setRewardStatus} >
      <div className='detail'>
        <Grid centered className='gridStyle' >
          <Grid.Row>
            <img src={privilege?.privilege_url} className='imgstyle' />
          </Grid.Row>

          <Grid.Row className='rowStyle' >
            <label className='title' >{privilege?.privilege_title}</label>
          </Grid.Row>
          <Grid.Row className='noPadding' >
            <label className='detailText' >
              รับสิทธิ์ภายใน: <span className='dangerText'>{moment(privilege?.privilege_exp).format("DD/MM/YYYY")}</span>
            </label>
          </Grid.Row>

          <Grid.Row className='rowStyle'>
            <Grid.Column textAlign='center'>
              <hr className='hrStyle' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='rowStyle'>
            <Grid.Column textAlign='left'>
              <label className='subTitleText' >เงื่อนไขการรับสิทธิ์</label>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className='noPadding'>
            <Grid.Column textAlign='left'>
              <List bulleted >
                {splitDeatil && splitDeatil.map((item, i) => {
                  if (i !== 0) {
                    return <List.Item key={i} className='listText'>บัตร E-Voucher{item}</List.Item>
                  }
                })}

              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>


      <Modal
        size='tiny'
        closeIcon
        open={rewardStatus}
        // trigger={<Button>Show Modal</Button>}
        onClose={() => setRewardStatus(false)}
        onOpen={() => setRewardStatus(true)}
      >
        <Header content='Feyverly' className='headerModal' />
        <Modal.Content className='modalDetail'>
          <div className='divContent'>
            <img src={redeem?.logo_url} className='imgModal' />
            <label className='titleModal'>{redeem?.coupon_title}</label>
            <label className='detailModal'>{redeem?.coupon_detail}</label>

            <div className='qrCode'>
              <QRCode value={chooseQr} /><br />
              <label className='detailModal'>{chooseQr}</label>
            </div>

            <div className='chooseQrCode'>
              {redeem && redeem.code_list && redeem.code_list.map((item, i) => (
                <Button onClick={() => setChooseQr(item.value)} className={item.value === chooseQr ? 'btnModalActive' : 'btnModal'} key={i}>{i + 1}</Button>
              ))}
            </div>
          </div>
          <div className='footerModal'>
            สำหรับใช้สแกนรับสิทธิ์ที่หน้าร้าน โปรดแสดงคูปองนี้ก่อนใช้งาน
          </div>
        </Modal.Content>
      </Modal>

    </AppLayout>
  )
}

export default Detail
