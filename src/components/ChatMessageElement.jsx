import TextMessage from "./TextMessage";
import ImageAndTextMessage from "./ImageAndTextMessage";

function ChatMessageElement({ message }) {
  if (message?.messageType === 1) {
    return <TextMessage message={message} />;
  }

  if (message?.messageType === 2) {
    return <ImageAndTextMessage message={message} />;
  }
}

export default ChatMessageElement;
