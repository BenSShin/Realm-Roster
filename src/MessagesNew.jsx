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
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center w-full h-10">
          <div className="w-[54%] bg-[#FF6969] rounded-b-lg">
            <input
              className="w-[54%] rounded-lg text-right pr-2"
              name="content"
              type="text"
              placeholder="New Message"
              ref={ref}
            />
            <button
              className="max-w-[50%] text-[#FF6969] px-2 border-2 border-[#FF6969] rounded-lg bg-[#FFE5CA] hover:bg-[#FF6969] hover:text-[#FFE5CA] hover:duration-200"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
