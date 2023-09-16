"use client";

import React, { useState } from "react";

const Lobby = ({ joinRoom }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    joinRoom(username, room);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Lobby;
