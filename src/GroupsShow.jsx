export function GroupsShow(props) {
  return (
    <div className="flex justify-center pt-10">
      <div>
        <h1 className="text-4xl font-bold ">Welcome to</h1>
        <p className="capitalize text-7xl font-bold text-[#B31312]">{props.group.name}</p>
        <p>Schedule: {props.group.meetup}</p>
        <p>Location: {props.group.location}</p>
        <button
          className="max-w-[50%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
          onClick={() => props.onShowGroupUpdate()}
        >
          Update Group Info
        </button>
      </div>
    </div>
  );
}
