import { useState } from "react";

const SendMessageForm = ({ sendMessageToUser }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessageToUser(user,message);

        setMessage("");
      }}
    >
      <input
        type="text"
        placeholder="user..."
        onChange={(e) => setUser(e.target.value)}
        value={user}
      />

      <input
        type="text"
        placeholder="message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />



      <input type="submit" />
    </form>
  );
};

export default SendMessageForm;
