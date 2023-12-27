import { useState } from "react";
import React, { useRef } from "react";

export function MessagesNew(props) {
  const ref = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    params.append("group_id", props.group.id);
    props.onCreateMessage(params, () => event.target.reset());
    ref.current.value = "";
  };
  return (
    <div>
      <h1>New Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Content: <input name="content" type="text" ref={ref} />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
