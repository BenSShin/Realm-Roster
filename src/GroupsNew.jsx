export function GroupsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateGroup(params, () => event.target.reset());
  };
  return (
    <div>
      <h1>New Group</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          <p>Format: YYYY-MM-DD HR-Mi</p>
          Meet Up: <input name="meetup" type="text" />
        </div>
        <div>
          Location: <input name="location" type="text" />
        </div>
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
}
