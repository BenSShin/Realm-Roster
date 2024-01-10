import { useNavigate } from "react-router-dom";

export function CharactersNew(props) {
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    let path = "/characters";
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateCharacter(params, () => event.target.reset());
    navigate(path);
  };
  return (
    <div className="pt-10">
      <h1 className="text-3xl font-bold pb-10">Create a Character</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex justify-end">
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Name:</p>
              <input className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none " name="name" type="text" />
            </div>
          </div>
          <div className="flex justify-start">
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Race:</p>
              <input className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="race" type="text" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Level:</p>
              <input className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="level" type="text" />
            </div>
          </div>
          <div className="flex justify-start">
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Class:</p>
              <select className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none" name="character_class">
                <option value="" selected disabled hidden>
                  Choose Your Class
                </option>
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
        </div>
        <div className="flex justify-center pt-5">
          <div className="w-[60%] max-w-[80%] h-50 bg-[#F4BF96] border-2 border-white rounded-lg">
            <p className="px-3 pt-1">Description:</p>
            <textarea
              cols="30"
              rows="8"
              className="w-[100%] h-41 bg-[#F3EEEA] rounded-b-md text-wrap text-ellipsis p-1 focus:outline-none"
              name="description"
              type="text"
            />
          </div>
        </div>
        <button
          className="mt-10 text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
          type="submit"
        >
          Create Character
        </button>
      </form>
    </div>
  );
}
