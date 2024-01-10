import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

export function Initiative() {
  const [creatures, setCreatures] = useState([]);
  let tabId = 0;

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

  useEffect(handleIndexCombat, []);
  return (
    <>
      <div>
        <Tabs>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
            <Tab>Tab 4</Tab>
            <Tab>Tab 5</Tab>
          </TabList>
          {/* tab 1 */}
          <TabPanel>
            {(tabId = 1)}
            <h2>Any content 1</h2>
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
          {/* tab 2 */}
          <TabPanel>
            {(tabId = 2)}
            <h2>Any content 2</h2>
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
            <div></div>
          </TabPanel>
          {/* tab 3 */}
          <TabPanel>
            {(tabId = 3)}
            <h2>Any content 2</h2>
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
          </TabPanel>
          {/* tab 4 */}
          <TabPanel>
            {(tabId = 4)}
            <h2>Any content 2</h2>
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
          </TabPanel>
          {/* tab 5 */}
          <TabPanel>
            {(tabId = 5)}
            <h2>Any content 2</h2>
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
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
