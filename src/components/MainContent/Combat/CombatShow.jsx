export function CombatShow(props) {
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };
  const ref = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateCombat(props.combat.id, params, () => event.target.reset());
    ref.current.value = "";
  };

  const handleClick = () => {
    props.onDestroyCombat(props.combat);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="mt-4 grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Name:</p>
              <input
                className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                type="text"
                name="creature_name"
                defaultValue={props.combat.creature_name}
              />
            </div>
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Initiative:</p>
              <input
                className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                type="number"
                maxLength="2"
                onChange={maxLengthCheck}
                name="initiative_roll"
                defaultValue={props.combat.initiative_roll}
              />
            </div>
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Health:</p>
              <input
                className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                type="number"
                name="health"
                maxLength={3}
                onChange={maxLengthCheck}
                defaultValue={props.combat.health}
              />
            </div>
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Status:</p>
              <select
                className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                name="status"
                defaultValue={props.combat.status}
              >
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
        </div>
        <button
          type="submit"
          className="my-3 text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
        >
          Update
        </button>
      </form>
      <button
        className="text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
        onClick={handleClick}
      >
        Delete
      </button>
    </div>
  );
}
