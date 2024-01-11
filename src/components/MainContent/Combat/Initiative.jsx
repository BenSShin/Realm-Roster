import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { Modal } from "../../Modal/Modal";
import { CombatShow } from "./CombatShow";

export function Initiative() {
  const [creatures, setCreatures] = useState([]);
  const [isCreatureUpdateVisible, setIsCreatureUpdateVisible] = useState(false);
  const [combat, setCombat] = useState([]);

  const handleShowUpdate = (creature) => {
    console.log(creature);
    setIsCreatureUpdateVisible(true);
    setCombat(creature);
  };

  const handleClose = () => {
    setIsCreatureUpdateVisible(false);
  };

  const handleUpdateCombat = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/combats/${id}.json`, params).then((response) => {
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
    axios.delete(`http://localhost:3000/combats/${combat.id}.json`).then((response) => {
      setCreatures(creatures.filter((c) => c.id !== combat.id));
      handleClose();
    });
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };

  const combatNew = (params, successCallback) => {
    axios.post("http://localhost:3000/combats.json", params).then((response) => {
      setCreatures([creatures, response.data]);
      successCallback;
    });
  };
  const handleIndexCombat = () => {
    axios.get(`http://localhost:3000/combats.json`).then((response) => {
      console.log(response.data);
      setCreatures(response.data);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    combatNew(params, () => event.target.reset());
    ref.current.value = "";
  };
  if (creatures) {
    useEffect(handleIndexCombat, []);
  }
  let tabId = 0;
  return (
    <>
      <div>
        <Tabs>
          <TabList>
            <Tab onClick={handleIndexCombat}>Tab 1</Tab>
            <Tab onClick={handleIndexCombat}>Tab 2</Tab>
            <Tab onClick={handleIndexCombat}>Tab 3</Tab>
            <Tab onClick={handleIndexCombat}>Tab 4</Tab>
            <Tab onClick={handleIndexCombat}>Tab 5</Tab>
          </TabList>
          {/* tab 1 */}
          <TabPanel>
            {(tabId = 1)}
            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <div key={creature.id}>
                  <div className="flex justify-center">
                    <div className="flex justify-center my-5 w-[80%] h-9 bg-[#A9A9A9] rounded-md">
                      <p className="capitalize pt-1 px-2">{creature.creature_name}</p>
                      <p className="pt-1 px-2">Roll: {creature.initiative_roll}</p>
                      <p className="pt-1 px-2">Health: {creature.health}</p>
                      <p className="pt-1 px-2">Status: {creature.status}</p>
                      <button onClick={() => handleShowUpdate(creature)}>Update</button>
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
                  <div>
                    <label htmlFor="creature_name">Name:</label>
                    <input type="text" name="creature_name" />
                  </div>
                  <div>
                    <label htmlFor="initiative_roll">Initiative:</label>
                    <input type="number" maxLength="2" onChange={maxLengthCheck} name="initiative_roll" />
                  </div>
                  <div>
                    <label htmlFor="health">Health:</label>
                    <input type="number" name="health" maxLength={3} onChange={maxLengthCheck} />
                  </div>
                  <div>
                    <label htmlFor="status">Status:</label>
                    <select name="status">
                      <option value="" selected disabled hidden>
                        Choose Status
                      </option>
                      <option value="In Combat">In Combat</option>
                      <option value="Out of Combat">Out of Combat</option>
                      <option value="Incapacitated">incapacitated</option>
                      <option value="Saving Throw">Saving Throw</option>
                      <option value="Dead">Dead</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-[#FF6969] px-1 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-2"
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
              creature.tab_id == 2 ? (
                <>
                  <div key={creature.id}>
                    <p>{creature.creature_name}</p>
                    <p>{creature.initiative_roll}</p>
                    <p>{creature.health}</p>
                    <p>{creature.status}</p>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <input type="text" name="tab_id" value={2} hidden />
                <div>
                  <label htmlFor="creature_name">Name:</label>
                  <input type="text" name="creature_name" />
                </div>
                <div>
                  <label htmlFor="initiative_roll">Initiative:</label>
                  <input type="text" name="initiative_roll" />
                </div>
                <div>
                  <label htmlFor="health">Health:</label>
                  <input type="text" name="health" />
                </div>
                <div>
                  <label htmlFor="status">Status:</label>
                  <select name="status">
                    <option value="" selected disabled hidden>
                      Choose Status
                    </option>
                    <option value="In Combat">In Combat</option>
                    <option value="Out of Combat">Out of Combat</option>
                    <option value="Incapacitated">incapacitated</option>
                    <option value="Saving Throw">Saving Throw</option>
                    <option value="Dead">Dead</option>
                  </select>
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
          </TabPanel>
          {/* tab 3 */}
          <TabPanel>
            {(tabId = 3)}

            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <>
                  <div key={creature.id}>
                    <p>{creature.creature_name}</p>
                    <p>{creature.initiative_roll}</p>
                    <p>{creature.health}</p>
                    <p>{creature.status}</p>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <input type="text" name="tab_id" value={1} hidden />
                <div>
                  <label htmlFor="creature_name">Name:</label>
                  <input type="text" name="creature_name" />
                </div>
                <div>
                  <label htmlFor="initiative_roll">Initiative:</label>
                  <input type="text" name="initiative_roll" />
                </div>
                <div>
                  <label htmlFor="health">Health:</label>
                  <input type="text" name="health" />
                </div>
                <div>
                  <label htmlFor="status">Status:</label>
                  <select name="status">
                    <option value="" selected disabled hidden>
                      Choose Status
                    </option>
                    <option value="In Combat">In Combat</option>
                    <option value="Out of Combat">Out of Combat</option>
                    <option value="Incapacitated">incapacitated</option>
                    <option value="Dead">Dead</option>
                  </select>
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
          </TabPanel>
          {/* tab 4 */}
          <TabPanel>
            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <>
                  <div key={creature.id}>
                    <p>{creature.creature_name}</p>
                    <p>{creature.initiative_roll}</p>
                    <p>{creature.health}</p>
                    <p>{creature.status}</p>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <input type="text" name="tab_id" value={1} hidden />
                <div>
                  <label htmlFor="creature_name">Name:</label>
                  <input type="text" name="creature_name" />
                </div>
                <div>
                  <label htmlFor="initiative_roll">Initiative:</label>
                  <input type="text" name="initiative_roll" />
                </div>
                <div>
                  <label htmlFor="health">Health:</label>
                  <input type="text" name="health" />
                </div>
                <div>
                  <label htmlFor="status">Status:</label>
                  <select name="status">
                    <option value="" selected disabled hidden>
                      Choose Status
                    </option>
                    <option value="In Combat">In Combat</option>
                    <option value="Out of Combat">Out of Combat</option>
                    <option value="Incapacitated">incapacitated</option>
                    <option value="Dead">Dead</option>
                  </select>
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
          </TabPanel>
          {/* tab 5 */}
          <TabPanel>
            {(tabId = 5)}

            {creatures.map((creature) =>
              creature.tab_id == tabId ? (
                <>
                  <div key={creature.id}>
                    <p>{creature.creature_name}</p>
                    <p>{creature.initiative_roll}</p>
                    <p>{creature.health}</p>
                    <p>{creature.status}</p>
                  </div>
                </>
              ) : (
                <></>
              )
            )}
            <div>
              <form onSubmit={handleSubmit}>
                <input type="text" name="tab_id" value={1} hidden />
                <div>
                  <label htmlFor="creature_name">Name:</label>
                  <input type="text" name="creature_name" />
                </div>
                <div>
                  <label htmlFor="initiative_roll">Initiative:</label>
                  <input type="text" name="initiative_roll" />
                </div>
                <div>
                  <label htmlFor="health">Health:</label>
                  <input type="text" name="health" />
                </div>
                <div>
                  <label htmlFor="status">Status:</label>
                  <select name="status">
                    <option value="" selected disabled hidden>
                      Choose Status
                    </option>
                    <option value="In Combat">In Combat</option>
                    <option value="Out of Combat">Out of Combat</option>
                    <option value="Incapacitated">incapacitated</option>
                    <option value="Dead">Dead</option>
                  </select>
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
