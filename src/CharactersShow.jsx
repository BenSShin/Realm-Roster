import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CharactersShow(props) {
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const handleShowUpdate = () => {
    setIsUpdateVisible(true);
  };
  const handleClose = () => {
    setIsUpdateVisible(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateCharacter(props.character.id, params, () => event.target.reset());
    props.onShowCharacter(props.character, () => event.target.reset());
    handleClose();
  };
  let navigate = useNavigate();
  const handleClick = () => {
    props.onDestroyCharacter(props.character);
    let path = "/characters";
    navigate(path);
  };

  return (
    <div className="">
      <div className="flex justify-start p-5 bg-[#CE5A67] rounded-b-md">
        <h1 className="text-3xl font-bold">Character Information</h1>
      </div>
      {isUpdateVisible === true ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-start pt-8 pl-[10%]">
              <div className="text-3xl font-bold capitalize">
                Name:{" "}
                <input
                  className="pl-2 w-[400px] rounded-r-md overflow bg-[#F3EEEA] focus:outline-[#CE5A67]"
                  defaultValue={props.character.name}
                  name="name"
                  type="text"
                />
              </div>
            </div>
            <div className="text-xl font-bold capitalize">
              <div className="flex justify-start pt-8 pl-[12%]">
                Level:{" "}
                <input
                  className="ml-3 bg-[#F3EEEA] rounded-md text-center w-[50px] focus:outline-[#CE5A67]"
                  defaultValue={props.character.level}
                  name="level"
                  type="text"
                />
              </div>
            </div>
            <div className="text-xl font-bold capitalize">
              <div className="flex justify-start pt-8 pl-[12%]">
                Race:{" "}
                <input
                  className="ml-3 pl-2 bg-[#F3EEEA] rounded-r-md focus:outline-[#CE5A67]"
                  defaultValue={props.character.race}
                  name="race"
                  type="text"
                />
              </div>
            </div>
            <div className="text-xl font-bold capitalize">
              <div className="flex justify-start pt-8 pl-[12%]">
                Class:{" "}
                <select
                  className="w-[300px] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none ml-3 pl-2 bg-[#F3EEEA] focus:outline-[#CE5A67]"
                  defaultValue={props.character.character_class}
                  name="character_class"
                >
                  <option value="bard">bard</option>
                  <option value="cleric">cleric</option>
                  <option value="druid">druid</option>
                  <option value="fighter">fighter</option>
                  <option value="barbarian">barbarian</option>
                  <option value="paladin">paladin</option>
                  <option value="monk">monk</option>
                  <option value="ranger">ranger</option>
                  <option value="rogue">rogue</option>
                  <option value="sorcerer">sorcerer</option>
                  <option value="warlock">warlock</option>
                  <option value="wizard">wizard</option>
                </select>
              </div>
            </div>
            <div className="text-xl capitalize">
              <div className="flex justify-start pt-8 pl-[12%]">
                <p className="font-bold pr-4">Description:</p>
                <textarea
                  cols="30"
                  rows="8"
                  className="w-[700px] max-h-[350px] h-41 bg-[#F3EEEA] rounded-b-md text-wrap text-ellipsis p-1 focus:outline-[#CE5A67]"
                  defaultValue={props.character.description}
                  name="description"
                  type="text"
                />
              </div>
            </div>
            <div>
              <button
                className="m-5 max-w-[50%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
                type="submit"
              >
                Update
              </button>
              <button
                className="mb-5 max-w-[50%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
                onClick={() => handleClose()}
              >
                cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-start pt-8 pl-[10%]">
            <div className="">
              <p className="text-3xl font-bold capitalize">Name: {props.character.name}</p>
            </div>
          </div>
          <div className="flex justify-start pt-8 pl-[12%]">
            <p className="text-xl font-bold pr-6">Level:</p>
            <p className="text-xl font-bold capitalize">{props.character.level}</p>
          </div>
          <div className="flex justify-start pt-8 pl-[12%]">
            <p className="text-xl font-bold pr-6">Race:</p>
            <p className="text-xl font-bold capitalize">{props.character.race}</p>
          </div>
          <div className="flex justify-start pt-8 pl-[12%]">
            <p className="text-xl font-bold pr-6">Class:</p>
            <p className="text-xl font-bold capitalize">{props.character.character_class}</p>
          </div>
          <div className="flex justify-start pt-8 pl-[12%]">
            <p className="text-xl font-bold pr-4">Description:</p>
            <div className="w-[700px] max-h-[350px] p-2 overflow-auto overscroll-contain border-[4px] border-[#CE5A67] ">
              <pre className="text-xl capitalize text-left"> {props.character.description}</pre>
            </div>
          </div>
          <button
            className="m-5 max-w-[50%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
            onClick={() => handleShowUpdate()}
          >
            Update
          </button>
        </>
      )}
      <button
        className="ml-[35px] max-w-[50%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
        onClick={handleClick}
      >
        Delete Character
      </button>
    </div>
  );
}
