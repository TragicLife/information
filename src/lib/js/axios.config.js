import axios from 'axios'

axios.defaults.baseURL = 'http://172.16.18.142:8888'
axios.defaults.headers.get['aopsId'] = 'CONTENT'
axios.defaults.headers.get['token'] = 'CONTENT'
