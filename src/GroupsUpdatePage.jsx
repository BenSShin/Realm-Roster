import { Link } from "react-router-dom";

export function GroupsUpdatePage(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateGroup(props.group.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyGroup(props.group);
  };
  return (
    <div className="mt-[100px]">
      <h1 className="text-xl font-bold">Update Group information</h1>
      <form onSubmit={handleSubmit}>
        <div className="text-lg font-bold capitalize">
          <div className="flex justify-center pt-5">
            Name:{" "}
            <input
              className="ml-3 bg-[#F3EEEA] focus:outline-[#CE5A67]"
              defaultValue={props.group.name}
              name="name"
              type="text"
            />
          </div>
        </div>
        <div className="text-lg font-bold capitalize">
          <div className="flex justify-center pt-5">
            Meet Up:{" "}
            <input
              className="ml-3 bg-[#F3EEEA] focus:outline-[#CE5A67]"
              defaultValue={props.group.meetup}
              name="meetup"
              type="text"
            />
          </div>
        </div>
        <div className="text-lg font-bold capitalize">
          <div className="flex justify-center pt-5">
            Location:{" "}
            <input
              className="ml-3 bg-[#F3EEEA] focus:outline-[#CE5A67]"
              defaultValue={props.group.location}
              name="location"
              type="text"
            />
          </div>
        </div>
        <div className="m-4">
          <button
            className="mb-5 max-w-[50%] text-[#FF6969] m-2 px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
            type="submit"
          >
            Update Group
          </button>
          <Link to="/characters">
            <button
              className="mb-5 max-w-[50%] text-[#FF6969] m-2 px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
              onClick={handleClick}
            >
              Delete Group
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
