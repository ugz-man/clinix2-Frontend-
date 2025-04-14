import { createContext, useContext } from "react";
import { useSendMessage } from "../hooks/useSendMessage";

const SendMessageStateContext = createContext();

function SendMessageStateProvider({ children }) {
  const { isPending, mutate } = useSendMessage();

  return (
    <SendMessageStateContext.Provider value={{ isPending, mutate }}>
      {children}
    </SendMessageStateContext.Provider>
  );
}

function useSendMessageState() {
  const context = useContext(SendMessageStateContext);
  if (context === undefined) {
    throw new Error(
      "SendMessageStateContext was used outside SendMessageStateProvider",
    );
  }
  return context;
}

export { SendMessageStateProvider, useSendMessageState };
