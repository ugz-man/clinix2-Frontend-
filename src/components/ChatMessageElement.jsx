import TextMessage from "./TextMessage";

function ChatMessageElement({ message }) {
  if (message?.messageType === 1) {
    return <TextMessage message={message} />;
  }
}

export default ChatMessageElement;
