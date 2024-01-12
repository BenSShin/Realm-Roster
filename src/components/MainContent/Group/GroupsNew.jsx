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
    <div className="flex justify-center w-screen h-screen">
      <div className="absolute bg-black opacity-20 w-screen h-screen"></div>
      <div className="pt-[120px] flex justify-center">
        <div className="bg-[center] bg-[url('/public/group.jpeg')] object-contain bg-no-repeat w-[1070px] h-[600px] border-2 border-black rounded-md z-0">
          <div className="flex justify-center">
            <h1 className="mt-[70px] text-2xl w=[300px] text-white font-bold z-10">Start Your Party</h1>
            <div className="absolute mt-8 p-6 h-[100px] w-[350px] bg-black opacity-20 z-0"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-10 grid grid-cols-2 gap-8 pt-10">
              <div className="flex justify-end">
                <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                  <p className="px-3 pt-1">Name:</p>
                  <input
                    className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none "
                    name="name"
                    type="text"
                  />
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
            </div>
            <div className="mt-12 flex justify-center">
              <div className="w-80 max-w-80 h-8 bg-[#F4BF96] flex justify-end  border-2 border-white rounded-r-lg">
                <p className="px-3 pt-1">Location:</p>
                <input
                  className="w-[80%] bg-[#F3EEEA] rounded-r-md pl-2 focus:outline-none"
                  name="location"
                  type="text"
                />
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
      </div>
    </div>
  );
}
