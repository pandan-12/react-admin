import {
  reqLogin
} from '../../api/index'

import {
  GET_USER_SUCCESS,
  REMOVE_USER_SUCCESS
} from '../action-types/user'; // 引过来常量模块


//同步
const getuserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  data: user
})

export const removeUserSuccess = () => ({
  type: REMOVE_USER_SUCCESS, // 删除不需要传参
})


// 异步
export const getUserAsync = (username, Password) => {
  return (dispatch) => {
    return reqLogin(username, Password)
      .then((response) => {
        // const action = {
        //   type: GET_USER_SUCCESS,
        //   data: response
        // } // 创建axios
        dispatch(getuserSuccess(response));
        return response
      })
  }
}