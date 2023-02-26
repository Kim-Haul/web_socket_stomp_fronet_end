import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import apis from "../shared/apis";
import { useQuery } from "@tanstack/react-query";

const Chat = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const uid = Math.floor(Math.random() * 10 + 1);

  // 소켓 통신 연결
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // WebSocket endpoint 경로 설정
    const stompClient = new Client({ webSocketFactory: () => socket });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe("/topic/messages/2", (message) => {
        setMessages((messages) => [...messages, message.body]);
        console.log(message);
      });
      stompClient.publish({ destination: "/app/enter", body: JSON.stringify({ roomId: 2, writer: uid, message: `${uid}님이 입장하셨습니다.` }) });
    };

    stompClient.activate();
    setClient(stompClient);
  }, []);

  // 메세지 전송
  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!client || !input) return;
    client.publish({ destination: "/app/chat", body: JSON.stringify({ roomId: 2, writer: uid, message: input }) });
    setInput("");
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleMessageSend}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
