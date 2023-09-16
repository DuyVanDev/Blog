import React from 'react'
import MessageContainer from '../MessageContainer/MessageContainer'
import SendMessageForm from '../SendMessage/SendMessage'

const ChatC = ({messages,sendMessageToUser}) => {
  return (
    <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessageToUser={sendMessageToUser}/>
    </div>

  )
}

export default ChatC
