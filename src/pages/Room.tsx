import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import uuid from "react-uuid";

const Room = () => {
  interface Imessage {
    roomId: number;
    writer: string;
    message: string;
  }

  const params = useParams();
  const [messages, setMessages] = useState<Imessage[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [input, setInput] = useState<string>("");

  const writer = useMemo(() => {
    return uuid();
  }, []);

  // 소켓 통신 연결
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // WebSocket endpoint 경로 설정
    const stompClient = new Client({ webSocketFactory: () => socket });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe(`/topic/messages/${params.idx}`, (message) => {
        setMessages((messages) => [...messages, JSON.parse(message.body)]);
      });
      stompClient.publish({
        destination: "/app/enter",
        body: JSON.stringify({ roomId: params.idx, writer: writer, message: `${writer}번째 사용자님이 입장하셨습니다.` }),
      });
    };

    stompClient.activate();
    setClient(stompClient);
  }, []);

  // 메세지 전송
  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!client || !input) return;
    client.publish({ destination: "/app/chat", body: JSON.stringify({ roomId: params.idx, writer: writer, message: input }) });
    setInput("");
  };

  return (
    <Wrap>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={message.writer === writer ? "my" : "non-my"}>
            <div>{message.message}</div>
          </li>
        ))}
      </ul>
      <form className="submit" onSubmit={handleMessageSend}>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
        <button>전송</button>
      </form>
    </Wrap>
  );
};

export default Room;
const Wrap = styled.div`
  width: 100%;
  height: 640px;
  position: relative;
  ul {
    max-height: 600px;
    overflow-y: auto;

    list-style: none;
    li {
      margin: 0.5rem 0;
    }
    .my {
      display: flex;
      justify-content: end;
      div {
        padding: 1rem;
        border-radius: 5px;
        text-align: right;
        background-color: rgb(250, 248, 235);
      }
    }
    .non-my {
      display: flex;
      div {
        padding: 1rem;
        border-radius: 5px;
        text-align: left;
        background-color: #e5c1c5;
      }
    }
  }
  .submit {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 4fr 1fr;
    column-gap: 1rem;

    input {
      border: 1px solid #e1e1e1;
      outline: none;
      padding: 1rem;
      &:focus {
        border: 2px solid rgb(0, 123, 255);
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        outline: none;
      }
    }
  }
`;
