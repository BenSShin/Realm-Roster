import { useState, useEffect, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { Modal } from "../../Modal/Modal";
import { CombatShow } from "./CombatShow";

export function Combat() {
  const [creatures, setCreatures] = useState([]);
  const [isCreatureUpdateVisible, setIsCreatureUpdateVisible] = useState(false);
  const [combat, setCombat] = useState([]);
  const [damageInput, setDamageInput] = useState(0);
  const [creaturesHealth, setCreaturesHealth] = useState([]);
  const [selectedCreature, setSelectedCreature] = useState(null);
  const formRef = useRef(null);

  const statusColor = (status) => {
    let color;
    if (status === "Dead") {
      color = "border-[#C31207]";
    } else if (status === "Incapacitated") {
      color = "border-[#FFD95A]";
    } else if (status === "Out of Combat") {
      color = "border-[#38419D]";
    } else if (status === "In Combat") {
      color = "border-[#C1F2B0]";
    } else {
      color = "border-[#FEA1A1]";
    }
    return color;
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };

  const handleCreatureSelect = (creature) => {
    setSelectedCreature(creature);
  };

  const handleDamage = (creature) => {
    setSelectedCreature(creature);
    if (creature.id === selectedCreature.id) {
      if (selectedCreature && creaturesHealth) {
        const updatedHealthData = creaturesHealth.map((creature) => {
          if (creature.id === selectedCreature.id) {
            const updatedHealth = Math.max(0, creature.health - damageInput);
            return { ...creature, health: updatedHealth };
          }
          return creature;
        });
        setCreaturesHealth(updatedHealthData);
      }
    }
  };

  useEffect(() => {}, [damageInput, selectedCreature]);

  const handleShowUpdate = (creature) => {
    setIsCreatureUpdateVisible(true);
    setCombat(creature);
  };

  const handleClose = () => {
    setIsCreatureUpdateVisible(false);
  };

  const handleUpdateCombat = (id, params, successCallback) => {
    axios.patch(`combats/${id}.json`, params).then((response) => {
      setCreatures(
        creatures.map((creature) => {
          if (creature.id === response.data.id) {
            return response.data;
          } else {
            return creature;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyCombat = (combat) => {
    axios.delete(`combats/${combat.id}.json`).then((response) => {
      setCreatures(creatures.filter((c) => c.id !== combat.id));
      handleClose();
    });
  };

  const combatNew = (params, successCallback) => {
    axios.post("combats.json", params).then((response) => {
      setCreatures([...creatures, response.data]);
      successCallback();
    });
  };

  const handleIndexCombat = () => {
    axios.get(`combats.json`).then((response) => {
      console.log(response.data);
      setCreatures(response.data);
      if (!creaturesHealth.length) {
        const initialHealthData = response.data.map((creature) => ({
          id: creature.id,
          health: creature.health,
        }));
        setCreaturesHealth(initialHealthData);
        console.log("creaturesHealth", creaturesHealth);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    combatNew(params, () => event.target.reset());
    ref.current.value = "";
  };

  useEffect(handleIndexCombat, [creaturesHealth]);

  let tabId = 0;
  return (
    <>
      <div className="bg-[#EEE2DE] w-screen h-screen">
        <Tabs>
          <TabList>
            <Tab onClick={handleIndexCombat}>Tab 1</Tab>
            <Tab onClick={handleIndexCombat}>Tab 2</Tab>
            <Tab onClick={handleIndexCombat}>Tab 3</Tab>
            <Tab onClick={handleIndexCombat}>Tab 4</Tab>
          </TabList>
          {/* tab 1 */}
          <TabPanel>
            {(tabId = 1)}
            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <div key={creature.id}>
                  <div className="flex justify-center">
                    <div
                      className={`flex justify-start my-5 w-[80%] h-10 bg-[#A9A9A9] rounded-md border-4 ${statusColor(
                        creature.status
                      )}`}
                    >
                      <p className="capitalize pt-1 px-2 font-bold">{creature.creature_name}</p>
                      <p className="pt-1 px-2 font-bold">Roll: {creature.initiative_roll}</p>
                      {creaturesHealth.map((health) =>
                        creature.id === health.id ? (
                          <div key={health.id} className="flex justify-center">
                            <p className="pt-1 px-2 font-bold">Health:</p>
                            <input
                              className="w-[40px] my-[2px] text-center rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              value={health.health}
                              readOnly
                            />
                            <p className="pt-1 px-2 font-bold">/{creature.health}</p>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                      <p className="pt-1 px-2 font-bold">Status: {creature.status}</p>
                      <div className="absolute right-[10%] flex">
                        <div className="flex justify-center">
                          <p className="pt-1 font-bold">Damage:</p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault(); // Prevent the default form submission behavior
                              handleDamage(creature);
                              e.target.reset(); // Reset the form
                            }}
                          >
                            {/* Your input field */}
                            <input
                              className="w-[40px] my-1 bg-[#F3EEEA] rounded-md mx-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              maxLength={3}
                              onChange={(e) => {
                                const inputValue = parseInt(e.target.value, 10) || 0;
                                setDamageInput(inputValue);
                                handleCreatureSelect(creature);
                              }}
                              type="number"
                            />
                            {/* Your button */}
                            <button
                              className="my-[2px] text-[#FF6969] px-2 mr-4 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1 "
                              type="submit"
                            >
                              damage
                            </button>
                          </form>
                        </div>
                        <button
                          className="my-[2px] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
                          onClick={() => handleShowUpdate(creature)}
                        >
                          Update
                        </button>
                      </div>
                      <Modal show={isCreatureUpdateVisible} onClose={handleClose}>
                        <CombatShow
                          combat={combat}
                          onUpdateCombat={handleUpdateCombat}
                          onDestroyCombat={handleDestroyCombat}
                        />
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                  <input type="text" name="tab_id" value={1} hidden />
                  <div className="w-70 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Name:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="text"
                      name="creature_name"
                    />
                  </div>
                  <div className="w-30 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Initiative:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      maxLength="2"
                      onChange={maxLengthCheck}
                      name="initiative_roll"
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Health:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      name="health"
                      maxLength={3}
                      onChange={maxLengthCheck}
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Status:</p>
                    <select className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="status">
                      <option defaultValue="Choose Status" disabled hidden>
                        Choose Status
                      </option>
                      <option value="In Combat">In Combat</option>
                      <option value="Out of Combat">Out of Combat</option>
                      <option value="Incapacitated">Incapacitated</option>
                      <option value="Saving Throw">Saving Throw</option>
                      <option value="Dead">Dead</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-2"
                >
                  Add
                </button>
              </form>
            </div>
          </TabPanel>
          {/* tab 2 */}
          <TabPanel>
            {(tabId = 2)}
            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <div key={creature.id}>
                  <div className="flex justify-center">
                    <div
                      className={`flex justify-start my-5 w-[80%] h-10 bg-[#A9A9A9] rounded-md border-4 ${statusColor(
                        creature.status
                      )}`}
                    >
                      <p className="capitalize pt-1 px-2 font-bold">{creature.creature_name}</p>
                      <p className="pt-1 px-2 font-bold">Roll: {creature.initiative_roll}</p>
                      {creaturesHealth.map((health) =>
                        creature.id === health.id ? (
                          <div key={health.id} className="flex justify-center">
                            <p className="pt-1 px-2 font-bold">Health:</p>
                            <input
                              className="w-[40px] my-[2px] text-center rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              value={health.health}
                              readOnly
                            />
                            <p className="pt-1 px-2 font-bold">/{creature.health}</p>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                      <p className="pt-1 px-2 font-bold">Status: {creature.status}</p>
                      <div className="absolute right-[10%] flex">
                        <div className="flex justify-center">
                          <p className="pt-1 font-bold">Damage:</p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault(); // Prevent the default form submission behavior
                              handleDamage(creature);
                              e.target.reset(); // Reset the form
                            }}
                          >
                            {/* Your input field */}
                            <input
                              className="w-[40px] my-1 bg-[#F3EEEA] rounded-md mx-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              maxLength={3}
                              onChange={(e) => {
                                const inputValue = parseInt(e.target.value, 10) || 0;
                                setDamageInput(inputValue);
                                handleCreatureSelect(creature);
                              }}
                              type="number"
                            />
                            {/* Your button */}
                            <button
                              className="my-[2px] text-[#FF6969] px-2 mr-4 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1 "
                              type="submit"
                            >
                              damage
                            </button>
                          </form>
                        </div>
                        <button
                          className="my-[2px] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
                          onClick={() => handleShowUpdate(creature)}
                        >
                          Update
                        </button>
                      </div>
                      <Modal show={isCreatureUpdateVisible} onClose={handleClose}>
                        <CombatShow
                          combat={combat}
                          onUpdateCombat={handleUpdateCombat}
                          onDestroyCombat={handleDestroyCombat}
                        />
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                  <input type="text" name="tab_id" value={2} hidden />
                  <div className="w-70 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Name:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="text"
                      name="creature_name"
                    />
                  </div>
                  <div className="w-30 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Initiative:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      maxLength="2"
                      onChange={maxLengthCheck}
                      name="initiative_roll"
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Health:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      name="health"
                      maxLength={3}
                      onChange={maxLengthCheck}
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Status:</p>
                    <select className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="status">
                      <option defaultValue="Choose Status" disabled hidden>
                        Choose Status
                      </option>
                      <option value="In Combat">In Combat</option>
                      <option value="Out of Combat">Out of Combat</option>
                      <option value="Incapacitated">Incapacitated</option>
                      <option value="Saving Throw">Saving Throw</option>
                      <option value="Dead">Dead</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-2"
                >
                  Add
                </button>
              </form>
            </div>
          </TabPanel>
          {/* tab 3 */}
          <TabPanel>
            {(tabId = 3)}
            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <div key={creature.id}>
                  <div className="flex justify-center">
                    <div
                      className={`flex justify-start my-5 w-[80%] h-10 bg-[#A9A9A9] rounded-md border-4 ${statusColor(
                        creature.status
                      )}`}
                    >
                      <p className="capitalize pt-1 px-2 font-bold">{creature.creature_name}</p>
                      <p className="pt-1 px-2 font-bold">Roll: {creature.initiative_roll}</p>
                      {creaturesHealth.map((health) =>
                        creature.id === health.id ? (
                          <div key={health.id} className="flex justify-center">
                            <p className="pt-1 px-2 font-bold">Health:</p>
                            <input
                              className="w-[40px] my-[2px] text-center rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              value={health.health}
                              readOnly
                            />
                            <p className="pt-1 px-2 font-bold">/{creature.health}</p>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                      <p className="pt-1 px-2 font-bold">Status: {creature.status}</p>
                      <div className="absolute right-[10%] flex">
                        <div className="flex justify-center">
                          <p className="pt-1 font-bold">Damage:</p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault(); // Prevent the default form submission behavior
                              handleDamage(creature);
                              e.target.reset(); // Reset the form
                            }}
                          >
                            {/* Your input field */}
                            <input
                              className="w-[40px] my-1 bg-[#F3EEEA] rounded-md mx-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              maxLength={3}
                              onChange={(e) => {
                                const inputValue = parseInt(e.target.value, 10) || 0;
                                setDamageInput(inputValue);
                                handleCreatureSelect(creature);
                              }}
                              type="number"
                            />
                            {/* Your button */}
                            <button
                              className="my-[2px] text-[#FF6969] px-2 mr-4 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1 "
                              type="submit"
                            >
                              damage
                            </button>
                          </form>
                        </div>
                        <button
                          className="my-[2px] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
                          onClick={() => handleShowUpdate(creature)}
                        >
                          Update
                        </button>
                      </div>
                      <Modal show={isCreatureUpdateVisible} onClose={handleClose}>
                        <CombatShow
                          combat={combat}
                          onUpdateCombat={handleUpdateCombat}
                          onDestroyCombat={handleDestroyCombat}
                        />
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                  <input type="text" name="tab_id" value={3} hidden />
                  <div className="w-70 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Name:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="text"
                      name="creature_name"
                    />
                  </div>
                  <div className="w-30 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Initiative:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      maxLength="2"
                      onChange={maxLengthCheck}
                      name="initiative_roll"
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Health:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      name="health"
                      maxLength={3}
                      onChange={maxLengthCheck}
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Status:</p>
                    <select className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="status">
                      <option defaultValue="Choose Status" disabled hidden>
                        Choose Status
                      </option>
                      <option value="In Combat">In Combat</option>
                      <option value="Out of Combat">Out of Combat</option>
                      <option value="Incapacitated">Incapacitated</option>
                      <option value="Saving Throw">Saving Throw</option>
                      <option value="Dead">Dead</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-2"
                >
                  Add
                </button>
              </form>
            </div>
          </TabPanel>
          {/* tab 4 */}
          <TabPanel>
            {(tabId = 4)}
            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <div key={creature.id}>
                  <div className="flex justify-center">
                    <div
                      className={`flex justify-start my-5 w-[80%] h-10 bg-[#A9A9A9] rounded-md border-4 ${statusColor(
                        creature.status
                      )}`}
                    >
                      <p className="capitalize pt-1 px-2 font-bold">{creature.creature_name}</p>
                      <p className="pt-1 px-2 font-bold">Roll: {creature.initiative_roll}</p>
                      {creaturesHealth.map((health) =>
                        creature.id === health.id ? (
                          <div key={health.id} className="flex justify-center">
                            <p className="pt-1 px-2 font-bold">Health:</p>
                            <input
                              className="w-[40px] my-[2px] text-center rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              value={health.health}
                              readOnly
                            />
                            <p className="pt-1 px-2 font-bold">/{creature.health}</p>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                      <p className="pt-1 px-2 font-bold">Status: {creature.status}</p>
                      <div className="absolute right-[10%] flex">
                        <div className="flex justify-center">
                          <p className="pt-1 font-bold">Damage:</p>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault(); // Prevent the default form submission behavior
                              handleDamage(creature);
                              e.target.reset(); // Reset the form
                            }}
                          >
                            {/* Your input field */}
                            <input
                              className="w-[40px] my-1 bg-[#F3EEEA] rounded-md mx-2 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              maxLength={3}
                              onChange={(e) => {
                                const inputValue = parseInt(e.target.value, 10) || 0;
                                setDamageInput(inputValue);
                                handleCreatureSelect(creature);
                              }}
                              type="number"
                            />
                            {/* Your button */}
                            <button
                              className="my-[2px] text-[#FF6969] px-2 mr-4 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1 "
                              type="submit"
                            >
                              damage
                            </button>
                          </form>
                        </div>
                        <button
                          className="my-[2px] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
                          onClick={() => handleShowUpdate(creature)}
                        >
                          Update
                        </button>
                      </div>
                      <Modal show={isCreatureUpdateVisible} onClose={handleClose}>
                        <CombatShow
                          combat={combat}
                          onUpdateCombat={handleUpdateCombat}
                          onDestroyCombat={handleDestroyCombat}
                        />
                      </Modal>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                  <input type="text" name="tab_id" value={4} hidden />
                  <div className="w-70 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Name:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="text"
                      name="creature_name"
                    />
                  </div>
                  <div className="w-30 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Initiative:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      maxLength="2"
                      onChange={maxLengthCheck}
                      name="initiative_roll"
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Health:</p>
                    <input
                      className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                      type="number"
                      name="health"
                      maxLength={3}
                      onChange={maxLengthCheck}
                    />
                  </div>
                  <div className="w-60 max-w-80 h-8 mx-3 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                    <p className="px-3 pt-1">Status:</p>
                    <select className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="status">
                      <option defaultValue="Choose Status" disabled hidden>
                        Choose Status
                      </option>
                      <option value="In Combat">In Combat</option>
                      <option value="Out of Combat">Out of Combat</option>
                      <option value="Incapacitated">Incapacitated</option>
                      <option value="Saving Throw">Saving Throw</option>
                      <option value="Dead">Dead</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-2"
                >
                  Add
                </button>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
