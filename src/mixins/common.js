import axios from 'axios'
import mType from '../store/mType'
import {Indicator} from 'mint-ui'

export default {
  data() {
    return {}
  },
  methods: {
    // TODO 获取列表数据
    requestList({id = 0, content_id = 0, limit = 10}) {
      return new Promise((resolve, reject) => {
        axios.get('/content/verify/home/list', {
          params: {
            id: id,
            content_id: content_id,
            offset: 0,
            limit: limit
          }
        }).then(res => {
          let data = res.data
          if (data.ResultCode === 0) {
            resolve(data)
          }
        })
      })
    },
    // TODO 修改头部展示
    editHeader(obj) {
      if (!obj.title) {
        return
      }
      this.$store.commit(mType.UPDATE_HEADER_TITLE, obj.title)
      this.$store.commit(mType.UPDATE_HEADER_SHOW_BACK, obj.show || false)
      this.$store.commit(mType.UPDATE_HEADER_LEFT_HANDLER, obj.handler || null)
    }
  }
}
