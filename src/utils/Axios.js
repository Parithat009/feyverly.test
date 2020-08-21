import axios from 'axios'

axios.defaults.baseURL = 'http://203.151.213.133/testfeyverly/api/V1';
axios.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('auth_token')}`

export default axios