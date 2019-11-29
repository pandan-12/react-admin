import {
  reqGetCategories,
  reqAddCategory,
  reqModifyCategory
} from "../../api"

import {
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  MODIFY_CATEGORY_SUCCESS
} from '../action-types/category'

const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: categories
})

const addCategorySuccess = (categoryName) => ({
  type: ADD_CATEGORY_SUCCESS,
  data: categoryName
})

const modifyCategorySuccess = (categoryName) => ({
  type: MODIFY_CATEGORY_SUCCESS,
  data: categoryName,
})

export const getCategoriesAsync = () => {
  return (dispatch) => {
    return reqGetCategories()
      .then((response) => {
        dispatch(getCategoriesSuccess(response));
      })
  }
}

export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    return reqAddCategory(categoryName)
      .then((response) => {
        dispatch(addCategorySuccess(response));
      })
  }
}

export const modifyCategoryAsync = (categoryId, categoryName) => {
  return (dispatch) => {
    return reqModifyCategory(categoryId, categoryName)
      .then((response) => {
        dispatch(modifyCategorySuccess(response));
      })
  }
}