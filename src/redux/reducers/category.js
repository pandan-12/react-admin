import {
  GET_CATEGORIES_SUCCESS
} from '../action-types/category';

const initState = [];
// 照葫芦画瓢
function categories(prevState = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return action.data
    default:
      return prevState
  }
}

export default categories