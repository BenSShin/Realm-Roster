import axios, { Axios } from "axios";
import { useState, useEffect } from "react";
import { MessagesIndex } from "./MainContent/Message/MessagesIndex";
import { SignUp } from "./Authorization/SignUp";
import { Login } from "./Authorization/Login";
import { MessagesNew } from "./MainContent/Message/MessagesNew";
import { Modal } from "./Modal/Modal";
import { MessagesShow } from "./MainContent/Message/MessagesShow";
import { GroupsShow } from "./MainContent/Group/GroupsShow";
import { GroupsNew } from "./MainContent/Group/GroupsNew";
import { GroupsUpdatePage } from "./MainContent/Group/GroupsUpdatePage";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { Calendar } from "./MainContent/Group/Calendar";
import { CharactersIndex } from "./MainContent/Character/CharactersIndex";
import { CharactersNew } from "./MainContent/Character/CharactersNew";
import { CharactersShow } from "./MainContent/Character/CharactersShow";
import { GroupsIndex } from "./MainContent/Group/GroupsIndex";
import { Initiative } from "./MainContent/Combat/Initiative";

export function Content() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://realm-roster-api.onrender.com/";

  //messages
  const [messages, setMessages] = useState([]);
  const [isMessageShowVisible, setIsMessageShowVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  // group
  const [groups, setGroups] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});
  const [isGroupUpdateVisible, setIsGroupUpdateVisible] = useState(false);
  // character
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState([]);

  // character functions
  // index of user's characters
  const handleIndexCharacters = () => {
    console.log("handleIndexCharacters");
    axios.get("characters.json").then((response) => {
      console.log(response.data);
      setCharacters(response.data);
    });
  };
  // character create
  const handleCreateCharacter = (params, successCallback) => {
    console.log("handleCreateCharacter", params);
    axios.post("characters.json", params).then((response) => {
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
    axios.patch(`characters/${id}.json`, params).then((response) => {
      setCharacters(
        characters.map((character) => {
          if (character.id === response.data.id) {
            return response.data;
          } else {
            return character;
          }
        })
      );
      setCurrentCharacter(response.data);
      successCallback();
    });
  };
  // character delete
  const handleDestroyCharacter = (character) => {
    console.log("handleDestroyCharacter", character);
    axios.delete(`characters/${character.id}.json`).then((response) => {
      setCharacters(characters.filter((c) => c.id !== character.id));
    });
  };

  // Message functions
  // index of group's messages
  const handleIndexMessages = (character) => {
    console.log("handleIndexMessages");
    axios.get(`messages.json?group_id=${character.group_id}`).then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  };
  // Create message
  const handleCreateMessage = (params, successCallback) => {
    console.log("handleCreateMessage", params);
    axios.post("messages.json", params).then((response) => {
      setMessages([...messages, response.data]);
      successCallback();
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
    axios.patch(`messages/${id}.json`, params).then((response) => {
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
    axios.delete(`messages/${message.id}.json`).then((response) => {
      setMessages(messages.filter((p) => p.id !== message.id));
      handleClose();
    });
  };

  // Group functions

  // Group index
  const handleIndexGroups = () => {
    console.log("handleIndexGroups");
    axios.get("groups.json").then((response) => {
      console.log(response.data);
      setGroups(response.data);
    });
  };

  // Show Group
  const handleShowGroup = (character) => {
    console.log("handleShowGroup");
    axios.get(`groups/${character.group_id}.json`).then((response) => {
      console.log(response.data);
      setCurrentGroup(response.data);
    });
  };

  // Create Group user update works but have to refresh
  const handleCreateGroup = (params, successCallback) => {
    console.log("handleCreateGroup", params);
    axios.post("groups.json", params).then((response) => {
      setCurrentGroup([currentGroup, response.data]);
      successCallback();
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
    axios.patch(`groups/${id}.json`, params).then((response) => {
      setCurrentGroup(response.data);
      successCallback();
    });
    handleGroupUpdateClose();
  };

  // Destroy group
  const handleDestroyGroup = (group) => {
    axios.delete(`groups/${group.id}.json`).then((response) => {
      console.log(response);
    });
    handleGroupUpdateClose();
  };

  useEffect(handleIndexCharacters, []);
  useEffect(handleIndexGroups, []);

  return (
    <main className="bg-[#EEE2DE] min-h-screen h-full">
      <Routes>
        <Route path="/groups" element={<GroupsIndex groups={groups} />} />
      </Routes>
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
              <GroupsShow group={currentGroup} onShowGroupUpdate={handleShowGroupUpdate} />
              <Modal show={isGroupUpdateVisible} onClose={handleGroupUpdateClose}>
                <GroupsUpdatePage
                  group={currentGroup}
                  onDestroyGroup={handleDestroyGroup}
                  onUpdateGroup={handleUpdateGroup}
                />
              </Modal>
              <MessagesIndex messages={messages} onShowMessage={handleShowMessage} />
              <MessagesNew onCreateMessage={handleCreateMessage} group={currentGroup} />
              <Modal show={isMessageShowVisible} onClose={handleClose}>
                <MessagesShow
                  message={currentMessage}
                  onUpdateMessage={handleUpdateMessage}
                  onDestroyMessage={handleDestroyMessage}
                />
              </Modal>
              <Calendar />
            </>
          }
        />
      </Routes>
      <Routes>
        <Route path="/combat" element={<Initiative />} />
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
    </main>
  );
}
