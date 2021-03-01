import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const notificationStyle = {
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    color: notification.isError ? 'red' : 'green'
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    isError: PropTypes.bool
  })
}

export default Notification
