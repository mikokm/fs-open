const Notification = ({notification}) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.isError ? "error" : "notification"}>
      {notification.message}
    </div>
  )
}

export default Notification
