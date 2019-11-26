import {
  GET_USER_SUCCESS,
  REMOVE_USER_SUCCESS
} from '../action-types/user';
// 用获取
import {
  getItem
} from '../../utils/storage'
// 定义一个判断有值用无值空

const prevsState = getItem('user') || {};

function user(prevState = prevsState, action) {
  switch (action.type) {
    case REMOVE_USER_SUCCESS:
      return {}; // 返回空对象
    case GET_USER_SUCCESS:
      return action.data
    default:
      return prevState
  }
}

export default user;