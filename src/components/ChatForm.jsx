import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

import { useLocalStorageMessages } from "../contexts/LocalStorageMessagesContext";
import { useSendMessageState } from "../contexts/SendMessageStateContext";
import { HiOutlinePaperAirplane } from "./Icons";
import UploadImageButton from "./UploadImageButton";
import { useMutation } from "@tanstack/react-query";
import { deleteUserMessages } from "../services/apiMessages";

function ChatForm() {
  // Holds the msaages the user types
  const [textMessage, setTextMessage] = useState("");
  // This uniquely identifies a user and will not change as long
  // as the user continues chatting
  const [userID] = useState(function () {
    return Math.random().toString(36).substring(2);
  });
  const textAreaElement = useRef(null);

  // Contexts
  //   The messages and function used to set the messages in the local storage
  const [_, setStoredMessages] = useLocalStorageMessages();
  const { isPending: isSending, mutate } = useSendMessageState();
  const { mutate: deleteMessages } = useMutation({
    mutationFn: deleteUserMessages,
  });

  // Add a listener to delete all messages and local storage for this user
  // when the tap closes
  useEffect(
    function () {
      function handleBeforeUnload() {
        setStoredMessages([]);
        deleteMessages(userID);
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      return function () {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    },
    [deleteMessages, setStoredMessages, userID],
  );

  // Functions
  function handleTextAreaOnChange(e) {
    setTextMessage(() => e.target.value);
  }

  async function sendMessage(e) {
    e.preventDefault();

    if (!textMessage) return;

    let message;

    if (textMessage) {
      message = {
        userId: userID,
        // The cryptorandomUUID() function doesn't work on mobile devices
        clientId:
          crypto?.randomUUID?.() || Math.random().toString(36).substring(2),
        messageType: 1,
        role: "user",
        text: textMessage.trim(),
      };
    }

    setStoredMessages((prevMessages) => [...prevMessages, message]);
    setTextMessage("");
    mutate(message, {
      onError: (error) =>
        toast.custom(() => (
          <div
            className={`dark:bg-dark-background-100 bg-white px-6 py-4 shadow-md`}
          >
            ❌ {error.message}
          </div>
        )),
    });
    textAreaElement.current.focus();
  }

  return (
    <form className="chat-input-form flex w-full items-center justify-center gap-4 self-center p-2">
      <textarea
        type="text"
        ref={textAreaElement}
        className="chat-input border-grey-300 focus:ring-grey-300 focus:outline-grey-300 grow border p-2 md:text-lg dark:text-white"
        required
        placeholder="Meesage"
        value={textMessage}
        onChange={handleTextAreaOnChange}
      />
      {!textMessage && <UploadImageButton userId={userID} />}
      <button
        onClick={sendMessage}
        disabled={isSending}
        className="bg-primary-500 dark:bg-dark-primary-700 focus:ring-primary-500 hover:bg-primary-400 cursor-pointer rounded-full border-none p-4 text-white transition-colors duration-300 focus:ring focus:ring-offset-2 focus:outline-none"
      >
        <HiOutlinePaperAirplane />
      </button>
    </form>
  );
}

export default ChatForm;
