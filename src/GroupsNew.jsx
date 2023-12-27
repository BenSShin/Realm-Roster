export function GroupsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateGroup(params, () => event.target.reset());
    setTimeout(function () {
      window.location = window.location;
    }, 1000);
  };
  return (
    <div className="pt-10">
      <h1 className="text-3xl font-bold pb-10">Create a Group</h1>
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
              <p className="px-3 pt-1">MeetUp:</p>
              <input
                className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                name="meetup"
                type="text"
                placeholder="YYYY-MM-DD HR-Mi"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
              <p className="px-3 pt-1">Location:</p>
              <input
                className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                name="location"
                type="text"
              />
            </div>
          </div>
        </div>
        <button
          className="mt-10 text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200 mr-1"
          type="submit"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}
