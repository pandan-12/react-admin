// 设置
export function setItem(key, value) {
  try {
    value = JSON.stringify(value);
  } finally {
    window.localStorage.setItem(key, value)
  }
}

//获取
export function getItem(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

//删除
export function removeItem(key) {
  window.localStorage.removeItem(key)
}