import axios from "axios";
import { useState, useEffect } from "react";
import { MessagesIndex } from "./MessagesIndex";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { LogoutLink } from "./Logout";
import { MessagesNew } from "./MessagesNew";
import { Modal } from "./Modal";
import { MessagesShow } from "./MessagesShow";
import { GroupsShow } from "./GroupsShow";
import { GroupsNew } from "./GroupsNew";

export function Content() {
  const [messages, setMessages] = useState([]);
  const [isMessageShowVisible, setIsMessageShowVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});
  // const [group_id, setGroup_id] = useState({});

  // index of messages
  const handleIndexMessages = () => {
    console.log("handleIndexMessages");
    axios.get(`http://localhost:3000/messages.json`).then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  };
  // Create message
  const handleCreateMessage = (params, successCallback) => {
    console.log("handleCreateMessage", params);
    axios.post("http://localhost:3000/messages.json", params).then((response) => {
      setMessages([...messages, response.data]);
      successCallback;
    });
  };
  // Show message
  const handleShowMessage = (message) => {
    console.log("handleShowMessage", message);
    setIsMessageShowVisible(true);
    setCurrentMessage(message);
  };
  // update Message
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
  //  Delete a message
  const handleDestroyMessage = (message) => {
    console.log("handleDestroyMessage", message);
    // eslint-disable-next-line no-unused-vars
    axios.delete(`http://localhost:3000/messages/${message.id}.json`).then((response) => {
      setMessages(messages.filter((p) => p.id !== message.id));
      handleClose();
    });
  };
  // Show Group
  const handleShowGroup = () => {
    localStorage.removeItem("groupId");
    console.log("handleShowGroup");
    axios.get("http://localhost:3000/group.json").then((response) => {
      console.log(response.data);
      setCurrentGroup(response.data);
      localStorage.setItem("groupId", response.data.id);
    });
  };

  // Create Group user update works but have to refresh page
  const handleCreateGroup = (params, successCallback) => {
    localStorage.removeItem("groupId");
    console.log("handleCreateGroup", params);
    axios.post("http://localhost:3000/groups.json", params).then((response) => {
      localStorage.setItem("groupId", response.data.id);
      setCurrentGroup([...currentGroup, response.data]);
      successCallback;
      const patchData = { group_id: response.data.id };
      console.log(patchData);
      axios.patch("http://localhost:3000/user.json", patchData).then((response) => {
        console.log(response.data);
      });
    });
  };

  useEffect(handleIndexMessages, []);
  useEffect(handleShowGroup, []);

  return (
    <main>
      <SignUp />
      <Login />
      <LogoutLink />
      <GroupsShow group={currentGroup} />
      <GroupsNew onCreateGroup={handleCreateGroup} />
      <MessagesIndex messages={messages} onShowMessage={handleShowMessage} />
      <MessagesNew onCreateMessage={handleCreateMessage} />
      <Modal show={isMessageShowVisible} onClose={handleClose}>
        <MessagesShow
          message={currentMessage}
          onUpdateMessage={handleUpdateMessage}
          onDestroyMessage={handleDestroyMessage}
        />
      </Modal>
    </main>
  );
}
