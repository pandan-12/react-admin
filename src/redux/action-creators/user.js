import {
  reqLogin
} from '../../api/index'

import {
  GET_USER_SUCCESS
} from '../action-types/user'; // 引过来常量模块


//同步
const getuserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  data: user
})


// 异步
export const getUserAsync = (username, Password) => {
  return (dispatch) => {
    return reqLogin(username, Password)
      .then((response) => {
        const action = getuserSuccess(response) // 创建axios
        dispatch(action);
        return response
      })
  }
}