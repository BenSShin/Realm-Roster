export function MessagesIndex(props) {
  return (
    <div className="flex items-center justify-center w-full pt-5">
      <div className="bg-white shadow-md rounded-t-lg justify-center w-[54%]">
        <div className="p-4 border-b bg-[#FF6969] text-white rounded-t-lg flex justify-between">
          <h1 id="chat-title" className="text-lg font-semibold">
            Group Messages
          </h1>
        </div>
        <div className="p-4 h-80 overflow-y-scroll pd-bottom-5">
          {props.messages.map((message) => (
            <div key={message.id}>
              <div className="">
                {message.user_id === parseInt(localStorage.getItem("user_id")) ? (
                  <>
                    <div className="flex justify-end pr-3">
                      <p className="opacity-60 text-sm">{message.username}</p>
                    </div>
                    <div className="flex justify-end">
                      <a
                        className="bg-[#FF6969] text-white rounded-lg py-2 px-4 inline-block"
                        onClick={() => props.onShowMessage(message)}
                      >
                        {message.content}
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex pr-3">
                      <p className="opacity-60 text-sm">{message.username}</p>
                    </div>
                    <div className="flex">
                      <p className="static inset-y-0 left-0 bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                        {message.content}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
