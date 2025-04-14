import { useEffect, useRef } from "react";
import { useLocalStorageMessages } from "../contexts/LocalStorageMessagesContext";
import ChatMessageElement from "../components/ChatMessageElement";
import { useSendMessageState } from "../contexts/SendMessageStateContext";

function ChatView() {
  const chatMessagesRef = useRef(null);
  const [storedMessages] = useLocalStorageMessages();
  const { isPending: isTyping } = useSendMessageState();

  // As it's not possible to update a state variable while rendereing
  // hence the need of a useEffect
  useEffect(
    function () {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    },
    [storedMessages],
  );

  return (
    <div
      ref={chatMessagesRef}
      className="scrollbar-hidden flex grow flex-col gap-3 overflow-y-auto bg-[url(images/background/backgroundImage.svg)] bg-center p-2"
    >
      {storedMessages.map((storedMessage) => (
        <ChatMessageElement
          key={storedMessage?.clientId}
          message={storedMessage}
        />
      ))}

      {isTyping && (
        <div class="flex items-center space-x-1 self-start">
          <span class="text-sm text-gray-500">Typing</span>
          <div class="flex space-x-1">
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
            <div class="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatView;
