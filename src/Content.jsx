import axios from "axios";
import { useState, useEffect } from "react";
import { MessagesIndex } from "./MessagesIndex";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { LogoutLink } from "./Logout";
import { MessagesNew } from "./MessagesNew";
import { Modal } from "./Modal";
import { MessagesShow } from "./MessagesShow";

export function Content() {
  const [messages, setMessages] = useState([]);
  const [isMessageShowVisible, setIsMessageShowVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});

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

  const handleShowMessage = (message) => {
    console.log("handleShowMessage", message);
    setIsMessageShowVisible(true);
    setCurrentMessage(message);
  };

  const handleUpdateMessage = (id, params, successCallback) => {
    console.log("handleUpdateMessage", params);
    axios.patch(`http://localhost:3000/messages/${id}.json`, params).then((response) => {
      setMessages(
        messages.map((message) => {
          if (message.id === response.data.id) {
            return response.data;
          } else {
            return message;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsMessageShowVisible(false);
  };

  // const handleDestroyMessage = (message) => {
  //   console.log("handleDestroyMessage", message);
  //   axios.delete(`http://localhost:3000/messages/${message.id}.json`).then((response) => {
  //     setMessages(messages.filter((p) => p.id !== message.id));
  //   });
  // };

  useEffect(handleIndexMessages, []);

  return (
    <main>
      <SignUp />
      <Login />
      <LogoutLink />
      <MessagesIndex messages={messages} onShowMessage={handleShowMessage} />
      <MessagesNew onCreateMessage={handleCreateMessage} />
      <Modal show={isMessageShowVisible} onClose={handleClose}>
        <MessagesShow message={currentMessage} onUpdateMessage={handleUpdateMessage} />
      </Modal>
    </main>
  );
}
