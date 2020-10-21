import React from 'react'

const Notification = ({ message }) => {
    console.log(message)

    const handleNotification = () => {
        if (message === null) {
            return null
        } else {
            return <div className={message.type}>
                    {message.text}
                  </div>
        }
    }

        return (
            <div>
            {handleNotification()}
            </div>
        ) 
    
}

export default Notification