const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION': return action.data.notification
    case 'CLEAR_NOTIFICATION': return null
    default: return state
  }
}

export const createNotification = (notification) => {
  return {
    type: 'CREATE_NOTIFICATION',
    data: {
      notification: notification
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

let timeout = null
export const showNotification = (dispatch, notification) => {
  if (timeout) {
    clearTimeout(timeout)
  }

  dispatch(createNotification(notification))

  timeout = setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}

export default notificationReducer
