import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  MODIFY_CATEGORY_SUCCESS
} from '../action-types/category';

const initState = [];
// 照葫芦画瓢
function categories(prevState = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.data
    case ADD_CATEGORY_SUCCESS:
      return [...prevState, action.data]
    case MODIFY_CATEGORY_SUCCESS:
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          //如果id匹配上,就返回修改后的数据
          return action.data //action.data必须有两个属性_id,name
        }
        // 如果没匹配上,就返回原数据
        return category
      })
    default:
      return prevState
  }
}

export default categories