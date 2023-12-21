import axios from "axios";
import { useState, useEffect } from "react";
import { MessagesIndex } from "./MessagesIndex";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { LogoutLink } from "./Logout";
import { MessagesNew } from "./MessagesNew";

export function Content() {
  const [messages, setMessages] = useState([]);

  const handleIndexMessages = () => {
    console.log("handleIndexMessages");
    axios.get(`http://localhost:3000/messages.json`).then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  };

  const handleCreateMessage = (params, successCallback) => {
    console.log("handleCreateMessage", params);
    axios.post("http://localhost:3000/messages.json", params).then((response) => {
      setMessages([...messages, response.data]);
      successCallback;
    });
  };

  useEffect(handleIndexMessages, []);

  return (
    <main>
      <SignUp />
      <Login />
      <LogoutLink />
      <MessagesIndex messages={messages} />
      <MessagesNew onCreateMessage={handleCreateMessage} />
    </main>
  );
}
