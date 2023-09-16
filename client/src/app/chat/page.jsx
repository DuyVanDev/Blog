"use client";
import Lobby from "@/components/Lobby/Lobby";
import React, { useEffect } from "react";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatC from "@/components/Chat/Chat";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  // const joinRoom = async (user, room) => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl("http://localhost:5167/chat")
  //       .configureLogging(LogLevel.Information)
  //       .build();

  //     connection.on("ReceiveMessage", (user, message) => {
  //       setMessages((messages) => [...messages, { user, message }]);
  //     });

  //     await connection.start();
  //     await connection.invoke("JoinRoom", { user, room });
  //     setConnection(connection);
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // };

  useEffect(() => {
    const connect = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5167/chat")
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
        console.log(user)
      });
      await newConnection.start();
      
      setConnection(newConnection);
    };
    connect();
  }, []);

  const disconnect = async () => {
    if (connection) {
      try {
        await connection.stop();
        // Handle disconnection, e.g., update UI or show a message.
      } catch (error) {
        console.error(error);
      }
    }
  };
  const sendMessageToUser = async (user, message) => {
    if (connection) {
      try {
        // Send a message to a specific user
        await connection.invoke("SendMessageToUser", user, message);
        console.log(user);
        console.log(messages)
      } catch (error) {
        console.error(error);
      }
    }
  };
  // const sendMessage = async (message) => {
  //   try {
  //     await connection.invoke("SendMessage", message);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />
      {/* {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <ChatC sendMessageToUser={sendMessageToUser} messages={messages} />
      )} */}
      {connection && (
        <div>
          <button onClick={disconnect}>Disconnect</button>
          <ChatC sendMessageToUser={sendMessageToUser} messages={messages} />
        </div>
      )}
    </div>
  );
};

export default Chat;
