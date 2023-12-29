export function GroupsIndex(props) {
  return (
    <div className="pt-10">
      <p className="text-4xl font-bold pb-5">Join a Party</p>
      {props.groups.map((group) => (
        <div key={group.id}>
          {group.id === 1 ? (
            <></>
          ) : (
            <>
              <div className="flex justify-center my-4">
                <div className="flex justify-start object-left w-[80%] h-9 bg-[#A9A9A9] rounded-md">
                  <p className="capitalize pt-1 pl-5">{group.name}</p>
                  <p className="pt-1 pl-5">Members: {group.users.length}</p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
