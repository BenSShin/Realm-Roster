import axios from "axios";
import { useState, useEffect } from "react";
import { MessagesIndex } from "./MessagesIndex";
import { SignUp } from "./SignUp";
import { Login } from "./Login";
import { MessagesNew } from "./MessagesNew";
import { Modal } from "./Modal";
import { MessagesShow } from "./MessagesShow";
import { GroupsShow } from "./GroupsShow";
import { GroupsNew } from "./GroupsNew";
import { GroupsUpdatePage } from "./GroupsUpdatePage";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Calendar } from "./Calendar";
import { CharactersIndex } from "./CharactersIndex";
import { CharactersNew } from "./CharactersNew";
import { CharactersShow } from "./CharactersShow";

export function Content() {
  //messages
  const [messages, setMessages] = useState([]);
  const [isMessageShowVisible, setIsMessageShowVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  // group
  const [currentGroup, setCurrentGroup] = useState({});
  const [isGroupUpdateVisible, setIsGroupUpdateVisible] = useState(false);
  // character
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState([]);

  // character functions
  // index of user's characters
  const handleIndexCharacters = () => {
    console.log("handleIndexCharacters");
    axios.get("http://localhost:3000/characters.json").then((response) => {
      console.log(response.data);
      setCharacters(response.data);
    });
  };
  // character create
  const handleCreateCharacter = (params, successCallback) => {
    console.log("handleCreateCharacter", params);
    axios.post("http://localhost:3000/characters.json", params).then((response) => {
      setCharacters([...characters, response.data]);
      successCallback();
    });
  };

  // character show page
  const handleShowCharacter = (character) => {
    console.log("handleShowCharacter", character);
    setCurrentCharacter(character);
  };
  // character update
  const handleUpdateCharacter = (id, params, successCallback) => {
    console.log("handleUpdateCharacter", params);
    axios.patch(`http://localhost:3000/characters/${id}.json`, params).then((response) => {
      setCurrentCharacter(response.data);
      successCallback();
    });
  };
  // character delete
  const handleDestroyCharacter = (character) => {
    console.log("handleDestroyCharacter", character);
    axios.delete(`http://localhost:3000/characters/${character.id}.json`).then((response) => {
      setCharacters(characters.filter((c) => c.id !== character.id));
    });
  };

  // Message functions
  // index of group's messages
  const handleIndexMessages = (character) => {
    console.log("handleIndexMessages");
    axios.get(`http://localhost:3000/messages.json?group_id=${character.group_id}`).then((response) => {
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
  // Show message model with update and delete button
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
  // close model message
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

  // Group functions
  // Show Group
  const handleShowGroup = (character) => {
    console.log("handleShowGroup");
    axios.get(`http://localhost:3000/groups/${character.group_id}.json`).then((response) => {
      console.log(response.data);
      setCurrentGroup(response.data);
    });
  };

  // Create Group user update works but have to refresh
  const handleCreateGroup = (params, successCallback) => {
    console.log("handleCreateGroup", params);
    axios.post("http://localhost:3000/groups.json", params).then((response) => {
      setCurrentGroup([currentGroup, response.data]);
      successCallback;
    });
  };
  // closes update model for group
  const handleGroupUpdateClose = () => {
    console.log("handleClose");
    setIsGroupUpdateVisible(false);
  };
  // shows update model for group
  const handleShowGroupUpdate = () => {
    console.log("handleShowGroupUpdate");
    setIsGroupUpdateVisible(true);
  };
  // updates group
  const handleUpdateGroup = (id, params, successCallback) => {
    console.log("handleUpdateGroup", params, id);
    axios.patch(`http://localhost:3000/groups/${id}.json`, params).then((response) => {
      setCurrentGroup(response.data);
      successCallback();
    });
    handleGroupUpdateClose();
  };

  // Destroy group
  const handleDestroyGroup = (group) => {
    axios.delete(`http://localhost:3000/groups/${group.id}.json`).then((response) => {
      console.log(response);
    });
    handleGroupUpdateClose();
  };

  useEffect(handleIndexCharacters, []);

  return (
    <main>
      <Routes>
        <Route path="/characters-new" element={<CharactersNew onCreateCharacter={handleCreateCharacter} />} />
      </Routes>
      <Routes>
        <Route
          path="/character"
          element={
            <CharactersShow
              character={currentCharacter}
              onUpdateCharacter={handleUpdateCharacter}
              onShowCharacter={handleShowCharacter}
              onDestroyCharacter={handleDestroyCharacter}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/characters"
          element={
            <CharactersIndex
              characters={characters}
              onShowCharacter={handleShowCharacter}
              onShowGroup={handleShowGroup}
              onIndexMessages={handleIndexMessages}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/group"
          element={
            <>
              <Calendar />
              <GroupsShow group={currentGroup} onShowGroupUpdate={handleShowGroupUpdate} />
              <Modal show={isGroupUpdateVisible} onClose={handleGroupUpdateClose}>
                <GroupsUpdatePage
                  group={currentGroup}
                  onDestroyGroup={handleDestroyGroup}
                  onUpdateGroup={handleUpdateGroup}
                />
              </Modal>
              <MessagesIndex messages={messages} onShowMessage={handleShowMessage} />
              <MessagesNew onCreateMessage={handleCreateMessage} />
              <Modal show={isMessageShowVisible} onClose={handleClose}>
                <MessagesShow
                  message={currentMessage}
                  onUpdateMessage={handleUpdateMessage}
                  onDestroyMessage={handleDestroyMessage}
                />
              </Modal>
            </>
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/group-new" element={<GroupsNew onCreateGroup={handleCreateGroup} />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </main>
  );
}
