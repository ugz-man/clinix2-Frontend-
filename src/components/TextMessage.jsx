import ReactMarkDown from "react-markdown";

function TextMessage({ message }) {
  if (message.role === "user") {
    return (
      <div className="bg-primary-500 dark:bg-dark-primary-700 mb-1 flex w-11/12 flex-col self-end rounded-sm p-2 text-white md:w-1/3 md:text-lg">
        {/* <div className="message-sender">John</div>F */}
        <div className="wrap-break-word whitespace-pre-wrap">
          {message.text}
        </div>
      </div>
    );
  }

  if (message.role === "assistant") {
    return (
      <div className="bg-grey-300 prose mb-1 flex w-11/12 flex-col self-start rounded-sm p-2 md:w-1/3 md:text-lg">
        {/* <div className="message-sender">John</div> */}
        <div className="wrap-break-word whitespace-pre-wrap">
          <ReactMarkDown>{message.text}</ReactMarkDown>
        </div>
        {/* <div className="message-text wrap-break-word">{message.text}</div> */}
      </div>
    );
  }
}

export default TextMessage;
