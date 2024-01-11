export function CombatShow(props) {
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateCombat(props.combat.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyCombat(props.combat);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <input type="text" name="tab_id" defaultValue={1} hidden />
          <div>
            <label htmlFor="creature_name">Name:</label>
            <input type="text" name="creature_name" defaultValue={props.combat.creature_name} />
          </div>
          <div>
            <label htmlFor="initiative_roll">Initiative:</label>
            <input
              type="number"
              maxLength="2"
              onChange={maxLengthCheck}
              name="initiative_roll"
              defaultValue={props.combat.initiative_roll}
            />
          </div>
          <div>
            <label htmlFor="health">Health:</label>
            <input
              type="number"
              name="health"
              maxLength={3}
              onChange={maxLengthCheck}
              defaultValue={props.combat.health}
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select name="status" defaultValue={props.combat.status}>
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
        <button type="submit">Update</button>
      </form>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
}
